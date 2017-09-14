
//import dependencies
const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const User = require('./src/users');

//create instance
const app = express();
const router = express.Router();




const port = process.env.API_PORT || 4000;
mongoose.connect('mongodb://zwang1208:733478@ds139072.mlab.com:39072/zwang1208');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //remove caching so get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

app.use('/api', router);

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});

router.get('/',function (req, res) {
    res.json({message:'API Initialized'})
});
router.route('/users')
    .get(function (req,res) {
    User.find(function (err, users) {
        if(err) res.send(err);
        res.json(users)
});
})
    .post(function (req,res) {
        let user = new User();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;

        user.save(function (err) {
            if(err) res.send(err);
            res.json({message:'user successful added!'});

        });
    });


router.route('/users/:user_id')
    .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            (req.body.firstname) ? user.firstname = req.body.firstname : null;
            (req.body.lastname) ? user.lastname = req.body.lastname : null;
            (req.body.username) ? user.username = req.body.username : null;
            (req.body.password) ? user.password = req.body.password : null;
            (req.body.email) ? user.email = req.body.email : null;
            //save comment
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Comment has been updated' });
            });
        });
    })
    .delete(function(req, res) {
        //selects the user by its ID, then removes it.
        User.remove({ _id: req.params.user_id }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'user has been deleted' })
        })
    });




