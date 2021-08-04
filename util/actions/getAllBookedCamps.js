const db = require("../../db/models");

export var myPromise = function (reservations, currentUser) {
  let returnedJsonOjects = [];
  return new Promise(function (resolve, reject) {
    let requests = reservations.map((reservation) => {
      const campId = reservation.fk_camp;
      return db.Camp.findById(campId).then((camp) => {
        const bookedCamp = {
          _id: reservation._id,
          fk_user: currentUser._id,
          fk_camp: camp._id,
          totalPrice : reservation.totalPrice,
          startDate: reservation.startDate,
          endDate: reservation.endDate,
          unitType: reservation.unitType,
          numOfAdults: reservation.numOfAdults,
          numOfChildren: reservation.numOfChildren,
          description: camp.description,
          name: camp.name,
          location: camp.location,
          costADay: camp.costADay,
          image: camp.images[0].imageBase64,
          createdAt: reservation.createdAt,
        };
        returnedJsonOjects.push(bookedCamp);
      });
    });

    return Promise.all(requests).then(() => {
      let result = {
        bookedCamps: returnedJsonOjects,
        getAllBookedCampsMessage:
          "You have successfully fetched all booked camps",
        success: true,
      };
      resolve(result);
    });
  });
};

const getAllBookedCamps = async (req, res) => {
  try {
    const currentUser = await db.User.findOne({
      username: req.cookies["username"],
    });
    const reservations = await db.Reservation.find({
      fk_user: currentUser._id,
    });
    myPromise(reservations, currentUser).then((response) => {
        return res.status(200).send(response)
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      getAllBookedCampsMessage: "Error",
      success: false,
    });
  }
};

module.exports = {
  getAllBookedCamps,
};