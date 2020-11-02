const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: 'r!',
    },
    memberWelcomeChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    memberByeChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    suggestChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
})

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);