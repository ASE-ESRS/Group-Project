# Task 4 Demonstration Notes

Run the client-side and retrieving results (choose small radius please!).

_Loic_: Describe the postcode preprocessor.

## Software Engineering Practises

### Process Demo
1. Programmer A makes a change that causes a unit test to fail.
- Programmer A commits, pushes, and creates a PR for their change.
    - Travis flags that the test no longer passes.
- Programmer B carries out a code review and identifies the problem, suggests changes.
- Programmer A corrects their mistake and updates PR.
- Programmer B reviews again and then merges.

### Testing

_Dan_: Talk about unit testing on the client and server sides, and how this testing is automated using Travis CI.

### Coding Standards

Code Climate is used to enforce light-weight coding standards (e.g. no method can be more than 25 lines on code).

### Code Coverage

Coveralls reports on the code coverage of both the client and server-side code after each pull request is made.

### Issue Tracking
Discuss and show the Issues section on GitHub as our way of tracking remaining tasks and bugs.

Means people from different teams can see all the remaining tasks that need doing. Tasks can be assigned to people. Anyone who has completed their task and now has nothing to do can look at the issues to pick something up.

### Pair Programming
Useful for debugging code. Found that while it did slow us down somewhat, it was very helpful to have a fresh set of eyes when debugging.

### Slack
Channels for the separate projects (e.g. `#server-side`, `#client-side`).
