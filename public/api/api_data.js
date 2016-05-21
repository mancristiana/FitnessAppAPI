define({ "api": [
  {
    "type": "post",
    "url": "/exercises",
    "title": "Create Exercise",
    "name": "CreateExercise",
    "group": "Exercises",
    "version": "0.0.1",
    "description": "<p>This request creates a new exercise using the json body provided. An _id field is generated automatically. For consistency the json should include the following parameters.</p>",
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
    "filename": "routes/exercises.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "delete",
    "url": "/exercises:id",
    "title": "Delete Exercise",
    "name": "DeleteExercise",
    "group": "Exercises",
    "version": "0.0.1",
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
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
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
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Amount of time measured in minutes that the Exercise takes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "equipment",
            "description": "<p>String Array of various equipment needed for the Exercise.</p>"
          },
          {
            "group": "Success 200",
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
      },
      "examples": [
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
    "type": "get",
    "url": "/exercises:id",
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
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Amount of time measured in minutes that the Exercise takes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "equipment",
            "description": "<p>String Array of various equipment needed for the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "burntQ",
            "description": "<p>Number of calories burnt by performing the Exercise.</p>"
          }
        ],
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ],
        "Success 3xx": [
          {
            "group": "Success 3xx",
            "optional": false,
            "field": "304",
            "description": "<p>Not Modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    _id: \"573ec098e85f5601f611322b\",\n    name: \"Push Up\",\n    duration: 3,\n    equipment: [\n        \"steady floor\"\n    ],\n    burntQ: 1234\n}",
          "type": "json"
        },
        {
          "title": "Success-Response (304):",
          "content": "HTTP/1.1 304 Not Modified",
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
      },
      "examples": [
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
    "type": "put",
    "url": "/exercises/:id",
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
        "Success 201": [
          {
            "group": "Success 201",
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
    "filename": "routes/exercises.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "Users",
    "version": "0.0.1",
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
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
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
    "url": "/api/users/",
    "title": "Get all Users",
    "name": "GetAllUser",
    "group": "Users",
    "version": "0.0.1",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User.</p>"
          }
        ],
        "Success 304": [
          {
            "group": "Success 304",
            "optional": false,
            "field": "304",
            "description": "<p>Not Modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\" : \"ObjectId(12345)\",\n  \"name\" : \"xxx\", \n  \"lastname\":\"xxx\",\n  \"address\":\"xxx\",\n  \"phone\":\"xxxxxxxxx\",\n  \"email\":\"xxx\"\n}",
          "type": "json"
        },
        {
          "title": "Success-Response (304):",
          "content": "HTTP/1.1 304 Not Modified",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users/"
      }
    ],
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
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Get User",
    "name": "GetUser",
    "group": "Users",
    "version": "0.0.1",
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
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User.</p>"
          }
        ],
        "Success 304": [
          {
            "group": "Success 304",
            "optional": false,
            "field": "304",
            "description": "<p>Not Modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\" : \"ObjectId(12345)\",\n  \"name\" : \"xxx\", \n  \"lastname\":\"xxx\",\n  \"address\":\"xxx\",\n  \"phone\":\"xxxxxxxxx\",\n  \"email\":\"xxx\"\n}",
          "type": "json"
        },
        {
          "title": "Success-Response (304):",
          "content": "HTTP/1.1 304 Not Modified",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users/:id"
      }
    ],
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
    "type": "put",
    "url": "/api/users/:id",
    "title": "Update User",
    "name": "UpdateUser",
    "group": "Users",
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
        "Success 201": [
          {
            "group": "Success 201",
            "optional": false,
            "field": "201",
            "description": "<p>User Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/users/<ObjectId>\n{\n  \"message\": \"user updated\"\n}",
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
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/api/users/",
    "title": "Create User",
    "name": "createUser",
    "group": "Users",
    "version": "0.0.1",
    "parameter": {
      "examples": [
        {
          "title": "Post-Example:",
          "content": "{\n     \"name\" : \"xxx\",\n     \"lastName\" : \"xxx\",\n     \"address\" : \"xxx\",\n     \"phone\" : \"4512\",\n     \"email\" : \"xxx\"\n}",
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
            "description": "<p>User Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/users/<ObjectId>\n{\n  \"message\": \"user added\"\n}",
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
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  }
] });
