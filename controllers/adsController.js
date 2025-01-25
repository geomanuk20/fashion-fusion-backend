import { v2 as cloudinary } from 'cloudinary';
import adsModel from '../models/adsModel.js';

// Function for adsproduct
const adsproduct = async (req, res) => {
  try {
    const ads = req.files && req.files.ads ? req.files.ads[0] : undefined;
    const adss = ads ? [ads] : [];

    const adsUrl = await Promise.all(
      adss.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        console.log('Uploaded Image URL:', result.secure_url);
        return result.secure_url;
      })
    );

    const adsData = { ads: adsUrl };
    console.log(adsData);

    const adspro = new adsModel(adsData);
    await adspro.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.error("Error while adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listAdd = async(req,res)=>{
  try {
      const products = await adsModel.find({})
      res.json({success:true,products})

      
  } catch (error) {
      console.log(error);
      res.send({success:false,message:error.message})
      
      
  }
}

// function for remove product

const removeAds = async (req, res) => {
  try {
      const deletedAd = await adsModel.findByIdAndDelete(req.body.id);
      if (!deletedAd) {
          throw new Error('Ad not found');
      }
      res.json({success: true, message: "deleted"});
  } catch (error) {
      console.error('Error deleting ad:', error);
      res.status(500).send({success: false, message: error.message});
  }
};

export { adsproduct ,listAdd,removeAds};
