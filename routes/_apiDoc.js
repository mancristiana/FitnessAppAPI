// This document contains modified apiDoc blocks from older versions
/**
* @api {post} /exercises Create Exercise
* @apiName CreateExercise
* @apiGroup Exercises
* @apiVersion 0.0.1
*
* @apiDescription This request creates a new exercise using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below. 
*
* @apiParam (RequestedFields) {String} name Name of the Exercise.
* @apiParam (RequestedFields) {Number} duration  Amount of time measured in minutes that the Exercise takes.
* @apiParam (RequestedFields) {Array} equipment String Array of various equipment needed for the Exercise.
* @apiParam (RequestedFields) {Number} burntQ Number of calories burnt by performing the Exercise.
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
* @apiSuccess (Success 201) 201 Exercise Created
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 201 Created 
*     Location : /api/Exercises/<ObjectId>
*     {
*       'message': 'Exercise added'
*     }
*
* @apiError (Error 4xx) 404 Exercise not Found
* @apiError (Error 4xx) 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       'error': 'ExerciseNotFound'
*     }
*
* @apiError (Error 5xx) 500 Internal Server Error 
* @apiErrorExample {json} Error-Response:
*   HTTP/1.1 500 Internal Server Error
*   {
*       'error': 'Internal Server Error'
*   }
*
*/

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