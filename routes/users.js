var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var passwordHash = require('password-hash');
var url = 'mongodb://man.cristiana1%40gmail.com:Pw1234@ds025792.mlab.com:25792/fitnessdb';

router.route('/')
    /**
    * @api {post} /users Create User
    * @apiName CreateUser
    * @apiGroup Users
    * @apiVersion 0.0.2
    * 
    * @apiDescription This request creates a new user by using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated _id is returned
    *    
    * @apiParam (User fields) {String} _id         Unique Mongo generated id of the User.
    * @apiParam (User fields) {String} email       Email of User. Also serves as username for User account.
    * @apiParam (User fields) {String} password    Password for User account.
    * @apiParam (User fields) {String} name        Firstname of the User.
    * @apiParam (User fields) {String} lastname    Lastname of the User.
    * @apiParam (User fields) {Number} level       Level of training progress for the User.
    * @apiParam (User fields) {Number} metric      Metric refers to measurement in KG or LB. This field can be either 0 for KG or 1 for LB. Default value is 0.
    * @apiParam (User fields) {Number} weight      Weight in specified metric of User.
    * @apiParam (User fields) {Number} height      Height in specified metric of User.
    *
    * @apiParamExample {json} Post-Example:
    *    {
    *       "email" : "mail2@example.com",
    *       "password" : "PAss11#!", 
    *       "name" : "Daenerys",
    *       "lastname" : "Targaryen",
    *       "level" : "9000",
    *       "metric" : "0",
    *       "weight" : "45.3",
    *       "height" : "165.5"
    *   }
    *
    * @apiSuccess (Success 2xx) 201 User Created
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 201 Created 
    *     Location : /api/users/<ObjectId>
    *     {
    *       "_id" : "5746d36bfa2cdf7c300bf61c",
    *       "message": "User added"
    *     }
    * 
    * @apiError (Error 5xx) 500 Internal Server Error
    */
    .post(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) {
                res.status(500);
                res.json({ "message": "Internal Server Error" });
            } else {
                var collection = db.collection('users');

                var userToCreate = req.body;
                console.log('PASS = ' + userToCreate.password);
                userToCreate.password = passwordHash.generate(userToCreate.password);
                console.log('HASH = ' + userToCreate.password);
                collection.insert(userToCreate, function(err, result) {

                    if (err) {
                        res.status(500);
                        res.json({ "message": "Internal Server Error" });
                    } else {
                        res.status(201);
                        res.location('/' + result.insertedIds.toString());
                        res.json({
                            "_id" : result.insertedIds.toString(),
                            "message": "User added"
                        });
                    }
                    db.close();
                });
            }

        });
    });

