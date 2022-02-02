const { model, Schema } = require('mongoose');

module.exports = model("server_profiles ", Schema({
    _id: String,
    prefix: {
        type: String,
        default: "."
    },
    sb: {
        lang: {
            type: String,
            default: "en"
        },
        slow: {
            type: Boolean,
            default: false
        }  
    }
}))