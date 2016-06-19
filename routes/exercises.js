var express = require('express');

// Create a router object from the top level express object for performing middleware and routing functions. 
var router = express.Router();

// Require mongodb module
var MongoClient = require('mongodb').MongoClient; // instance needed for connecting to db
var ObjectID = require('mongodb').ObjectID;         //

// Connection URL
var url = 'mongodb://man.cristiana1%40gmail.com:Pw1234@ds025792.mlab.com:25792/fitnessdb';

// Good practice to use route method to avoid duplicate route naming and thus typo errors
router.route('/') 

    /**
    * @api {get} /exercises Request all Exercises
    * @apiName GetAllExercises
    * @apiGroup Exercises
    * @apiVersion 0.0.1
    *
    * @apiDescription This request returns all exercises which are by default available for the user. This does not include user custom made exercises.  
    *
    * @apiSuccess (Exercise Fields) {String} _id Unique Mongo generated id of the Exercise.
    * @apiSuccess (Exercise Fields) {String} name Name of the Exercise.
    * @apiSuccess (Exercise Fields) {Number} duration  Amount of time measured in minutes that the Exercise takes.
    * @apiSuccess (Exercise Fields) {Array} equipment String Array of various equipment needed for the Exercise.
    * @apiSuccess (Exercise Fields) {Number} burntQ Number of calories burnt by performing the Exercise.
    *
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *       {
    *           _id: "573ec098e85f5601f611322b",
    *           name: "Push Up",
    *           duration: 3,
    *           equipment: [
    *               "steady floor"
    *           ],
    *           burntQ: 1234
    *       },
    *       {    
    *           _id: "573ec075e85f5601f611322a",
    *           name: "Rope Jump",
    *           duration: 5,
    *           equipment: [
    *               "steady floor",
    *               "jumping rope",
    *               "jumping sneakers"
    *           ],
    *           burntQ: 2300
    *       }
    *   ]
    *
    * @apiError (Error 5xx) 500 Internal Server Error 
    *
    */
    // Handler function (middleware system) for get request
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) {
                res.status(500).send({ "error" : "Internal Server Error" });
                return;
            } 
            var collection = db.collection('exercises');
            collection.find().toArray(function(err, result) {

                if (err) {
                    res.status(500).send({ "error" : "Internal Server Error" });
                    return;
                } 
                res.status(200);
                res.json(result);

                db.close();
            });

        });
    })

    /**
    * @api {post} /exercises Create Exercise
    * @apiName CreateExercise
    * @apiGroup Exercises
    * @apiVersion 0.0.2
    *
    * @apiDescription This request creates a new exercise using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated _id is returned
    *
    * @apiParam (Requested Fields) {String} name Name of the Exercise.
    * @apiParam (Requested Fields) {Number} duration  Amount of time measured in minutes that the Exercise takes.
    * @apiParam (Requested Fields) {Array} equipment String Array of various equipment needed for the Exercise.
    * @apiParam (Requested Fields) {Number} burntQ Number of calories burnt by performing the Exercise.
    *
    * @apiParamExample {json} Post-Example:
    *   {
    *       name: "Air Bike",
    *       duration: 5,
    *       equipment: [
    *           "mat"
    *       ],
    *       burntQ: 1200
    *   }
    * 
    * @apiSuccess (Success 2xx) 201 Exercise Created
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 201 Created 
    *     Location : /api/Exercises/<ObjectId>
    *     {
    *       '_id' : '5746d36bfa2cdf7c300bf61c',
    *       'message': 'Exercise added'
    *     }
    *
    * @apiError (Error 4xx) 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
    * @apiErrorExample {json} Error-Response:
    *   HTTP/1.1 404 Not Found
    *   {
    *       'error': 'ExerciseNotFound'
    *   }
    *
    * @apiError (Error 5xx) 500 Internal Server Error 
    * @apiErrorExample {json} Error-Response:
    *   HTTP/1.1 500 Internal Server Error
    *   {
    *       'error': 'Internal Server Error'
    *   }
    *
    */

    .post(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) {
                res.status(500);
                res.json({
                    'error': 'Internal Server Error'
                });
            } else {
                var collection = db.collection('exercises');

                collection.insert(req.body, function(err, result) {
                    
                    if (err) {
                        res.status(500).send({
                            "message": "Internal Server Error"
                        });
                    } else {
                        res.status(201);
                        res.location('/' + result.insertedIds.toString());
                        res.json({
                            "_id": result.insertedIds.toString(),
                            "message": "Exercise added"
                        });
                    }
                    db.close();
                });
            }
        });
    });

    router.route('/:id')

    /**
    * @api {get} /exercises/id Get Exercise
    * @apiName GetExercise
    * @apiGroup Exercises
    * @apiVersion 0.0.1
    *
    * @apiDescription This request returns the exercise specified by the unique ID in the request URL 
    *
    * @apiParam {ObjectId} id The unique ID of the Exercise.
    *
    * @apiSuccess (Success 2xx) 200 OK
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   {
    *       _id: "573ec098e85f5601f611322b",
    *       name: "Push Up",
    *       duration: 3,
    *       equipment: [
    *           "steady floor"
    *       ],
    *       burntQ: 1234
    *   }
    *
    * @apiError 404 Exercise Not Found
    * @apiError 400 Bad Request <br>Wrongly formated <code>id</code> was sent.
    * @apiError (Error 5xx) 500 Internal Server Error 
    *
    */

    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send({ "error" : "Internal Server Error", "message" : err.toString() });
            }

            var collection = db.collection('exercises');
            try {
                collection.findOne({ '_id': ObjectID(req.params.id) }, function(err, result) {
                    
                    if (err) {
                        res.status(500).send({ "error" : "Internal Server Error", "message" : err.toString() });
                    } else if (result === null) {
                        res.status(404).send({ "error": "Exercise Not Found" });
                    } else {
                        res.status(200); 
                        res.json(result);
                    }
                    db.close();
                });
            } catch (e) {
                res.status(400).send({ "error" : "Bad Request" });
                db.close();
            } 
        });
    })

    /**
    * @api {put} /exercises/id Update Exercise
    * @apiName UpdateExercise
    * @apiGroup Exercises
    * @apiVersion 0.0.1
    *
    * @apiDescription This request updates an existing exercise using the json body provided and the _id parameter specified in the request URL. For consistency the json may include keys like in the example below. 
    *
    * @apiParam {ObjectId} id Exercise unique ID.
    * @apiParamExample {json} Edit-All-Example:
    *   {
    *       name: "Air Bike",
    *       duration: 4,
    *       equipment: [
    *           "mat"
    *       ],
    *       burntQ: 1200
    *   }
    * @apiParamExample {json} Edit-Some-Example:
    *   {
    *       name: "Air Bike",
    *       duration: 4
    *   }
    *
    * @apiSuccess (Success 2xx) 201 Exercise Edited
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 201 Created 
    *     Location : /api/exercises/<ObjectId>
    *     {
    *       "message": "Exercise edited"
    *     }
    *     
    * @apiError (Error 4xx) 404 Exercise not Found
    * @apiError (Error 4xx) 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
    * @apiError (Error 5xx) 500 Internal Server Error 
    * 
    */
    .put(function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send({ "error" : "Internal Server Error" });
                return;
            } 
            var collection = db.collection('exercises');

            try {
                collection.update({ '_id': ObjectID(req.params.id)}, { $set : req.body }, function(err, result) {
                    res.status(201).send({ "message" : "Exercise edited" });
                    db.close();
                });
            } catch (e) {
                res.status(400).send({ "error" : "Bad Request" });
                db.close();
            } 
        });
    })

    /**
     * @api {delete} /exercises/id Delete Exercise
     * @apiName DeleteExercise
     * @apiGroup Exercises
     * @apiVersion 0.0.1
     *
     * @apiDescription This request deletes an existing exercise with the _id parameter specified in the request URL.  
     * @apiParam {ObjectId} id Exercises unique ID.
     *
     * @apiSuccess (Success 2xx) 204 No Content
     *
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 204 No Content
     *      { 
     *          "message" : "Exercise deleted" 
     *      }
     *
     * @apiError 404 Exercise Not Found
     * @apiError 400 Bad Request <br>A wrong formated <code>id</code> was sent
     *
     * @apiError (Error 5xx) 500 Internal Server Error 
     *
     */
     .delete(function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send({ "error" : "Internal Server Error"});
                return;
            }
            var collection = db.collection('exercises');

            try {
                collection.remove({ "_id" : ObjectID(req.params.id) }, function(err, result) {
                    res.status(204).send( { "message" : "Exercise deleted" });
                    db.close();
                });
            } catch(e) {
                res.status(400).send({ "error" : "Bad Request" });
                db.close();
            }
        });
    });

module.exports = router;
