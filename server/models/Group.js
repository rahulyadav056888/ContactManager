const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
