const mongoose = require('mongoose');

module.exports.connect = async dsn =>
    mongoose.connect(dsn, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
