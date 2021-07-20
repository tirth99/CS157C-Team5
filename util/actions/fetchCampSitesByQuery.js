const db = require("../../db/models");

const fetchCampSitesByQuery = async (req, res) => {
    try {
      const { q } = req.query;
    // const fetchedCampSitesByQuery = await db.Camp.find({
    //   $text: { $search: q },
    // })
    let re = new RegExp(q, 'gi');
   
    const fetchedCampSitesByQuery = await db.Camp.find({
      "$or": [
        {"name": {$regex: re}}
        , {"location": {$regex: re}}
    ]
    })
    return res.status(200).json({
      fetchedCampSitesByQuery: fetchedCampSitesByQuery,
      success: true,
    });
    } catch (error) {
      return res.status(400).json({
        fetchedCampSitesByQueryMessage: "Error",
        success: false,
      });
    }
};

module.exports = {
  fetchCampSitesByQuery,
};
