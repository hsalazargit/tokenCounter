var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    const profile_db_collection = 'profile';  // the mongobd collection name for profile objects
    
    // Post api call to create profile
    app.post('/profile', (req, res) => {
        // create profile here
        console.log(req.body);

        // validate request body
        
        // build profile entry
        const profile = { username: req.body.username, 
                          tokenbalance: req.body.tokenbalance };

        // attempt to insert profile
        db.collection(profile_db_collection).insert(profile, (err, result) => {
            if (err)
            {
                res.send({'error': 'An error occured during profile insertion' });
            }
            else
            {
                res.send(result.ops[0]);
            }
        });
    });

    // Get API call that returns profile object corresponding to the id
    app.get('/profile/:id', (req, res) => {
        console.log('incoming Get request: ');
        console.log(req.params.id);

        const id = req.params.id;
        const profileId = { '_id': new ObjectID(id) };  // wrap raw profile id into mongodb id object

        db.collection(profile_db_collection).findOne(profileId, (err, profile) => {
            if (err)
            {
                res.send({'error': 'An error occured while fetching profile data'});
            }
            else
            {
                console.log('Profile fetch results: ' + profile);
                res.send(profile);
            }
        });
    });

    // Get API call that returns profile object corresponding to the username parameter
    app.get('/profile/id/:username', (req, res) => {
        console.log('incoming Get request profileId for: ');
        console.log(req.params.username);

        const username = { 'username': req.params.username };  // wrap raw profile id into mongodb id object

        db.collection(profile_db_collection).findOne(username, (err, profileID) => {
            if (err)
            {
                res.send({'error': 'An error occured while fetching profile data'});
            }
            else
            {
                console.log('Profile fetch results: ' + profileID);
                res.send(profileID);
            }
        });
    });

};