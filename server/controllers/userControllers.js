const User = require("../model/userModel");

module.exports.register = async (req, res, next) => {
  try {
    const { city, state, SeatsSelected } = req.body;

    console.log(city);
    const select = await User.create({
      city,
      state,
      SeatsSelected,
    });
    return res.json({ status: true, select });
  } catch (err) {
    next(err);
  }
};
module.exports.checkOccupied = async (req, res, next) => {
  try {
    const { city, state } = req.body;
    const check = await User.findOne({ username });
    if (!check) {
      return res.json({ msg: "Not found", status: false });
    }

    return res.json({ status: true, check });
  } catch (err) {
    next(err);
  }
};
