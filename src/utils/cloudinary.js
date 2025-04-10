import { Cloudinary } from "cloudinary-core";

const cloudinary = new Cloudinary({
  cloud_name:
    "cloudinary://572178883816584:ubqD7sUUGmRP3V68_OYatreJgY4@dwcxvrb0c", // Replace with your Cloudinary Cloud name
  secure: true,
});

export default cloudinary;