router.route('/:id')
    /**
    * @api {get} /users/id Get User
    * @apiName GetUser
    * @apiGroup Users
    * @apiVersion 0.0.2
    *
    * @apiDescription This request returns the user specified by the unique ID in the request URL 
    *
    * @apiParam {ObjectId} id The unique ID of the User.
    *
    * @apiSuccess (Success 2xx) 200 OK
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *     {
    *           "_id" : "54c64290a85e56f1f6b1c229",
    *           "email" : "mail2@example.com",
    *           "name" : "Sansa",
    *           "lastname" : "Stark",
    *           "level" : "4",
    *           "metric" : "0",
    *           "weight" : "123.3",
    *           "height" : "172.5"
    *     }
    *
    * @apiError 404 User Not Found
    * @apiError 400 Bad Request <br>A wrong formated <code>id</code> was sent
    * @apiError (Error 5xx) 500 Internal Server Error 
    *
    */

    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500);
                res.json({ "error" : "Internal Server Error" });
            };

            var collection = db.collection('users');
            try {
                collection.findOne({ '_id': ObjectID(req.params.id) }, function(err, result) {

                    if (err) {
                        res.status(500);
                        res.json({ "error" : "Internal Server Error" });
                    } else if (result === null) {
                        res.status(404);
                        res.json({ "error" : "User Not Found" });
                    } else {
                        res.status(200); //ok
             
                        delete result.password;
                        res.json(result);
                    }
                });
            } catch (e) {
                res.status(400);
                res.json({
                    'error': 'Bad Request'
                });
            } finally {
                db.close();
            }

        });
    })

    /**
    * @api {put} /users/id Update User
    * @apiName UpdateUser
    * @apiGroup Users
    * @apiVersion 0.0.2
    *
    * @apiDescription This request updates an existing user using the json body provided and the _id parameter specified in the request URL. For consistency the json may include keys like in the example below. 
    * @apiParam {ObjectId} id Users unique ID.
    * @apiParamExample {json} Edit-Fitness-Example:
    *   {
    *       "level" : "4",
    *       "metric" : "0",
    *       "weight" : "123.3",
    *       "height" : "172.5"
    *   }
    *
    * @apiParamExample {json} Edit-Account-Example:
    *   {
    *       "password" : "c0e81794384491161f1777c232bc6bd9ec38f616560b120fda8e90f383853542", 
    *       "name" : "Sansa",
    *   }
    *
    * @apiSuccess (Success 2xx) 201 User Edited
    *
    * @apiSuccessExample {json} Success-Response:
    *       HTTP/1.1 201 Created 
    *       Location : /api/users/<ObjectId>
    *       {
    *           "message" : "User edited"
    *       }
    *     
    * @apiError 404 User Not Found
    * @apiError 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
    * @apiError (Error 5xx) 500 Internal Server Error
    * 
    */
    .put(function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500);
                res.json({ "error" : "Internal Server Error" });
                return;
            } 
            var collection = db.collection('users');

            try {
                collection.update({ '_id': ObjectID(req.params.id)}, { $set : req.body }, function(err, result) {
                    res.status(201);
                    res.json({ "message" : "User edited" });
                });
            } catch (e) {
                res.status(400);
                res.json({ "error" : "Bad Request" });
            } finally {
                db.close();
            }
           
        });
    })

    /**
    * @api {delete} /users/id Delete User
    * @apiName DeleteUser
    * @apiGroup Users
    * @apiVersion 0.0.2
    *
    * @apiDescription This request deletes an existing user with the _id parameter specified in the request URL.  
    * @apiParam {ObjectId} id Users unique ID.
    *
    * @apiSuccess (Success 2xx) 204 No Content
    *
    * @apiSuccessExample {json} Success-Response:
    *       HTTP/1.1 204 No Content 
    *       {
    *           "message" : "User deleted"
    *       }      
    *
    * @apiError 404 User Not Found
    * @apiError 400 Bad Request <br>A wrong formated <code>id</code> was sent
    * @apiError (Error 5xx) 500 Internal Server Error 
    *
    */
    .delete(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500);
                res.json({ "error" : "Internal Server Error"});
                return;
            }
            var collection = db.collection('users');

            try {
                collection.remove({ "_id" : ObjectID(req.params.id) }, function(err, result) {
                    res.status(204);
                    res.json({ "message" : "User deleted" });
                });
            } catch(e) {
                res.status(400);
                res.json({ "error" : "Bad Request" });
            } finally {
                db.close();
            }
        });
    });

    /**
    * @api {post} /users/verify Verify User Credential
    * @apiName Verify
    * @apiGroup Users
    * @apiVersion 0.0.2
    *
    * @apiDescription This request checks if the username and password specified within the Json body match the db credentials of the User.  
    * @apiParam (Request body) {String} email Users email.
    * @apiParam (Request body) {String} password Users password.
    *
    * @apiSuccess (Success 2xx) 200 OK
    *
    * @apiSuccessExample {json} Success-Response:
    *       HTTP/1.1 200 No Content 
    *       {
    *           "message" : "User password is correct"
    *       }      
    * @apiError 401 User Password is incorrect
    * @apiError 404 User Not Found
    * @apiError 400 Bad Request <br>A wrong formated <code>JSON</code> was sent
    * @apiError (Error 5xx) 500 Internal Server Error 
    *
    */

router.route("/verify")
    .post(function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500);
                res.json({ "error" : "Internal Server Error"});
                return;
            }
            var collection = db.collection('users');

            try {
                collection.get({"email" : req.body.email.toString()}, function(err, result) {
                    if (err) {
                        res.status(500);
                        res.json({ "error" : "Internal Server Error"});
                    } else if (result === null) {
                        res.status(404);
                        res.json({ "error" : "User Not Found" });
                    } else if (passwordHash.verify(req.body.password.toString(), result.password.toString())) {
                        res.status(200); //ok
                        res.json({ 'message' : 'User password is correct' });
                    } else {
                        res.status(401); //ok
                        res.json({ "error" : "User password is incorrect" });
                    }
                });
            } catch (e) {
                res.status(400);
                res.json({ 'error': 'Bad Request'});
            } finally {
                db.close();
            }

        });
    });

module.exports = router;
