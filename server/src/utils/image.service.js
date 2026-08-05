import cloudinary from "../config/cloudinary-config.js";

const uploadMultipleImages = async (Images,storageLocation) => {
  try {
      const uploadMultiple = Images.map(async (image) => {
          const b64 = Buffer.from(image.buffer).toString("base64");

          const dataURI = `data:${image.mimetype};base64,${b64}`;

          const result = await cloudinary.uploader.upload(dataURI, {
              folder: storageLocation,
              width: 500,
              height: 500,
              crop: "fill",
          });

          return {
              url: result.secure_url,
              public_id: result.public_id,
            };
          }
      );

      return await Promise.all(uploadMultiple);

  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

export default uploadMultipleImages;

