const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    title: { type: String },
    mobile: { type: String, required: true },
    imageUrl: { type: String },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
