const mongoose = require("mongoose");

module.exports = () => {
  try {
    mongoose
      .connect(process.env.DB)
      .then(() => console.log("Connected to database"))
      .catch((err) => console.error(" Could not connect to database:", err));
  } catch (error) {
    console.error(error);
    console.log(" Could not connect to database");
  }
};
