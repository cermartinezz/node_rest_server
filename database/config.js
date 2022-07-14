const mongoose = require('mongoose')

const connection = async () => {
  try {

    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('BD connected')

  } catch (error) {
    console.log(error);
    throw new Error('Error on db connection')
  }
}

module.exports = {
  connection
}