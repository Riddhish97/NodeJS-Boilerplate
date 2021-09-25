module.exports = function (mongoose) {
    var options = {
        collection: 'match_data',
        timestamps: {
            createdAt: 'created_on',
            updatedAt: 'updated_on',
        }
    };
    var matchData = new mongoose.Schema({
        season: {
            type: String
        },
        team1: {
            type: String
        },
        team2: {
            type: String
        },
        winner: {
            type: String
        },
        win_by_runs: {
            type: String
        },
        win_by_wickets: {
            type: String
        },
        player_of_match: {
            type: String
        },
    }, options);

    return matchData;
};