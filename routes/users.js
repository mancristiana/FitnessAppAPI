var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost/store';

/**
 * @api {get} /api/users/ Get all Users
 * @apiName GetAllUser
 * @apiGroup Users
 * @apiVersion 0.0.1
 *
 * @apiSuccess {String} name Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} address Address of the User.
 * @apiSuccess {String} phone   Phone of the User.
 * @apiSuccess {String} email   email of the User.
 *
 * @apiSuccess (Success 304) 304 Not Modified
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id" : "ObjectId(12345)",
 *       "name" : "xxx", 
 *       "lastname":"xxx",
 *       "address":"xxx",
 *       "phone":"xxxxxxxxx",
 *       "email":"xxx"
 *     }
 *
 * @apiSuccessExample {json} Success-Response (304):
 *     HTTP/1.1 304 Not Modified
 *
 * @apiSampleRequest http://localhost:3000/api/users/
 *
 * @apiError (Error 5xx) 500 Internal Server Error 
 *
 */

router.route('/users/')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) {
                res.status(500);
                res.json({
                    'error': 'Internal Server Error'
                });
            } else {
                var collection = db.collection('users');
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
     * @api {post} /api/users/ Create User
     * @apiName createUser
     * @apiGroup Users
     * @apiVersion 0.0.1
     * 
     * @apiParamExample {json} Post-Example:
     *     {
     *          "name" : "xxx",
     *          "lastName" : "xxx",
     *          "address" : "xxx",
     *          "phone" : "4512",
     *          "email" : "xxx"
     *     }
     *
     * @apiSuccess (Success 201) 201 User Created
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 Created 
     *     Location : /api/users/<ObjectId>
     *     {
     *       "message": "user added"
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
                var collection = db.collection('users');

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
                        res.location('/api/users/' + result.insertedIds.toString());
                        res.json({
                            "message": "user added"
                        });
                    }
                    db.close();
                });

            }


        });
    });


/**
 * @api {get} /api/users/:id Get User
 * @apiName GetUser
 * @apiGroup Users
 * @apiVersion 0.0.1
 *
 * @apiParam {ObjectId} id Users unique ID.
 *
 * @apiSuccess {String} name Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} address Address of the User.
 * @apiSuccess {String} phone   Phone of the User.
 * @apiSuccess {String} email   email of the User.
 *
 * @apiSuccess (Success 304) 304 Not Modified
 *  
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id" : "ObjectId(12345)",
 *       "name" : "xxx", 
 *       "lastname":"xxx",
 *       "address":"xxx",
 *       "phone":"xxxxxxxxx",
 *       "email":"xxx"
 *     }
 *
 * @apiSuccessExample {json} Success-Response (304):
 *     HTTP/1.1 304 Not Modified
 *
 * @apiSampleRequest http://localhost:3000/api/users/:id
 *
 * @apiError 404 User Not Found
 * @apiError 400 Bad Request <br>A wrong formated <code>id</code> was sent
 *
 * @apiError (Error 5xx) 500 Internal Server Error 
 *
 */

router.route('/users/:id')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send({
                    "message": "Internal Server Error"
                });
            };

            var collection = db.collection('users');
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
                        /*
                                                var links = [{
                                                    "rel": "self",
                                                    "href": "http://localhost:3000/users/" + req.params.id
                                                }];

                                                result.links = links;*/
                        console.log(result);
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
 * @api {put} /api/users/:id Update User
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiParam {ObjectId} id Users unique ID.
 *
 * @apiSuccess (Success 201) 201 User Created
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created 
 *     Location : /api/users/<ObjectId>
 *     {
 *       "message": "user updated"
 *     }
 *     
 * @apiError 404 User Not Found
 * @apiError 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 * 
 */
.put(function(req, res) {
        MongoClient.connect(url, function(err, db) {

            var collection = db.collection('users');

            collection.update({
                '_id': ObjectID(req.params.id)
            }, {
                $set: req.body
            }, function(err, result) {
                // response to the browser
                res.status(201);
                res.location(/api/users/ + ObjectID(req.params.id));
                res.json({
                    "message": "user edited"
                });
                db.close();
            });
        });
    })
    /**
     * @api {delete} /users/:id Delete User
     * @apiName DeleteUser
     * @apiGroup Users
     * @apiVersion 0.0.1
     *
     * @apiParam {ObjectId} id Users unique ID.
     *
     * @apiSuccess (Success 204) 204 No Content
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 204 No Content
     *
     * @apiError 404 User Not Found
     * @apiError 400 Bad Request <br>A wrong formated <code>id</code> was sent
     *
     * @apiError (Error 5xx) 500 Internal Server Error 
     *
     */
    .delete(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            var collection = db.collection('users');
            collection.remove({
                '_id': ObjectID(req.params.id)
            }, function(err, result) {
                res.status(202);
                res.json({
                    'message': 'user deleted'
                });
                db.close();
            });
        });
    });

module.exports = router;
