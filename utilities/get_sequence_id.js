const campSequenceModel = require("../model/campSequenceModel");

let getSequenceNextValue = async (_id, def) => {
  try {
    console.log("value", _id, def);
    var seqDoc = await campSequenceModel
      .findOneAndUpdate({ id: _id }, { $inc: { seq: 1 } }, { new: true })
      .then(async (res) => {
        if (res != null) {
          return res.seq;
        } else {
          // console.log("res.seq====>", res.seq);
          let initialSequence = 100000001;
          await new campSequenceModel({
            id: _id,
            seq: initialSequence,
          }).save();
          return initialSequence;
        }
      })
      .catch((error) => {
        console.log("error===>", error);
        return error;
      });
    console.log("seqDoc====>,", seqDoc);
    let IdFormation = String(def).concat(seqDoc);
    return IdFormation;
  } catch (error) {
    console.log("error===>", error);
    return error;
  }
  // console.log("seqDoc", seqDoc.seqValue);
};

module.exports = getSequenceNextValue;
