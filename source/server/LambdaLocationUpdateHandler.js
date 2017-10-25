var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    console.log(event.latitude);
    // Carry out input validation on the request's parameters.
    if (typeof event["queryStringParameters"] == 'undefined' || event["queryStringParameters"] == null) {
        abortLocationUpdate("NO INPUT SUPPLIED", callback);
        return;
    }

    // Extract the userId parameter.
    let userId = event["queryStringParameters"]['userId'];
    if (userId == null || userId == "") {
        abortLocationUpdate("NO USERID SUPPLIED", callback);
    }

    // Extract the `latitude` parameter.
    let latitude = event["queryStringParameters"]['latitude'];
    if (latitude == null || latitude == "") {
        abortLocationUpdate("NO LATITUDE SUPPLIED", callback);
    }

    // Extract the `longitude` parameter.
    let longitude = event["queryStringParameters"]['longitude'];
    if (longitude == null || longitude == "") {
        abortLocationUpdate("NO LONGITUDE SUPPLIED", callback);
    }

    // At this point, we assume that the input is valid and correctly formed.

    // Make a note of the current time.
    let currentDateTime = new Date().toString();

    // Insert a new record into the `locations` DynamoDB table.
    dynamodb.putItem({
        "TableName" : "locations",
        "Item" : {
            "userId"    : { "S" : userId },
            "date"      : { "S" : currentDateTime },
            "latitude"  : { "S" : latitude },
            "longitude" : { "S" : longitude }
        }
    }, function(error, data) {
        if (error) {
            abortLocationUpdate("ERROR: INSERTING ITEM INTO DYNAMODB FAILED: " + error, callback);
        } else {
            callback(null, {
                "statusCode" : 200,
                "headers" : { "Content-Type" : "text/html" },
                "body" : "SUCCESSFULLY ENTERED RECORD: userId: " + userId + ", latitude: " + latitude + ", longitude: " + longitude
            });
        }
    });
};

function abortLocationUpdate(reason, callback) {
    callback(null, {
        "statusCode" : 200,
        "headers" : { "Content-Type" : "text/html" },
        "body" : reason
    });
}
