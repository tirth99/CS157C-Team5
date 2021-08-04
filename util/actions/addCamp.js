const User = require("../../db/models/User");
const Camp = require("../../db/models/Camp");
const db = require("../../db/models");

const composeImageBase64Array = (values) => {
  let imageObjectArray = [];
  values.map((value) => {
    imageObjectArray.push({
      imageBase64: value.imageBase64,
      name : value.fileName
    });
  });
  return imageObjectArray;
};
const addCamp = async (camp, res) => {
  try {
    var imageObjectArray = composeImageBase64Array(camp.imageBase64Values);
    const filter = { username: "Manager" };
    const newCamp = new Camp({
      description: camp.description,
      name: camp.name,
      location: camp.location,
      images: imageObjectArray,
      costADay : camp.costADay
    });
    await newCamp.save();
    await User.updateOne(filter, { $push: { camps: { $each: [newCamp] } } });
    return res.status(201).json({
      signUpMessage: "Hurry! You have added a new camp.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      addNewCampMesage: "Error",
      success: false,
    });
  }
};

module.exports = {
  addCamp,
  composeImageBase64Array
};
