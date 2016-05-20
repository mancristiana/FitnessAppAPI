var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://man.cristiana1@gmail.com:Pw1234@ds025792.mlab.com:25792/fitnessdb';

/**
 * @api {get} /api/exercises/ Get all Exercises
 * @apiName GetAllExercises
 * @apiGroup Exercises
 * @apiVersion 0.0.2
 *
 * @apiSuccess {String} make Make of the Exercise.
 * @apiSuccess {String} name  name of the Exercise.
 * @apiSuccess {String} color Color of the Exercise.
 * @apiSuccess {Number} price Number of the Exercise.
 * @apiSuccess {Array} size Sizes of the Exercise.
 * @apiSuccess {Object} details Details of the Exercise.
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
 * @apiSampleRequest http://localhost:3000/api/exercises/
 *
 * @apiError (Error 5xx) 500 Internal Server Error 
 *
 */

router.route('/exercises/')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) {
                res.status(500);
                res.json({
                    'error': 'Internal Server Error'
                });
            } else {
                var collection = db.collection('exercises');
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
     * @api {post} /api/Exercises/ Create Exercise
     * @apiName createExercise
     * @apiGroup Exercises
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
     * @apiSuccess (Success 201) 201 Exercise Created
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 Created 
     *     Location : /api/Exercises/<ObjectId>
     *     {
     *       "message": "Exercise added"
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
                var collection = db.collection('exercises');

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
                        res.location('/api/exercises/' + result.insertedIds.toString());
                        res.json({
                            "message": "exercise added"
                        });
                    }
                    db.close();
                });

            }


        });
    });

/**
 * @api {get} /api/exercises/:id Get Exercise
 * @apiName GetExercise
 * @apiGroup Exercises
 * @apiVersion 0.0.2
 *
 * @apiParam {ObjectId} id Exercises unique ID.
 *
 * @apiSuccess {String} make Make of the Exercise.
 * @apiSuccess {String} name  name of the Exercise.
 * @apiSuccess {String} color Color of the Exercise.
 * @apiSuccess {Number} price Number of the Exercise.
 * @apiSuccess {Array} size Sizes of the Exercise.
 * @apiSuccess {Object} details Details of the Exercise.
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
 * @apiSampleRequest /api/exercises/:id
 *
 * @apiError 404 Exercise Not Found
 * @apiError 400 Bad Request <br>Wrongly formated <code>id</code> was sent.
 *
 * @apiError (Error 5xx) 500 Internal Server Error 
 */

router.route('/exercises/:id')
    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send({
                    "message": "Internal Server Error"
                });
            };

            var collection = db.collection('exercises');
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
 * @api {put} /api/exercises/:id Update Exercise
 * @apiName ExerciseUser
 * @apiGroup Exercises
 * @apiVersion 0.0.2
 *
 * @apiParam {ObjectId} id Exercise unique ID.
 *
 * @apiSuccess (Success 201) 201 Exercise Created
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created 
 *     Location : /api/exercises/<ObjectId>
 *     {
 *       "message": "Exercise updated"
 *     }
 *     
 * @apiError 404 Exercise Not Found
 * @apiError 400 Bad Request <br>Wrongly formated <code>json</code> or <code>id</code> was sent.
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 * 
 */
.put(function(req, res) {
        MongoClient.connect(url, function(err, db) {

            var collection = db.collection('exercises');

            collection.update({
                '_id': ObjectID(req.params.id)
            }, {
                $set: req.body
            }, function(err, result) {
                // response to the browser
                res.status(201);
                res.location(/api/exercises / +ObjectID(req.params.id));
                res.json({
                    "message": "exercise edited"
                });
                db.close();
            });
        });
    })
    /**
     * @api {delete} /api/exercises/:id Delete Exercise
     * @apiName DeleteExercise
     * @apiGroup Exercises
     * @apiVersion 0.0.2
     *
     * @apiParam {ObjectId} id Exercises unique ID.
     *
     * @apiSuccess (Success 204) 204 No Content
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 204 No Content
     *
     * @apiError 404 Exercise Not Found
     * @apiError 400 Bad Request <br>A wrong formated <code>id</code> was sent
     *
     * @apiError (Error 5xx) 500 Internal Server Error 
     *
     */
    .delete(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            var collection = db.collection('exercises');
            collection.remove({
                '_id': ObjectID(req.params.id)
            }, function(err, result) {
                res.status(202);
                res.json({
                    'message': 'exercise deleted'
                });
                db.close();
            });
        });
    });

module.exports = router;
