// The LambdaLocationUpdateHandler is responsible for responding to requests from clients to
// update their current location entry in the database.
//
// The DynamoDB locations table can be viewed here:
// https://eu-west-2.console.aws.amazon.com/dynamodb/home?region=eu-west-2#tables:selected=locations
//
// This code must be copied over to the AWS Lambda Management Console here:
// https://eu-west-2.console.aws.amazon.com/lambda/home?region=eu-west-2#/functions/HandleLocationUpdate

var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

// Name of the locations table in DynamoDB.
let k_TABLE_NAME = "locations";

// This function is called in response to a request from a client.
//
// The `event` parameter holds information about the request, including the parameters.
// The following parameters are expected in the request:
//  - `userId` a unique identifier (e.g. email address) for this device (used as DB primary key).
//  - `latitude` the current latitude of the user (expected in ISO 6709 format - https://en.wikipedia.org/wiki/ISO_6709).
//  - `longitude` the current longitude of the user (expected in ISO 6709 format.
exports.handler = (event, context, callback) => {
    // Carry out input validation on the request's parameters.
    // Extract the userId parameter.
    let userIdInput = event.userId;
    if (userIdInput == null || userIdInput == "") {
        abortLocationUpdate("Invalid/absent userId parameter", callback);
    }

    // Extract the `latitude` parameter.
    let latitudeInput = event.latitude;
    if (latitudeInput == null || latitudeInput == "") {
        abortLocationUpdate("Invalid/absent latitude parameter", callback);
    }

    // Extract the `longitude` parameter.
    let longitudeInput = event.longitude;
    if (longitudeInput == null || longitudeInput == "") {
        abortLocationUpdate("Invalid/absent longitude parameter", callback);
    }

    // TODO: Perform more extensive input validation (e.g. length of latitude, etc.)
    // At this point, we assume that the input is valid and correctly formed.

    // Make a note of the current time.
    let currentDateTime = new Date().toString();

    // Create the new location entry item.
    var locationItem = {
        userId      : userIdInput,
        date        : currentDateTime,
        latitude    : latitudeInput,
        longitude   : longitudeInput
    };

    // Insert a new record into the `locations` DynamoDB table.
    dynamodb.putItem({
        "TableName" : k_TABLE_NAME,
        "Item" : locationItem
    }, function(error, data) {
        if (error) {
            abortLocationUpdate("Failed inserting location update into DynamoDB: " + error, callback);
        } else {
            callback(null, {
                "status" : "success",
                "message" : "Successfully entered the following location update: " + JSON.stringify(locationItem)
            });
        }
    });
};

// This function simply reports an error back to the client.
function abortLocationUpdate(reason, callback) {
    callback(null, {
        "status" : "error",
        "message" : reason
    });
}
