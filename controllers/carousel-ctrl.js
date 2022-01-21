const CarouselModel = require("../model/carousel-model");
const { unlink } = require("fs/promises");

uploadCarouselImage = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  if (req.body.description === "" || req.body.description === "undefined") {
    return res.status(417).json({
      success: false,
      error: "No Description Provided",
    });
  }
  if (typeof req.file === "undefined") {
    return res.status(417).json({
      error: "No File Provided",
    });
  } else {
  }
  const carouselItem = new CarouselModel({
    username: req.locals.username,
    description: req.body.description,
    role: req.locals.role,
    image: url + "/uploads/" + req.file.filename,
  });
  const result = carouselItem.save();
  if (!result) {
    return res.status(404).json({
      success: false,
      error: "Some Error Occured",
    });
  }
  return res.status(201).json({
    success: true,
    message: "Carousel Image Added Successfully",
  });
};

getCarouselImages = async (req, res) => {
  const carouselItems = await CarouselModel.find();
  if (carouselItems) {
    return res.status(200).json({
      success: true,
      data: carouselItems,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Carousel Images Found",
    });
  }
};

deleteCarouselImage = async (req, res) => {
  const { id } = req.body;
  const carouselItem = await CarouselModel.findOne({ _id: id });
  if (carouselItem) {
    if (carouselItem.username !== req.locals.username) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    const image = carouselItem.image;
    const pos = image.lastIndexOf("/") + 1;
    const imageName = image.substr(pos, image.length);
    const successDelete = await carouselItem.deleteOne();
    if (successDelete) {
      await unlink(`./uploads/${imageName}`);
      return res.status(217).json({
        success: true,
        message: "Carousel Image Deleted Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some Error Occured",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "No Such Image Available",
    });
  }
};

module.exports = {
  uploadCarouselImage,
  getCarouselImages,
  deleteCarouselImage,
};
