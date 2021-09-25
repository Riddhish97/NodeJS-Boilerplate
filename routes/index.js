var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    let team1, team2;
    if (req.query.team1) {
      team1 = req.query.team1;
    }
    if (req.query.team2) {
      team2 = req.query.team2;
    }

    // if sorting parameter
    let sort = {};
    if (req.query.sort && req.query.sort_field) {
      //sorting field
      sort[req.query.sort_field] = req.query.sort == "desc" ? -1 : 1;
    } else {
      sort['season'] = -1;
    }
    let match = await db.models.match_data.aggregate([{
      $match: {
        $or: [{
            $and: [{
              team1: team1
            }, {
              team2: team2
            }]
          },
          {
            $and: [{
              team2: team1
            }, {
              team1: team2
            }]
          }
        ]
      }
    }, {
      $sort: sort
    }]);
    let matchWinnerCount = await db.models.match_data.aggregate([{
      $match: {
        $or: [{
            $and: [{
              team1: team1
            }, {
              team2: team2
            }]
          },
          {
            $and: [{
              team2: team1
            }, {
              team1: team2
            }]
          }
        ]
      }
    }, {
      $group: {
        _id: "$winner",
        team1Count: {
          $sum: {
            $cond: [{
              $eq: ["$winner", team1]
            }, 1, 0]
          }
        },
        team2Count: {
          $sum: {
            $cond: [{
              $eq: ["$winner", team2]
            }, 1, 0]
          }
        }
      }
    }]);
    let matchPlayerCount = await db.models.match_data.aggregate([{
      $match: {
        $or: [{
            $and: [{
              team1: team1
            }, {
              team2: team2
            }]
          },
          {
            $and: [{
              team2: team1
            }, {
              team1: team2
            }]
          }
        ]
      }
    }, {
      $group: {
        _id: '$player_of_match',
        count: {
          $sum: 1
        }
      }
    }, {
      $sort: {
        count: -1
      }
    }]);
    res.render('index', {
      title: 'Match Details',
      site_title: "IPL",
      match: match,
      team1: team1,
      team2: team2,
      matchPlayerCount: matchPlayerCount,
      matchWinnerCount: matchWinnerCount
    });
  } catch (err) {
    console.log("Error: In get details rouet");
    console.log(err);
  }
});

module.exports = router;