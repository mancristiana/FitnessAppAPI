define({ "api": [
  {
    "type": "delete",
    "url": "/api/exercises/:id",
    "title": "Delete Exercise",
    "name": "DeleteExercise",
    "group": "Exercises",
    "version": "0.0.2",
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
    "type": "put",
    "url": "/api/exercises/:id",
    "title": "Update Exercise",
    "name": "ExerciseUser",
    "group": "Exercises",
    "version": "0.0.2",
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
      }
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
          "content": "HTTP/1.1 201 Created \nLocation : /api/exercises/<ObjectId>\n{\n  \"message\": \"Exercise updated\"\n}",
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
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> or <code>id</code> was sent.</p>"
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
    "url": "/api/exercises/",
    "title": "Get all Exercises",
    "name": "GetAllExercises",
    "group": "Exercises",
    "version": "0.0.2",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "make",
            "description": "<p>Make of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Color of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Number of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "size",
            "description": "<p>Sizes of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "details",
            "description": "<p>Details of the Exercise.</p>"
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
          "content": " HTTP/1.1 200 OK\n{\n   \"make\" : \"Burton Menswear London\",\n   \"name\" : \"Print T-shirt\",\n   \"color\" : \"white\",\n   \"price\" : 16,\n   \"size\" : [\"small\", \"medium\", \"large\", \"x-large\"],\n   \"details\" : {\n           \"length\" : \"standard\",\n           \"fit\" : \"normal\",\n           \"fabric\" : \"jersey\",\n           \"Neckline\" : \"Crew neck\",\n           \"Total length\" : \"28.0\\\"  (Size M)\"\n   }\n }",
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
        "url": "http://localhost:3000/api/exercises/"
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
    "filename": "routes/exercises.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "get",
    "url": "/api/exercises/:id",
    "title": "Get Exercise",
    "name": "GetExercise",
    "group": "Exercises",
    "version": "0.0.2",
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
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "make",
            "description": "<p>Make of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Color of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Number of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "size",
            "description": "<p>Sizes of the Exercise.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "details",
            "description": "<p>Details of the Exercise.</p>"
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
          "content": " HTTP/1.1 200 OK\n{\n   \"make\" : \"Burton Menswear London\",\n   \"name\" : \"Print T-shirt\",\n   \"color\" : \"white\",\n   \"price\" : 16,\n   \"size\" : [\"small\", \"medium\", \"large\", \"x-large\"],\n   \"details\" : {\n           \"length\" : \"standard\",\n           \"fit\" : \"normal\",\n           \"fabric\" : \"jersey\",\n           \"Neckline\" : \"Crew neck\",\n           \"Total length\" : \"28.0\\\"  (Size M)\"\n   }\n }",
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
        "url": "/api/exercises/:id"
      }
    ],
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
    "type": "post",
    "url": "/api/Exercises/",
    "title": "Create Exercise",
    "name": "createExercise",
    "group": "Exercises",
    "version": "0.0.2",
    "parameter": {
      "examples": [
        {
          "title": "Post-Example:",
          "content": "{\n   \"make\" : \"Burton Menswear London\",\n   \"name\" : \"Print T-shirt\",\n   \"color\" : \"white\",\n   \"price\" : 16,\n   \"size\" : [\"small\", \"medium\", \"large\", \"x-large\"],\n   \"details\" : {\n           \"length\" : \"standard\",\n           \"fit\" : \"normal\",\n           \"fabric\" : \"jersey\",\n           \"Neckline\" : \"Crew neck\",\n           \"Total length\" : \"28.0\\\"  (Size M)\"\n   }\n }",
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
          "content": "HTTP/1.1 201 Created \nLocation : /api/Exercises/<ObjectId>\n{\n  \"message\": \"Exercise added\"\n}",
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
    "filename": "routes/exercises.js",
    "groupTitle": "Exercises"
  },
  {
    "type": "delete",
    "url": "/api/orders/:id",
    "title": "Delete Order",
    "name": "DeleteOrder",
    "group": "Orders",
    "version": "0.0.3",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Order unique ID.</p>"
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
            "description": "<p>Product Not Found</p>"
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
    "filename": "routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/api/orders/",
    "title": "Get all Orders",
    "name": "GetAllOrders",
    "group": "Orders",
    "version": "0.0.3",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "make",
            "description": "<p>Make of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Color of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Number of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "size",
            "description": "<p>Sizes of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "details",
            "description": "<p>Details of the Product.</p>"
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
          "content": " HTTP/1.1 200 OK\n{\n   \"make\" : \"Burton Menswear London\",\n   \"name\" : \"Print T-shirt\",\n   \"color\" : \"white\",\n   \"price\" : 16,\n   \"size\" : [\"small\", \"medium\", \"large\", \"x-large\"],\n   \"details\" : {\n           \"length\" : \"standard\",\n           \"fit\" : \"normal\",\n           \"fabric\" : \"jersey\",\n           \"Neckline\" : \"Crew neck\",\n           \"Total length\" : \"28.0\\\"  (Size M)\"\n   }\n }",
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
        "url": "http://localhost:3000/api/products/"
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
    "filename": "routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/api/orders/:id",
    "title": "Get Order",
    "name": "GetOrder",
    "group": "Orders",
    "version": "0.0.3",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Orders unique ID.</p>"
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
            "field": "make",
            "description": "<p>Make of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Color of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Number of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "size",
            "description": "<p>Sizes of the Product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "details",
            "description": "<p>Details of the Product.</p>"
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
          "content": " HTTP/1.1 200 OK\n{\n   \"make\" : \"Burton Menswear London\",\n   \"name\" : \"Print T-shirt\",\n   \"color\" : \"white\",\n   \"price\" : 16,\n   \"size\" : [\"small\", \"medium\", \"large\", \"x-large\"],\n   \"details\" : {\n           \"length\" : \"standard\",\n           \"fit\" : \"normal\",\n           \"fabric\" : \"jersey\",\n           \"Neckline\" : \"Crew neck\",\n           \"Total length\" : \"28.0\\\"  (Size M)\"\n   }\n }",
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
        "url": "/api/orders/:id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Product Not Found</p>"
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
    "filename": "routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "put",
    "url": "/api/orders/:id",
    "title": "Update Order",
    "name": "UpdateOrder",
    "group": "Orders",
    "version": "0.0.3",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Order unique ID.</p>"
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
            "description": "<p>Order Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/orders/<ObjectId>\n{\n  \"message\": \"Order updated\"\n}",
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
            "description": "<p>Order Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> or <code>id</code> was sent.</p>"
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
    "filename": "routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "post",
    "url": "/api/orders/",
    "title": "Create Order",
    "name": "createOrder",
    "group": "Orders",
    "version": "0.0.3",
    "parameter": {
      "examples": [
        {
          "title": "Post-Example:",
          "content": "{\n   \"user\" : <ObjectId>,\n   \"products\" : [<ObjectId>, <ObjectId>, <ObjectId>]\n }",
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
            "description": "<p>Order Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created \nLocation : /api/orders/<ObjectId>\n{\n  \"message\": \"product added\"\n}",
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
    "filename": "routes/orders.js",
    "groupTitle": "Orders"
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
