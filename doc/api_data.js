define({ "api": [
  {
    "type": "POST",
    "url": "/api/feed",
    "title": "add feed content",
    "name": "Admin-Add-Settings-POST",
    "group": "Feed",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "error",
            "description": "<p>for checking the error.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>for information.</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>for payload.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"error\": false,\n  \"message\": \"Feed content saved successfully !!\"\n  \"data\": object\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Sample-Request:",
        "content": "{\n      \"title\": \"title\",\n      \"description\": \"description\",\n      \"category\": \"category\",\n      \"monetizationModeType\": \"free\"/\"paid\"/\"premium\",\n      \"monetization\": [\n         {\n              \"allowAudienceSupport\": true/false,\n              \"paid\": {\n                   \"price\": \"price\",\n                  \"allowReshare\": true/false,\n                  \"premium\": [\n                      \"premium1\",\n                      \"premium2\",\n                      \"premium3\"\n                  ]\n              }\n          }\n      ],\n      \"tag\": [\"tag-1\",\"tag-2\"],\n      \"thumbnailImage\": \"thumbnailImage\",\n      \"image\": [\"image-1\",\"image-2\"],\n      \"video\": \"video\"\n}",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 unauthorized request\n{\n   \"status\": false\n   \"error\": true,\n   \"message\": \"Something went wrong\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/feed.route.ts",
    "groupTitle": "Feed"
  },
  {
    "type": "GET",
    "url": "/api/feed",
    "title": "get feed",
    "name": "Feed-Get-feed-GET",
    "group": "Feed",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "error",
            "description": "<p>for checking the error.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>for information.</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>for payload.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"error\": false,\n  \"message\": \"Feed contents fetched successfully !!\",\n  \"data\": object\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 unauthorized request\n{\n   \"status\": false\n   \"error\": true,\n   \"message\": \"Something went wrong\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/feed.route.ts",
    "groupTitle": "Feed"
  }
] });
