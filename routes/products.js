var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost/store';

/**
 * @api {get} /api/products/ Get all Products
 * @apiName GetAllProducts
 * @apiGroup Products
 * @apiVersion 0.0.2
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

router.route('/products/')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) {
                res.status(500);
                res.json({
                    'error': 'Internal Server Error'
                });
            } else {
                var collection = db.collection('products');
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
     * @api {post} /api/products/ Create Product
     * @apiName createProduct
     * @apiGroup Products
     * @apiVersion 0.0.2
     * 
     * @apiParamExample {json} Post-Example:
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
     * @apiSuccess (Success 201) 201 Product Created
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 Created 
     *     Location : /api/products/<ObjectId>
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
                var collection = db.collection('products');

                collection.insert(req.body, function(err, result) {

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
                        res.location('/api/products/' + result.insertedIds.toString());
                        res.json({
                            "message": "product added"
                        });
                    }
                    db.close();
                });

            }


        });
    });

/**
 * @api {get} /api/products/:id Get Product
 * @apiName GetProduct
 * @apiGroup Products
 * @apiVersion 0.0.2
 *
 * @apiParam {ObjectId} id Products unique ID.
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
 * @apiSampleRequest /api/products/:id
 *
 * @apiError 404 Product Not Found
 * @apiError 400 Bad Request <br>Wrongly formated <code>id</code> was sent.
 *
 * @apiError (Error 5xx) 500 Internal Server Error 
 */

router.route('/products/:id')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send({
                    "message": "Internal Server Error"
                });
            };

            var collection = db.collection('products');
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
 * @api {put} /api/products/:id Update Product
 * @apiName ProductUser
 * @apiGroup Products
 * @apiVersion 0.0.2
 *
 * @apiParam {ObjectId} id Product unique ID.
 *
 * @apiSuccess (Success 201) 201 Product Created
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created 
 *     Location : /api/products/<ObjectId>
 *     {
 *       "message": "Product updated"
 *     }
 *     
 * @apiError 404 Product Not Found
 * @apiError 400 Bad Request <br>Wrongly formated <code>json</code> or <code>id</code> was sent.
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 * 
 */
.put(function(req, res) {
        MongoClient.connect(url, function(err, db) {

            var collection = db.collection('products');

            collection.update({
                '_id': ObjectID(req.params.id)
            }, {
                $set: req.body
            }, function(err, result) {
                // response to the browser
                res.status(201);
                res.location(/api/products / +ObjectID(req.params.id));
                res.json({
                    "message": "product edited"
                });
                db.close();
            });
        });
    })
    /**
     * @api {delete} /api/products/:id Delete Product
     * @apiName DeleteProduct
     * @apiGroup Products
     * @apiVersion 0.0.2
     *
     * @apiParam {ObjectId} id Products unique ID.
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

            var collection = db.collection('products');
            collection.remove({
                '_id': ObjectID(req.params.id)
            }, function(err, result) {
                res.status(202);
                res.json({
                    'message': 'product deleted'
                });
                db.close();
            });
        });
    });

module.exports = router;
