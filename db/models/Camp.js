const { Schema, model } = require("mongoose");
var mongoose = require("mongoose");

const CampSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: [
    {
      imageBase64: {
        type: String,
        required: false,
      },
    },
  ],
});

module.exports = mongoose.models.Camp || model("Camp", CampSchema);

// poster : {
//     type = Schema.Types.ObjectId,
//     ref = 'User'
//   }
