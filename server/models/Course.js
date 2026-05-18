const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    price: { type: Number, required: true, default: 0 },
    originalPrice: { type: Number },

    instructor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    category: { type: String, required: true },
    level: { 
        type: String, 
        enum: ['Beginner', 'Intermediate', 'Advanced'], 
        default: 'Beginner' 
    },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
