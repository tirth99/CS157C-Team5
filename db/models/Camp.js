const { Schema, model } = require("mongoose");
var mongoose = require("mongoose");

const CampSchema = new Schema({
  description: {
    type: String,
    required: [true, "Why no description?"],
  },
  name: {
    type: String,
    required: [true, "Why no name?"],
  },
  location: {
    type: String,
    required: [true, "Why no location?"],
  },
  costADay: {
    type: Number,
    required: [true, "Why no cost/day?"],
  },
  images: [
    {
      imageBase64: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
});
CampSchema.index({ "$**": "text" });

module.exports = mongoose.models.Camp || model("Camp", CampSchema);
