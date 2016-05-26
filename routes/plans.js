var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://man.cristiana1%40gmail.com:Pw1234@ds025792.mlab.com:25792/fitnessdb';

router.route('/')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) { 
                res.status(500).send({"error" : "Internal Server Error"});
            } else {
                var collection = db.collection('plans');
                collection.find({'user_id': ObjectID(req.params.users_id)}).toArray(function(err, result) {

                    if (err) {
                        res.status(500);
                        res.json({
                            'error': 'Internal Server Error'
                        });
                    } else {
                        res.status(200);
                        res.json(result);
                    }

                    db.close();
                });
            }
        });
    })
   
    .post(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) {
                res.status(500).send({"error": "Internal Server Error"});
            } else {
                var planCollection = db.collection('plans');
                var userCollection = db.collection('users');
                var exerciseCollection = db.collection('exercises');

                // find user
                userCollection.findOne({'_id': ObjectID(req.body.user)}, function(err, result) {
                    if (err) {
                        res.status(500).send({"message": "Internal Server Error"});
                    } else if (result === null) {
                        res.status(404).send({"message": "404"});
                    } else {
                        //res.status(200); //ok
                        //res.json(result);
                        // console.log(result);
                        var plansTotal = {};
                        plansTotal.user = result;
                        plansTotal.status = {
                            'payment': {
                                'status': 1,
                                'description': 'created'
                            },
                            'flow': {
                                'status': 1,
                                'description': 'created'
                            }
                        };
                        plansTotal.shipping = {'method' : {'code' : 1, 'description' : 'Post Danmark, packages'}};
                        plansTotal.products = [];
                        // find products
                        //var productsArray = [];
                        req.body.products.forEach(function(element, index, array) {

                            prodCollection.findOne({'_id': ObjectID(element)}, function(err, result) {
                                //console.log(err);
                                plansTotal.products.push(result);
                                //console.log(result);
                                //console.log(index);
                                if (index === array.length - 1) {
                                    //console.log(plansTotal);
                                    //res.json(plansTotal);

                                    // insert plan in db
                                    planCollection.insert(plansTotal, function(err, result) {
                                        if (err) {
                                            res.status(500).send({
                                                "message": "Internal Server Error"
                                            });
                                        } else if (result === null) {
                                            res.status(404).send({
                                                "msg": "404"
                                            });
                                        } else {
                                            res.status(201);
                                           // res.location('/api/plans/' + result.insertedIds.toString());
                                            res.json({
                                                "message": "plan added"
                                            });
                                        }
                                        db.close();
                                    });
                                };
                            });
                            // db.close();

                        });
                        //console.log(plansTotal);

                    }

                });
            }
        });
    });


router.route('/:id')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send({
                    "message": "Internal Server Error"
                });
            };

            var collection = db.collection('plans');
            try {
                collection.findOne({
                    '_id': ObjectID(req.params.id),
                    'user_id': ObjectID(req.params.users_id)
                }, function(err, result) {
                    if (err) {
                        res.status(500).send({
                            "message": "Internal Server Error"
                        });
                    } else if (result === null) {
                        res.status(404).send({
                            "msg": "404"
                        });
                    } else {
                        res.status(200); //ok
                        res.json(result);

                    }
                    db.close();
                });
            } catch (e) {
                res.status(400);
                res.json({
                    'error': 'Bad Request'
                });
                db.close();
            }

        });
    })


.put(function(req, res) {
        MongoClient.connect(url, function(err, db) {

            var collection = db.collection('plans');

            collection.update({
                '_id': ObjectID(req.params.id)
            }, {
                $set: req.body
            }, function(err, result) {
                // response to the browser
                res.status(201);
                res.location(/api/plans/ + ObjectID(req.params.id));
                res.json({
                    "message": "plan edited"
                });
                db.close();
            });
        });
    })
    
    .delete(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            var collection = db.collection('plans');
            collection.remove({
                '_id': ObjectID(req.params.id)
            }, function(err, result) {
                res.status(202);
                res.json({
                    'message': 'plan deleted'
                });
                db.close();
            });
        });
    });

module.exports = router;
