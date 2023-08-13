const mongoose = require('mongoose');

const TokensBlacklistSchema = new mongoose.Schema({
    token: {
        type: String
    }
});

// TokensBlacklistSchema.index({ tokens: 1}, {
//     collation: {
//         locale: 'en',
//         strength: 2
//     }
// });

const TokensBlacklist = mongoose.model('TokensBlacklist', TokensBlacklistSchema);

module.exports = TokensBlacklist;