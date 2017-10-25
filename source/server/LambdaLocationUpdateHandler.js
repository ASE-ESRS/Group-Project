let k_TABLE_NAME = "locations";

var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    // Carry out input validation on the request's parameters.
    // Extract the userId parameter.
    let userIdInput = event.userId;
    if (userIdInput == null || userIdInput == "") {
        abortLocationUpdate("NO USERID SUPPLIED", callback);
    }

    // Extract the `latitude` parameter.
    let latitudeInput = event.latitude;
    if (latitudeInput == null || latitudeInput == "") {
        abortLocationUpdate("NO LATITUDE SUPPLIED", callback);
    }

    // Extract the `longitude` parameter.
    let longitudeInput = event.longitude;
    if (longitudeInput == null || longitudeInput == "") {
        abortLocationUpdate("NO LONGITUDE SUPPLIED", callback);
    }

    // At this point, we assume that the input is valid and correctly formed.

    // Make a note of the current time.
    let currentDateTime = new Date().toString();

    // Create the new location entry item.
    var locationItem = {
        userId : userIdInput,
        date : currentDateTime,
        latitude : latitudeInput,
        longitude : longitudeInput
    };

    // Insert a new record into the `locations` DynamoDB table.
    dynamodb.putItem({
        "TableName" : k_TABLE_NAME,
        "Item" : locationItem
    }, function(error, data) {
        if (error) {
            abortLocationUpdate("ERROR: INSERTING ITEM INTO DYNAMODB FAILED: " + error, callback);
        } else {
            callback(null, {
                "statusCode" : 200,
                "headers" : { "Content-Type" : "text/html" },
                "body" : "SUCCESSFULLY ENTERED RECORD: userId: " + locationItem
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
