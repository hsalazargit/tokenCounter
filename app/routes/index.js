const profileRoutes = require('./profile_routes.js');

module.exports = function(app,db) { profileRoutes(app, db);
    // add new routes here
};