const mongoose = require('mongoose')


const mangoDB = (url) => {
    return  mongoose.connect(url);
}

module.exports = mangoDB