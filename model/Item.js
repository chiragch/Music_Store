var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    itemCode: {
        type: Number,
        required: true,
        trim: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    catalogCategory: String,
    description: [String],
    rating: Number,
    imageUrl: String
});

module.exports = mongoose.model('items', ItemSchema);