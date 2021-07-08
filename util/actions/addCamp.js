const User = require("../../db/models/User");
const Camp = require("../../db/models/Camp");
const db = require("../../db/models");
/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
const addCamp = async (camp, res) => {
    try {
        let array = [];
        for (let i = 0; i < camp.images.length; i++) {
            array.push({
                imageBase64 : camp.images[i]
            })
        }
    const filter = { username: 'Manager' };
    const newCamp = new Camp({
        description: camp.description,
        name : camp.name,
        location : camp.location,
        images : array
    });
    await newCamp.save()
    // await User.findOneAndUpdate(filter, {posts: [newPost._id]}, { new: true, useFindAndModify: false })
    await User.updateOne(filter, { $push: { posts: { $each: [ newCamp ] } } })
    return res.status(201).json({
        signUpMessage: "Hurry! You have added a new camp.",
        success: true,
      });   
    } catch (error) {
        return res.status(201).json({
            signUpMessage: "Error",
            success: true,
          });  
    }
};

module.exports = {
    addCamp,
};