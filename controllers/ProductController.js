import {v2 as cloudinary} from 'cloudinary'
import ProductModel from "../models/ProductModel.js"



// function for add product
const addProduct = async (req, res) => {
    try {
      const { name, description, price, category, subcategory, sizes, bestseller } = req.body;
  
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
  
      const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
  
      let imageUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
          console.log('Uploaded Image URL:', result.secure_url);
          return result.secure_url;
        })
      );
  
      const productData = {
        name,
        description,
        category,
        subcategory,
        price: Number(price),
        bestseller: bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes),
        image: imageUrl,
        date: Date.now(),
      };
  
      console.log(productData);
  
      const product = new ProductModel(productData);
      await product.save();
  
      res.json({ success: true, message: "product added" });
    } catch (error) {
      console.error("Error while adding product:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// function for list product

const listProduct = async(req,res)=>{
    try {
        const products = await ProductModel.find({})
        res.json({success:true,products})

        
    } catch (error) {
        console.log(error);
        res.send({success:false,message:error.message})
        
        
    }
}

// function for edit product and update product
const editProduct = async (req, res) => {
  try {
    const { productId, name, description, price, category, subcategory, sizes, bestseller } = req.body;

    // Handling image files if any are uploaded
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // If there are any new images, upload them to Cloudinary
    let imageUrl = [];
    if (images.length > 0) {
      imageUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
          console.log('Uploaded Image URL:', result.secure_url);
          return result.secure_url;
        })
      );
    }

    // Prepare update data
    const updateData = {
      name,
      description,
      category,
      subcategory,
      price: Number(price),
      bestseller: bestseller === "true", // Convert bestseller to boolean
      sizes: JSON.parse(sizes),
      ...(imageUrl.length > 0 && { image: imageUrl }), // Only update image if there are new images
    };

    // Find the product by ID and update it
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error while updating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// function for remove product

const removeProduct = async(req,res)=>{
    try {
        await ProductModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"deleted"})
    } catch (error) {
        console.log(error);
        res.send({success:false,message:error.message})
    }
}

// function for single product info

const singleProduct = async(req,res)=>{
    try {
        const {productId} = req.body;
        const product =await ProductModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error);
        res.send({success:false,message:error.message})
    }
}

export{addProduct,listProduct,removeProduct,singleProduct,editProduct}