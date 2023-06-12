const mongodb = require("mongoose");

const DBconntect = () => {
  mongodb
    .connect(process.env.DB)
    .then(() => {
      console.log("DB is connected Successfuly");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = DBconntect;
