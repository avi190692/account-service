const mongoose = require('mongoose');

const mongoConnect = (mongoURL) => {
    mongoose.connect(mongoURL, { useNewUrlParser: true });
    mongoose.connection.on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

module.exports = {
    mongoConnect
}