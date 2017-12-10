# Reflective Essay

##### Team Roles
How did we split into distinct teams (server-side, client-side), and how did these teams changed over time.

##### Communication
Slack acted as a convenient platform for communicating all project-related matters between group members.

This includes communication when certain members are working remotely for a period of time.

##### GitHub & Continuous Integration
// DANIEL

##### Issue Tracking
GitHub's `Issues` feature has been used as a 'todo' list to track remaining tasks. Issues had assignees and labels to help categorise and prioritise them.

### Technology Selection
// Why Travis CI
// Why Node.js, AWS, and mocha?

### DynamoDB
Discuss how the index was unable to help us as it required that we knew the exact latitude, rather than using a range.

### Coding

##### Pair Programming
Useful for debugging code. Found that while it did slow us down somewhat, it was very helpful to have a fresh set of eyes when debugging.

##### Code Quality
Code quality was ensured by carrying out code reviews on all changes before having them merged into the `master` branch.

##### Coding Standards
Code Climate is used to enforce light-weight coding standards (e.g. no method can be more than 25 lines on code).

### Testing

// Unit testing on both client and server-side.
// Travis CI

##### Code Coverage
Coveralls reports on the code coverage of both the client and server-side code after each pull request is made.

### Known Issues 
Need to discuss that the server-side implementation is slow and that indexes do not help. // Loic will talk about this

When Travis autodeployed a new build of the server-side code, the `timeout` parameter of the Lambda function is reset to 3 seconds. If it is not manually updated, timeout errors are thrown and the client-side will report a network error to the user.


// Also discuss stuff from out project plan. https://github.com/LoicVerrall/Group-Project/blob/master/documentation/projectplan.md
