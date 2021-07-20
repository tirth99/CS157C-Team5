import { composeImageBase64Array } from "./addCamp";
const db = require("../../db/models");

const updateCampById = async (req, res) => {
  try {
    const { id } = req.query;
    let camp = req.body;
    const updatedCamp = await db.Camp.findOne({ _id: id });
    if (updatedCamp && camp.imageBase64Values) {
      await updatedCamp.updateOne({
        $set: {
          name: camp.name,
          location: camp.location,
          description: camp.description,
          images: composeImageBase64Array(camp.imageBase64Values),
          costADay: camp.costADay
        },
      });
      return res.status(200).json({
        updateCampByIdMessage: "You have successfully updated the camp !!!",
        success: true,
      });
    } else if (updatedCamp && !camp.imageBase64Values) {
      console.log("ahahahahahaha")
      await updatedCamp.updateOne({
        $set: {
          name: camp.name,
          location: camp.location,
          description: camp.description,
          costADay: camp.costADay
        },
      });
    } else {
      return res.status(400).json({
        updateCampByIdMessage: "Cant find camp !!!",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      updateCampByIdMessage: "Error",
      success: false,
    });
  }
};

module.exports = {
  updateCampById,
};
