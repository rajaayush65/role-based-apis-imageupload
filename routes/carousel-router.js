const express = require("express");

const {
  uploadCarouselImage,
  getCarouselImages,
  deleteCarouselImage,
} = require("../controllers/carousel-ctrl");
const { authUserValidation } = require("../helpers/auth-user-validation");
const { upload } = require("../helpers/image-export");

const router = express.Router();

router.post(
  "/uploadcarouselimage",
  authUserValidation,
  upload.single("image"),
  uploadCarouselImage
);

router.get("/getcarouselimages", getCarouselImages);

router.delete("/deletecarouselimage", authUserValidation, deleteCarouselImage);

module.exports = router;
