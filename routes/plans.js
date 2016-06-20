var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var passwordHash = require('password-hash');
var url = 'mongodb://man.cristiana1%40gmail.com:Pw1234@ds025792.mlab.com:25792/fitnessdb';

router.route('/users/:email/plans')
    /**
    * @api {get} /users/email/plans Request all Plans
    * @apiName GetAllPlans
    * @apiGroup Plans
    * @apiVersion 0.0.3
    *
    * @apiDescription This request returns all plans created by the user with specified email.  
    *
    * @apiSuccess (Plan Fields) {String} _id Unique Mongo generated id of the Plan.
    * @apiSuccess (Plan Fields) {String} email Unique Email of user that created the Plan.
    * @apiSuccess (Plan Fields) {String} name Name of the Plan.
    * @apiSuccess (Plan Fields) {Number} total_duration Total amount of time measured in minutes that the Plan takes.
    * @apiSuccess (Plan Fields) {Number} total_burntQ Total Number of calories burnt by performing the Exercise.
    * @apiSuccess (Plan Fields) {Array} schedule Array of <strong>Exercise</strong> objects (see documentation for Exercises) that contain an extra field named "repeat" specifying the number of times the exercise must be performed
    *
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *       {
    *           _id: "ab3ec098234f5601f611322b",
    *           email : "mail2@example.com",
    *           name: "Exercise Plan 1",
    *           total_duration: 21,
    *           total_burntQ: 9368,
    *           schedule : [
    *               {
    *                   _id: "573ec098e85f5601f611322b",
    *                   name: "Push Up",
    *                   duration: 3,
    *                   equipment: [
    *                       "steady floor"
    *                   ],
    *                   burntQ: 1234,
    *                   repeat: 2
    *               },
    *               {
    *                   _id: "573ec075e85f5601f611322a",
    *                   name: "Rope Jump",
    *                   duration: 5,
    *                   equipment: [
    *                       "steady floor",
    *                       "jumping rope",
    *                       "jumping sneakers"
    *                   ],
    *                   burntQ: 2300,
    *                   repeat: 3
    *               }
    *           ]
    *       }
    *   ]
    *
    * @apiError (Error 5xx) 500 Internal Server Error 
    *
    */

    .get(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) { 
                res.status(500);
                res.json({"error" : "Internal Server Error"});
                return;
            } 

            var planCollection = db.collection('plans');
            var exerciseCollection = db.collection('exercises');
            
            planCollection.find({ 'email' : req.params.email }).toArray(function(err, result) {

                if (err) {
                    res.status(500);
                    res.json({"error" : "Internal Server Error"});
                } else {
                  //  res.status(200);

                   // res.json(result);

                    var planArray = [];

                    result.forEach(function(productItem, productIndex, productArray) { // FOR EACH PRODUCT
                        var plan = {};
                        plan._id = productItem._id;
                        plan.email = productItem.email;
                        plan.total_duration = 0;
                        plan.total_burntQ = 0;
                        plan.schedule = [];

                        productItem.schedule.forEach(function(scheduleItem, scheduleIndex, scheduleArray) {
                            exerciseCollection.findOne({ '_id': ObjectID(scheduleItem._id) }, function(err, result) {
                    
                                if (err) {
                                    console.log(err.toString());
                                    //res.status(500).send({ "error" : "Internal Server Error", "message" : err.toString() });
                                    res.status(500);
                                    res.json({"error" : "Internal Server Error"});
                                } else if (result === null) {
                                    console.log("Error: Exercise not found id = " + scheduleItem._id);
                                } else {
                                    var exercise = result;
                                    exercise.repeat = scheduleItem.repeat;
                                    plan.schedule.push(exercise);
                                    plan.total_duration += exercise.repeat * exercise.duration;
                                    plan.total_burntQ += exercise.repeat * exercise.total_burntQ;
                                }
                                if (scheduleIndex === scheduleArray.length - 1) {
                                    planArray.push(plan);

                                    if (productIndex === productArray.length - 1) {
                                        res.status(200);
                                        res.json(planArray); 
                                        db.close();
                                    }
                                }
                            });
                        });
                    });
                }

               
            });
            
        });
    })
   
   /**
    * @api {post} /users/email/plans Create Plan
    * @apiName CreatePlan
    * @apiGroup Plans
    * @apiVersion 0.0.3
    *
    * @apiDescription This request creates a new plan for the user with specified email. 
    *
    * @apiParam (Requested Fields) {String} name Name of the Plan.
    * @apiParam (Requested Fields) {Array} schedule Array of <strong>Exercise</strong> objects that contain the exercise id and an extra field named "repeat" specifying the number of times the exercise must be performed
    *
    * @apiParamExample {json} Request-Body:
    * {
    *       "name" : "Exercise Plan 1",
    *       "schedule" : [
    *           {
    *               "_id" : "574c0f79ea374e0300ba0cb1",
    *               "repeat" : 2
    *           },
    *           {
    *               "_id" : "574ec93479ac100300495e2f",
    *               "repeat" : 3
    *           }
    *       ]
    * }
    *
    * @apiError (Error 5xx) 500 Internal Server Error 
    *
    */
    .post(function(req, res) {

        MongoClient.connect(url, function(err, db) {

            if (err) {
                res.status(500);
                res.json({"error": "Internal Server Error"});
            } else {
                var planCollection = db.collection('plans');

                var planToInsert = req.body;
                planToInsert.email = req.params.email;

                planCollection.insert(planToInsert, function(err, result) {
                    if (err) {
                        res.status(500).send({
                            "message": "Internal Server Error"
                        });
                    } else {
                        res.status(201);
                        res.json({
                            "_id": result.insertedIds.toString(),
                            "message" : "New Plan Was Added"
                        });
                    }
                    db.close();
                });
            }
        });
    });

router.route('/users/:email/plans/:id')
    /**
     * @api {delete} /users/email/plans/id Delete Plan
     * @apiName DeletePlan
     * @apiGroup Plans
     * @apiVersion 0.0.3
     *
     * @apiDescription This request deletes from user with specified email an existing plan with the _id parameter from the request URL.  
     * @apiParam {ObjectId} id Plans unique ID.
     *
     * @apiSuccess (Success 2xx) 204 No Content
     *
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 204 No Content
     *      { 
     *          "message" : "Plan deleted" 
     *      }
     *
     * @apiError 404 Plan Not Found
     *
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
            var collection = db.collection('plans');
            collection.remove({ 
                "_id" : ObjectID(req.params.id),
                "email" : req.params.email
            }, function(err, result) {
                if (err) {
                    res.status(500);
                    res.json({ "error" : "Internal Server Error"});
                } else {
                    res.status(204);
                    res.json({ "message" : "Plan deleted" });  
                }
                db.close();
            });
        });
    });

module.exports = router;
