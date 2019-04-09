var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
};

var UserItemListSchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true,
    },
    catalogCategory: {
        type: String,
        required: true,
        trim: true,
    },
    rating: Number,
    madeIt: Boolean
})

var UserProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userItemList: [UserItemListSchema]
}, schemaOptions);

module.exports = mongoose.model('users_profiles', UserProfileSchema);