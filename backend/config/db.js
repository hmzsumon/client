const mongoose = require('mongoose');

let URI = '';

if (process.env.NODE_ENV === 'PRODUCTION') {
  URI = process.env.DB_URI;
} else {
  URI = 'mongodb://localhost/alam-vai';
}

const connectDB = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDB;
