import mongoose from "mongoose";

const adsSchema = new mongoose.Schema({
    ads:{type:[String], required:true},
    
})

const adsModel = mongoose.model.ads || mongoose.model("ads",adsSchema)

export default adsModel;