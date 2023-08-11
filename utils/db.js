const { default: mongoose } = require("mongoose");

module.exports = async function () {
  //   console.log("sindie", process.env.MONGO_URI);
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    console.log(`${db.connection.host}`);
  } catch (error) {
    console.log(`${error.message}`);
  }
};
