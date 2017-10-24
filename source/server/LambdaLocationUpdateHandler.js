var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    // Extract the three parameters from the request.
    let userId = event["queryStringParameters"]['userId'];
    let latitude = event["queryStringParameters"]['latitude'];
    let longitude = event["queryStringParameters"]['longitude'];
    
    // Make a note of the current time.
    let currentDateTime = new Date().getTime().toString();
    
    // Insert a new record into the `locations` DynamoDB table.
    dynamodb.putItem({
        "TableName" : "locations",
        "Item" : {
            "userId"    : { "S" : userId },
            "date"      : { "S" : currentDateTime },
            "latitude"  : { "S" : latitude },
            "longitude" : { "S" : longitude }
        }
    }, function(err, data) {
        if (err) {
            context.done('error', 'inserting item into dynamodb failed: ' + err);
        } else {
            context.done("Weeeeee");
        }
    });
    
    callback(null, {
        "statusCode" : 200,
        "headers" : { "Content-Type" : "text/html" },
        "body" : "Following entry has been inserted to DynamoDB:\n\nUser ID: " + userId + ", lat: " + latitude + ", long: " + longitude
    });
};
