var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://man.cristiana1%40gmail.com:Pw1234@ds025792.mlab.com:25792/fitnessdb';

router.route('/orders/')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) {
                res.status(500);
                res.json({
                    'error': 'Internal Server Error'
                });
            } else {
                var collection = db.collection('orders');
                collection.find().toArray(function(err, result) {

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
                res.status(500);
                res.json({
                    'error': 'Internal Server Error'
                });
            } else {
                var orderCollection = db.collection('orders');
                var userCollection = db.collection('users');
                var prodCollection = db.collection('products');

                // find user
                userCollection.findOne({
                    '_id': ObjectID(req.body.user)
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
                        //res.status(200); //ok
                        //res.json(result);
                        // console.log(result);
                        var ordersTotal = {};
                        ordersTotal.user = result;
                        ordersTotal.status = {
                            'payment': {
                                'status': 1,
                                'description': 'created'
                            },
                            'flow': {
                                'status': 1,
                                'description': 'created'
                            }
                        };
                        ordersTotal.shipping = {'method' : {'code' : 1, 'description' : 'Post Danmark, packages'}};
                        ordersTotal.products = [];
                        // find products
                        //var productsArray = [];
                        req.body.products.forEach(function(element, index, array) {

                            prodCollection.findOne({
                                '_id': ObjectID(element)
                            }, function(err, result) {
                                //console.log(err);
                                ordersTotal.products.push(result);
                                //console.log(result);
                                //console.log(index);
                                if (index === array.length - 1) {
                                    //console.log(ordersTotal);
                                    //res.json(ordersTotal);

                                    // insert order in db
                                    orderCollection.insert(ordersTotal, function(err, result) {
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
                                            res.location('/api/orders/' + result.insertedIds.toString());
                                            res.json({
                                                "message": "order added"
                                            });
                                        }
                                        db.close();
                                    });
                                };
                            });
                            // db.close();

                        });
                        //console.log(ordersTotal);

                    }

                });
            }
        });
    });


router.route('/orders/:id')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send({
                    "message": "Internal Server Error"
                });
            };

            var collection = db.collection('orders');
            try {
                collection.findOne({
                    '_id': ObjectID(req.params.id)
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

            var collection = db.collection('orders');

            collection.update({
                '_id': ObjectID(req.params.id)
            }, {
                $set: req.body
            }, function(err, result) {
                // response to the browser
                res.status(201);
                res.location(/api/orders/ + ObjectID(req.params.id));
                res.json({
                    "message": "order edited"
                });
                db.close();
            });
        });
    })
    
    .delete(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            var collection = db.collection('orders');
            collection.remove({
                '_id': ObjectID(req.params.id)
            }, function(err, result) {
                res.status(202);
                res.json({
                    'message': 'order deleted'
                });
                db.close();
            });
        });
    });

module.exports = router;
