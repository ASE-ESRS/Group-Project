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
//  - `longitude` the current longitude of the user (expected in ISO 6709 format.)

// To print a log in the console use -> console.log('value1 =', event.key1);

exports.handler = (event, context, callback) => {
    // Carry out input validation on the request's parameters.


    // Extract the userId parameter.
    let userIdInput = event.queryStringParameters.userId;
    if (!(hexReg(userIdInput))){
        abortLocationUpdate("Invalid user ID", callback);
    }

    // Extract the `latitude` parameter and validate.
    let latitudeInput = event.queryStringParameters.latitude;
    if(!(longLatReg(latitudeInput))) {
        abortLocationUpdate("Invalid latitude parameter", callback);
    }

    // Extract the `longitude` parameter and validate.
    let longitudeInput = event.queryStringParameters.longitude;
    if(!(longLatReg(longitudeInput))) {
        abortLocationUpdate("Invalid longitude parameter", callback);
    }

    // ----------------------------------------------------------------------
    // At this point, we assume that the input is valid and correctly formed.
    // ----------------------------------------------------------------------
    // Make a note of the current time.
    let currentDateTime = new Date().toISOString();

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
                "statusCode" : 200,
                "headers" : { "Content-Type" : "application/json" },
                "body" : JSON.stringify({
                    "status" : "success",
                    "message" : "Successfully updated location"
                })
            });
        }
    });
};

// This function simply reports an error back to the client.
function abortLocationUpdate(reason, callback) {
    callback(null, {
        "statusCode" : 200,
        "headers" : { "Content-Type" : "application/json" },
        "body" : JSON.stringify({
            "status" : "error",
            "message" : reason
        })
    });
}

// this is a function to check for a hexidecimal value and a length of 64 characters.
function hexReg(s) {
    var regExp = /[0-9A-Fa-f]{16}/g;
    return (regExp.test(s));
}

// this function checks the latitude and lonitude follow the correct format.
function longLatReg(l){
    // regex for latitude and longitude.
    var regExp = /(\-?\d+(\.\d+)?)/;
    return regExp.test(l);
}
