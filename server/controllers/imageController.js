import axios from 'axios';
import fs from 'fs';
import Formdata from 'form-data';
import userModel from '../models/userModels.js';

// Controller function to remove background from image
const removeBgImage = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.creditBalance === 0) {
      return res.json({
        success: false,
        message: "Insufficient credits",
        creditBalance: user.creditBalance
      });
    }

    const imagePath = req.file.path;

    // Reading the image file
    const imageFile = fs.createReadStream(imagePath);

    const formdata = new Formdata();
    formdata.append('image_file', imageFile);

    const { data } = await axios.post(
      'https://clipdrop-api.co/remove-background/v1',
      formdata,
      {
        headers: {
          ...formdata.getHeaders(), // ✅ Required for multipart/form-data
          'x-api-key': process.env.CLIPDROP_API, // ✅ Ensure this is defined
        },
        responseType: 'arraybuffer' // ✅ For image data
      }
    );

    // Convert the binary data to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // Deduct 1 credit
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1
    });

    res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance - 1,
      message: "Image background removed successfully"
    });

  } catch (error) {
    console.log('❌ Error in removeBgImage:', error.message || error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { removeBgImage };
