define({ "api": [
  {
    "type": "post",
    "url": "/exercises",
    "title": "Create Exercise",
    "name": "CreateExercise",
    "group": "Exercises",
    "version": "0.0.2",
    "description": "<p>This request creates a new exercise using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated _id is returned</p>",
    "parameter": {
      "fields": {
        "Requested Fields": [
          {
            "group": "Requested Fields",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Exercise.</p>"
          },
          {
            "group": "Requested Fields",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Amount of time measured in minutes that the Exercise takes.</p>"
          },
          {
            "group": "Requested Fields",
            "type": "Array",
            "optional": false,
            "field": "equipment",
            "description": "<p>String Array of various equipment needed for the Exercise.</p>"
          },
          {
            "group": "Requested Fields",
            "type": "Number",
            "optional": false,
            "field": "burntQ",
            "description": "<p>Number of calories burnt by performing the Exercise.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Post-Example:",
          "content": "{\n    name: \"Air Bike\",\n    duration: 5,\n    equipment: [\n        \"mat\"\n    ],\n    burntQ: 1200\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>Exercise Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/Exercises/<ObjectId>\n{\n  '_id' : '5746d36bfa2cdf7c300bf61c',\n  'message': 'Exercise added'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    'error': 'ExerciseNotFound'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    'error': 'Internal Server Error'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/exercises.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "post",
    "url": "/exercises",
    "title": "Create Exercise",
    "name": "CreateExercise",
    "group": "Exercises",
    "version": "0.0.1",
    "description": "<p>This request creates a new exercise using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below.</p>",
    "parameter": {
      "fields": {
        "RequestedFields": [
          {
            "group": "RequestedFields",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Exercise.</p>"
          },
          {
            "group": "RequestedFields",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Amount of time measured in minutes that the Exercise takes.</p>"
          },
          {
            "group": "RequestedFields",
            "type": "Array",
            "optional": false,
            "field": "equipment",
            "description": "<p>String Array of various equipment needed for the Exercise.</p>"
          },
          {
            "group": "RequestedFields",
            "type": "Number",
            "optional": false,
            "field": "burntQ",
            "description": "<p>Number of calories burnt by performing the Exercise.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Post-Example:",
          "content": "{\n    name: \"Air Bike\",\n    duration: 5,\n    equipment: [\n        \"mat\"\n    ],\n    burntQ: 1200\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "optional": false,
            "field": "201",
            "description": "<p>Exercise Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/Exercises/<ObjectId>\n{\n  'message': 'Exercise added'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Exercise not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  'error': 'ExerciseNotFound'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    'error': 'Internal Server Error'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/_apiDoc.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "delete",
    "url": "/exercises/id",
    "title": "Delete Exercise",
    "name": "DeleteExercise",
    "group": "Exercises",
    "version": "0.0.1",
    "description": "<p>This request deletes an existing exercise with the _id parameter specified in the request URL.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Exercises unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "204",
            "description": "<p>No Content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content\n{ \n    \"message\" : \"Exercise deleted\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Exercise Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>A wrong formated <code>id</code> was sent</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/exercises.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "get",
    "url": "/exercises",
    "title": "Request all Exercises",
    "name": "GetAllExercises",
    "group": "Exercises",
    "version": "0.0.1",
    "description": "<p>This request returns all exercises which are by default available for the user. This does not include user custom made exercises.</p>",
    "success": {
      "fields": {
        "Exercise Fields": [
          {
            "group": "Exercise Fields",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Mongo generated id of the Exercise.</p>"
          },
          {
            "group": "Exercise Fields",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Exercise.</p>"
          },
          {
            "group": "Exercise Fields",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Amount of time measured in minutes that the Exercise takes.</p>"
          },
          {
            "group": "Exercise Fields",
            "type": "Array",
            "optional": false,
            "field": "equipment",
            "description": "<p>String Array of various equipment needed for the Exercise.</p>"
          },
          {
            "group": "Exercise Fields",
            "type": "Number",
            "optional": false,
            "field": "burntQ",
            "description": "<p>Number of calories burnt by performing the Exercise.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        _id: \"573ec098e85f5601f611322b\",\n        name: \"Push Up\",\n        duration: 3,\n        equipment: [\n            \"steady floor\"\n        ],\n        burntQ: 1234\n    },\n    {    \n        _id: \"573ec075e85f5601f611322a\",\n        name: \"Rope Jump\",\n        duration: 5,\n        equipment: [\n            \"steady floor\",\n            \"jumping rope\",\n            \"jumping sneakers\"\n        ],\n        burntQ: 2300\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/exercises.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "get",
    "url": "/exercises/id",
    "title": "Get Exercise",
    "name": "GetExercise",
    "group": "Exercises",
    "version": "0.0.1",
    "description": "<p>This request returns the exercise specified by the unique ID in the request URL</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>The unique ID of the Exercise.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    _id: \"573ec098e85f5601f611322b\",\n    name: \"Push Up\",\n    duration: 3,\n    equipment: [\n        \"steady floor\"\n    ],\n    burntQ: 1234\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Exercise Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>id</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/exercises.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "put",
    "url": "/exercises/id",
    "title": "Update Exercise",
    "name": "UpdateExercise",
    "group": "Exercises",
    "version": "0.0.1",
    "description": "<p>This request updates an existing exercise using the json body provided and the _id parameter specified in the request URL. For consistency the json may include keys like in the example below.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Exercise unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Edit-All-Example:",
          "content": "{\n    name: \"Air Bike\",\n    duration: 4,\n    equipment: [\n        \"mat\"\n    ],\n    burntQ: 1200\n}",
          "type": "json"
        },
        {
          "title": "Edit-Some-Example:",
          "content": "{\n    name: \"Air Bike\",\n    duration: 4\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>Exercise Edited</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/exercises/<ObjectId>\n{\n  \"message\": \"Exercise edited\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Exercise not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/exercises.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create User",
    "name": "CreateUser",
    "group": "Users",
    "version": "0.0.3",
    "description": "<p>This request creates a new user by using the json body provided. The method creates a new user only if the email provided is not already existing in the database. The password provided for log in is hashed in the database. An _id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated _id is returned</p>",
    "parameter": {
      "fields": {
        "User fields": [
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Mongo generated id of the User.</p>"
          },
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of User. Also serves as username for User account.</p>"
          },
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password for User account.</p>"
          },
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "User fields",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>Level of training progress for the User.</p>"
          },
          {
            "group": "User fields",
            "type": "Number",
            "optional": false,
            "field": "metric",
            "description": "<p>Metric refers to measurement in KG or LB. This field can be either 0 for KG or 1 for LB. Default value is 0.</p>"
          },
          {
            "group": "User fields",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Weight in specified metric of User.</p>"
          },
          {
            "group": "User fields",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>Height in specified metric of User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Post-Example:",
          "content": " {\n    \"email\" : \"mail2@example.com\",\n    \"password\" : \"PAss11#!\", \n    \"name\" : \"Daenerys\",\n    \"lastname\" : \"Targaryen\",\n    \"level\" : \"9000\",\n    \"metric\" : \"0\",\n    \"weight\" : \"45.3\",\n    \"height\" : \"165.5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>User Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/users/<ObjectId>\n{\n  \"_id\" : \"5746d36bfa2cdf7c300bf61c\",\n  \"email\": \"mail2@example.com\",\n  \"message\": \"User added\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "422",
            "description": "<p>User Already Exists</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create User",
    "name": "CreateUser",
    "group": "Users",
    "version": "0.0.2",
    "description": "<p>This request creates a new user by using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated _id is returned</p>",
    "parameter": {
      "fields": {
        "User fields": [
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Mongo generated id of the User.</p>"
          },
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of User. Also serves as username for User account.</p>"
          },
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password for User account.</p>"
          },
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "User fields",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "User fields",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>Level of training progress for the User.</p>"
          },
          {
            "group": "User fields",
            "type": "Number",
            "optional": false,
            "field": "metric",
            "description": "<p>Metric refers to measurement in KG or LB. This field can be either 0 for KG or 1 for LB. Default value is 0.</p>"
          },
          {
            "group": "User fields",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Weight in specified metric of User.</p>"
          },
          {
            "group": "User fields",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>Height in specified metric of User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Post-Example:",
          "content": " {\n    \"email\" : \"mail2@example.com\",\n    \"password\" : \"PAss11#!\", \n    \"name\" : \"Daenerys\",\n    \"lastname\" : \"Targaryen\",\n    \"level\" : \"9000\",\n    \"metric\" : \"0\",\n    \"weight\" : \"45.3\",\n    \"height\" : \"165.5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>User Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/users/<ObjectId>\n{\n  \"_id\" : \"5746d36bfa2cdf7c300bf61c\",\n  \"message\": \"User added\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/_apiDoc.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/email",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "Users",
    "version": "0.0.3",
    "description": "<p>This request deletes an existing user with the unique email parameter specified in the request URL.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the User which serves as username for logging in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "204",
            "description": "<p>No Content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content \n{\n    \"message\" : \"User deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>A wrong formated <code>id</code> was sent</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/id",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "Users",
    "version": "0.0.2",
    "description": "<p>This request deletes an existing user with the _id parameter specified in the request URL.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "204",
            "description": "<p>No Content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content \n{\n    \"message\" : \"User deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>A wrong formated <code>id</code> was sent</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/_apiDoc.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/email",
    "title": "Get User",
    "name": "GetUser",
    "group": "Users",
    "version": "0.0.3",
    "description": "<p>This request returns the user specified by the unique email in the request URL</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the User which serves as username for logging in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n        \"_id\" : \"54c64290a85e56f1f6b1c229\",\n        \"email\" : \"mail2@example.com\",\n        \"name\" : \"Sansa\",\n        \"lastname\" : \"Stark\",\n        \"level\" : \"4\",\n        \"metric\" : \"0\",\n        \"weight\" : \"123.3\",\n        \"height\" : \"172.5\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>A wrong formated <code>id</code> was sent</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/id",
    "title": "Get User",
    "name": "GetUser",
    "group": "Users",
    "version": "0.0.2",
    "description": "<p>This request returns the user specified by the unique ID in the request URL</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>The unique ID of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n        \"_id\" : \"54c64290a85e56f1f6b1c229\",\n        \"email\" : \"mail2@example.com\",\n        \"name\" : \"Sansa\",\n        \"lastname\" : \"Stark\",\n        \"level\" : \"4\",\n        \"metric\" : \"0\",\n        \"weight\" : \"123.3\",\n        \"height\" : \"172.5\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>A wrong formated <code>id</code> was sent</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/_apiDoc.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/email",
    "title": "Update User",
    "name": "UpdateUser",
    "group": "Users",
    "version": "0.0.3",
    "description": "<p>This request updates an existing user using the json body provided and the email parameter specified in the request URL. For consistency the json may include keys like in the example below.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the User which serves as username for logging in.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Edit-Fitness-Example:",
          "content": "{\n    \"level\" : \"4\",\n    \"metric\" : \"0\",\n    \"weight\" : \"123.3\",\n    \"height\" : \"172.5\"\n}",
          "type": "json"
        },
        {
          "title": "Edit-Account-Example:",
          "content": "{\n    \"password\" : \"NewPa55\", \n    \"name\" : \"Sansa\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>User Edited</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \n{\n    \"message\" : \"User edited\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/id",
    "title": "Update User",
    "name": "UpdateUser",
    "group": "Users",
    "version": "0.0.2",
    "description": "<p>This request updates an existing user using the json body provided and the _id parameter specified in the request URL. For consistency the json may include keys like in the example below.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Edit-Fitness-Example:",
          "content": "{\n    \"level\" : \"4\",\n    \"metric\" : \"0\",\n    \"weight\" : \"123.3\",\n    \"height\" : \"172.5\"\n}",
          "type": "json"
        },
        {
          "title": "Edit-Account-Example:",
          "content": "{\n    \"password\" : \"c0e81794384491161f1777c232bc6bd9ec38f616560b120fda8e90f383853542\", \n    \"name\" : \"Sansa\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>User Edited</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/users/<ObjectId>\n{\n    \"message\" : \"User edited\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/_apiDoc.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/verify",
    "title": "Verify User Credential",
    "name": "Verify",
    "group": "Users",
    "version": "0.0.2",
    "description": "<p>This request checks if the username and password specified within the Json body match the db credentials of the User.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"email\": \"mail2@example.com\",\n    \"password\": \"pass\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>User Password is correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 No Content \n{\n    \"message\" : \"User password is correct\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>User Password is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>A wrong formated <code>JSON</code> was sent</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  }
] });
