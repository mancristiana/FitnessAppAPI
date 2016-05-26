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