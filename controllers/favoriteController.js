import userModel from '../models/UserModel.js';

const addToFavorites = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await userModel.findById(userId);
    let favData = await userData.favData;

    if (favData[itemId]) {
      favData[itemId] += 1;
    } else {
      favData[itemId] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { favData });
    res.json({ success: true, message: "Added to Favorites" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateFavorites = async (req, res) => {
    const { userId, itemId, quantity } = req.body;
    try {
      const user = await userModel.findById(userId);
      let favData = user.favData;
  
      if (quantity === 0) {
        delete favData[itemId];
      } else {
        favData[itemId] = quantity;
      }
  
      await userModel.findByIdAndUpdate(userId, { favData });
      res.json({ success: true, message: 'Favorites updated' });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }  
};

// Get user favorite data
const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let favData = await userData.favData;

    res.json({ success: true, favData: favData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToFavorites, updateFavorites, getUserFavorites };
