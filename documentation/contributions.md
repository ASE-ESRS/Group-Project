# Contributions

Group members should update this section as they go to document what work they've done on the project, and approximately how much time each task has taken them.

Even tasks that don't contribute directly to the final submission should be included. It would be good to update this regularly as we go so nothing is forgotten.

***

### Daniel Arthur

| Task                           | Description                               | Duration    |
| :----------------------------- |:----------------------------------------- | -----------:|
| Client Side Testing Framework | Set up the client side with the Mocha framework to enable unit testing that was then carried out by Alex Tang. | 2h |
| Continuous Integration | Set up continuous integration on both the client and server side, using Travis CI to automatically build both repos, as well as publish code maintainability reports and test coverage reports onto GitHub. In the case of the server side code, Travis CI automatically deploys the code to the AWS servers. | 6h |
| Android Programming | Set up the initial Android app that works with the Google Maps API to produce a simple map. This task also involved a lot of research (6h reading) on how the Android OS works and understanding the separate components of an Android Application. | 10h |
| Pair Programming | Pair programming with Mark Paice on the heat map functionality including unit tests. | 6h |
| Pair Programming | Pair programming with Loic Verrall integrating his settings menu UI with the rest of the app. | 2h |
| Code Reviews | Reviewing Pull Requests for both server and client side on GitHub and reviewing code line-by-line to ensure its quality before being pushed to the server or making it into the client side codebase. | 13h |
| Debugging Server Side | When faced with an Internal Server Error, helped the server side team to discover a bug that was not responding to the client with well-formed HTTP responses. | 1h |

***

### Harry Collins

| Task                           | Description                               | Duration    |
| :----------------------------- |:----------------------------------------- | -----------:|
| Example Task                   | This task entailed these things.          | xh          |

***

### Mark Paice

| Task                           | Description                               | Duration    |
| :----------------------------- |:----------------------------------------- | -----------:|
| Android Research | Research into fundementals of coding for Android, and relevant tools. | 7h |
| Project Plan | Writing up the project plan for Task 1&2. | 2h |
| Pair Programming | Peer programming with Daniel Arthur on the heat map functionality including unit tests. | 6h |
| Server-Side Debugging | Debugging the Server Side latitude/longitude functionality for Task4. | 2h |

***

### Alex Tang

| Task                           | Description                               | Duration    |
| :----------------------------- |:----------------------------------------- | -----------:|
| Project Plan                   | Writing up the project plan for tasks 1&2 | 2h |
| Test Documentation | Documenting how we are testing, looking closely at different techniques available to us | 2h |
| Research into ['Mocha'](https://mochajs.org/#assertions), ['Chai'](http://chaijs.com/guide/styles/#assert) and ['Assert'](https://nodejs.org/api/assert.html) libraries | Learning how to test with node.js using Mocha and the Assert library | 15h|
| Writing test cases | Series of unit tests for the server-side part of task 4, refactoring index.js to allow testing | 10h |
| Refactoring Unit Tests | Server-side code had a few bugs, newest implementation required refactroing some test cases| 8h |
| General Documentation | All around formatting and editing | 1h |
| Code Reviews | Time spent reviewing various Pull Requests          | 2h          |

***

### Loic Verrall

| Task                           | Description                               | Duration    |
| :----------------------------- |:----------------------------------------- | -----------:|
| [`process-postcodes.py`](https://github.com/LoicVerrall/MARTIN-server/blob/master/preprocessing/process_postcodes.py) | Python script to take the 4 GB input dataset, extract information, convert postcodes to latitude/longitude, and upload to AWS. | 22h |
| [`index.js`](https://github.com/LoicVerrall/MARTIN-server/blob/master/index.js) | Accepts requests from the Task 3 client-side and inserts location records in DynamoDB | 21h |
| [`store_location_price.js`](https://github.com/LoicVerrall/MARTIN-server/blob/master/preprocessing/store_location_price.js) | Accepts POST requests from the `process-postcodes.py` program and inserts price-paid datapoints into DynamoDB | 6h |
| Search Radius Setting | Worked on adding a Settings screen with a slider to control the search radius to the client-side + JUnit tests | 10h |
| [General Documentation](https://github.com/LoicVerrall/MARTIN-server/blob/master/README.md) | Documentation of the server-side          | 3h          |
| Google Dev/AWS | Time spent researching/trying to get working Google Drive/AWS (including figuring out Lambda functions)          | 15h          |
| Code Reviews | Time spent reviewing various Pull Requests          | 3h          |
