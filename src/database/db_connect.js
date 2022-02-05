const mongoose = require('mongoose');


const dbConnect = function() {
    return mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

    // mongodb://127.0.0.1:27017/${process.env.DB_NAME}
    // mongodb+srv://open-blog-admin:${process.env.DB_PASSWORD}@cluster0.wvtrr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority
}


module.exports = dbConnect;