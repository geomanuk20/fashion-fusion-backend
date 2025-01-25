import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/UserModel.js';
import nodemailer from 'nodemailer';

// JWT token creation function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};


// User login route
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// User registration route
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email});

        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Forgot password route
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ message: "User not existed", success: false });
    }

    const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Make sure to use the user's actual email
      subject: 'Reset Password Link',
      text: `http://localhost:5173/reset-password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ message: "Email sending failed", success: false });
      } else {
        return res.json({ message: "Password reset email sent", success: true });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};



// Reset password route
const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log('Received password:', password); // Log received password
  
    if (!password) {
      return res.json({ message: "Password is required", success: false });
    }
  
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) {
        return res.json({ message: "Error with token", success: false });
      } else {
        console.log('Token verified:', decoded); 
  
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.json({ message: err.message, success: false });
          }
          console.log('Hashed password:', hash); 
  
          userModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then(u => {
              console.log('Password updated for user:', u); 
              return res.json({ message: "Password reset successfully", success: true });
            })
            .catch(err => {
              console.log('Error updating user:', err); 
              res.json({ message: err.message, success: false });
            });
        });
      }
    });
  };
  
  

// Admin login route
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin, forgotPassword,resetPassword };