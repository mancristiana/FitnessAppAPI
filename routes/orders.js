var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost/store';
/**
 * @api {get} /api/orders/ Get all Orders
 * @apiName GetAllOrders
 * @apiGroup Orders
 * @apiVersion 0.0.3
 *
 * @apiSuccess {String} make Make of the Product.
 * @apiSuccess {String} name  name of the Product.
 * @apiSuccess {String} color Color of the Product.
 * @apiSuccess {Number} price Number of the Product.
 * @apiSuccess {Array} size Sizes of the Product.
 * @apiSuccess {Object} details Details of the Product.
 *
 * @apiSuccess (Success 304) 304 Not Modified
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *       "make" : "Burton Menswear London",
 *       "name" : "Print T-shirt",
 *       "color" : "white",
 *       "price" : 16,
 *       "size" : ["small", "medium", "large", "x-large"],
 *       "details" : {
 *               "length" : "standard",
 *               "fit" : "normal",
 *               "fabric" : "jersey",
 *               "Neckline" : "Crew neck",
 *               "Total length" : "28.0\"  (Size M)"
 *       }
 *     }
 *
 * @apiSuccessExample {json} Success-Response (304):
 *     HTTP/1.1 304 Not Modified
 *
 * @apiSampleRequest http://localhost:3000/api/products/
 *
 * @apiError (Error 5xx) 500 Internal Server Error 
 *
 */

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
    /**
     * @api {post} /api/orders/ Create Order
     * @apiName createOrder
     * @apiGroup Orders
     * @apiVersion 0.0.3
     * 
     * @apiParamExample {json} Post-Example:
     *    {
     *       "user" : <ObjectId>,
     *       "products" : [<ObjectId>, <ObjectId>, <ObjectId>]
     *     }
     *
     * @apiSuccess (Success 201) 201 Order Created
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 Created 
     *     Location : /api/orders/<ObjectId>
     *     {
     *       "message": "product added"
     *     }
     *     
     * @apiError 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
     *
     * @apiError (Error 5xx) 500 Internal Server Error
     */
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

/**
 * @api {get} /api/orders/:id Get Order
 * @apiName GetOrder
 * @apiGroup Orders
 * @apiVersion 0.0.3
 *
 * @apiParam {ObjectId} id Orders unique ID.
 *
 * @apiSuccess {String} make Make of the Product.
 * @apiSuccess {String} name  name of the Product.
 * @apiSuccess {String} color Color of the Product.
 * @apiSuccess {Number} price Number of the Product.
 * @apiSuccess {Array} size Sizes of the Product.
 * @apiSuccess {Object} details Details of the Product.
 *
 * @apiSuccess (Success 304) 304 Not Modified
 *  
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *       "make" : "Burton Menswear London",
 *       "name" : "Print T-shirt",
 *       "color" : "white",
 *       "price" : 16,
 *       "size" : ["small", "medium", "large", "x-large"],
 *       "details" : {
 *               "length" : "standard",
 *               "fit" : "normal",
 *               "fabric" : "jersey",
 *               "Neckline" : "Crew neck",
 *               "Total length" : "28.0\"  (Size M)"
 *       }
 *     }
 *
 * @apiSuccessExample {json} Success-Response (304):
 *     HTTP/1.1 304 Not Modified
 *
 * @apiSampleRequest /api/orders/:id
 *
 * @apiError 404 Product Not Found
 * @apiError 400 Bad Request <br>Wrongly formated <code>id</code> was sent.
 *
 * @apiError (Error 5xx) 500 Internal Server Error 
 */

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

/**
 * @api {put} /api/orders/:id Update Order
 * @apiName UpdateOrder
 * @apiGroup Orders
 * @apiVersion 0.0.3
 *
 * @apiParam {ObjectId} id Order unique ID.
 *
 * @apiSuccess (Success 201) 201 Order Created
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created 
 *     Location : /api/orders/<ObjectId>
 *     {
 *       "message": "Order updated"
 *     }
 *     
 * @apiError 404 Order Not Found
 * @apiError 400 Bad Request <br>Wrongly formated <code>json</code> or <code>id</code> was sent.
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 * 
 */
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
    /**
     * @api {delete} /api/orders/:id Delete Order
     * @apiName DeleteOrder
     * @apiGroup Orders
     * @apiVersion 0.0.3
     *
     * @apiParam {ObjectId} id Order unique ID.
     *
     * @apiSuccess (Success 204) 204 No Content
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 204 No Content
     *
     * @apiError 404 Product Not Found
     * @apiError 400 Bad Request <br>A wrong formated <code>id</code> was sent
     *
     * @apiError (Error 5xx) 500 Internal Server Error 
     *
     */
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
