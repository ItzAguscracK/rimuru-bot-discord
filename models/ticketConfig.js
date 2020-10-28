const mongoose = require('mongoose');

const ticketConfigSchema = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String
    },
    ticket_msg: {
        type: mongoose.SchemaTypes.String
    },
    tickets: [{
        state: {
            type: mongoose.SchemaTypes.String
        },
        user: {
            type: mongoose.SchemaTypes.String
        },
        channel: {
            type: mongoose.SchemaTypes.String
        },
        msg: {
            type: mongoose.SchemaTypes.String
        }

    }]
});

module.exports = mongoose.model('TicketConfig', ticketConfigSchema);