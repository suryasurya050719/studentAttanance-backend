const { default: mongoose } = require("mongoose");

let getLatLongUpdate = async (_id, lat, long) => {
  try {
    console.log("value", _id, lat, long);
    var seqDoc = await mobileModel
      .findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(_id) },
        { current_latitude: lat, current_longitude: long },
        { new: true }
      )
      .then(async (res) => {
        if (res && res.length > 0) {
          console.log("lat long updated");
        }
      })
      .catch((error) => {
        console.log("error===>", error);
        // return error;
      });
  } catch (error) {
    console.log("error===>", error);
    // return error;
  }
  // console.log("seqDoc", seqDoc.seqValue);
};

module.exports = getLatLongUpdate;
