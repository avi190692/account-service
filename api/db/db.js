const mongoose = require('mongoose');

const mongoConnect = (mongoURL) => {
    mongoose.connect(mongoURL, { useNewUrlParser: true, useFindAndModify : false });
    mongoose.connection.on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

module.exports = {
    mongoConnect
}