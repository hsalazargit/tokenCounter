module.exports = function(app, db) {

    const profile_db_collection = 'profile';  // the mongobd collection name for profile objects
    
    // Create route
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


    app.get('/profile/:id', (req, res) => {
        console.log('incoming get: '+ req.body);
    });
};