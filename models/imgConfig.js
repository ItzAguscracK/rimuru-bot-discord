const mongoose = require('mongoose');

const imgConfigSchema = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    image: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    imageBye: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});

module.exports = mongoose.model('imagenConfig', imgConfigSchema);