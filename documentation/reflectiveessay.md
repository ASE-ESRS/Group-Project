# Reflective Essay

This project focused on building a mobile phone application for the Android platform backed by a server-side hosted on Amazon Web Services (AWS).

A product description was given by the customer. The description detailed an application to display Land Registry database data showing the ownership of property in England and Wales on a heat-map.

This specification was added to over the course of the project to add more functionality to the application. The overall code coverage and quality of our tests was an area for improvement as well as increasing the maintainability of the code.

On the front end, we looked to dynamically adjust the heat map sensitivity, shown in the display colours, to be relative to the area being viewed by the user. The user could enter a postcode / drop a pin on the map to view a specific location or remain using the phones GPS signal. More settings were added to the phone's settings for increased user interaction as well as the national crime statistics being introduced to the application to be alongside the price data.

## Specifications and Dealing with Ambiguity

As the description of the project was left somewhat ambiguous the team had to come up with a process to set a more structured set of requirements. This was done by going through the description as a team and deciding on unambiguous requirements followed by contacting the client for clarification on any of the issues. This was found to be a good way of dealing with the lack of specificity and worked well for both the team and the client.

### App Quality

To ensure the quality of the application we gathered as a team to go through the ambiguous description and make unanimous decisions on which features to go with as a starting point and then also to list some extension tasks for the development based on progress within the agile sprint.

By having the team together to decide on these features, which were then confirmed with the customer, it ensured the whole team had the same endpoint for the application and were working towards a unanimous goal. We found this to be very useful for maintaining a high-quality within the application.

### Team Structure

To maintain a structure to the team it was decided at an early stage to appoint a team leader for the group. This was a member that was tasked with handling communications and to have the deciding vote if any issues came up during the process. This was found to be a good structure for the team although there were never any conflicts that required an authoritative decision.

Within the team, the decision was taken to split into the logical sides of the project, a server-side team and a client-side team. This was a general parting with all members able to have an input to the other but created a general line to focus the team on their individual sections. This was found to work well at the beginning of the project but as more complex issues arose, for example testing and code-reviews, there was more of a cross-over within the team.

As testing became a large part of the process this forked off to become a third branch of the team. It required a large amount of time and attention, therefore having a dedicated section for this with members able to crossover and input into the team was a logical progression. This was found to work well with the team taking an interdisciplinary approach to the groups while still maintaining core roles.

## Cloud Server and Database

A big decision that had to be made for the application was which web service to adopt to provide the database and web communication capabilities. At first, we looked into Googles Cloud Platform. This was looked into but it was found to be too complex for what was required as well as experiencing problems with installing all modules required to access the database locally. A large amount of time was spent trying to get the Google Cloud Server to work and, upon reflection, this would be a failure in our software engineering process. Rather than choose the first service we found and then spend a lot of time trying to force it to meet our needs, we should have briefly looked into multiple services and then as a group picked the one we thought was most applicable to the task. To avoid this happening in the future we would meet as a team and discuss these key decisions in a lot more detail, preferably in person, to get a unanimous decision.

We decided to go with Amazons Web Service (AWS). This has proven to be a very user-friendly yet powerful service that allowed our database to be implemented in DynamoDB and then called via a lambda functions to allow requests to be made from a mobile device via an HTTP request.

An issue encountered on the Server Side was a delay in the time for a request to come in, for the request to be processed, database queried and the data returned was taking around 15-20 seconds. Obviously, this is unacceptable for a commercial application but it proved to be a real software engineering problem. Due to the time it takes for a request to be processed this delay would have to be seen as a software engineering failure. With more time, or the opportunity to make the application again, a lot of time would have to go into researching querying a database and returning large amounts of data from DynamoDB to try and avoid this delay. Due to the request being successfully handled and the correct information returned (despite the delay) as a team we decided this would be a satisfactory issue to acknowledge and focus on other parts of the development rather than getting completely caught up in this one area.

## Modular Architecture

With the development process centred around an agile structure, the modularity of the codebase was key to allow for changes to be made to the specifications. The agile structure was one that as a team we had never fully implemented before but worked very effectively and was one of the successes of the project. The transparency of the Agile structure allowed the client to be contacted for quick feedback and for these changes to be implemented in a timely manner. Our sprint cycles were based on the deadline for the application and this made the schedule very predictable and helped to maintain team performance throughout the sprint. Finally, by breaking the project down into the two distinct sections and then this into smaller, manageable units (kept track of with GitHub issues, acting as a to-do list) we could focus on getting the unit to pass the specification to a high quality before moving onto the next section. When all these factors were merged it made the Agile a very powerful and intrinsic tool for our software engineering process and is a tool we would carry forward as a group when required.

## Software Engineering Techniques / Tools

### Pair Programming

Pair programming was a relatively new concept to the team at the start of this process but it was a process that lent itself to the logical split within our team, allowing for easy pairing. This technique was found to be exceptionally useful for debugging code during long sessions of coding in multiple languages where errors are occasionally made but often hard to spot.

A disadvantage of this approach was that it did slow down the coding process, but, the omittance of bugs in the code that was being created and therfore increasing the overall quality made it worthwhile and a very helpful technique for the team to employ.

Programming as a team, getting together and all working on the app at the same time was found to be very beneficial to the software engineering process. Creating an atmosphere reflective of a work environment allowed the team to motivate each other and progress was found to be far faster when working as a group than individually. This also allowed for easy pair programming and instantaneous code reviews, drastically speeding up all aspects of the development. This is an aspect that as a team we would try to set aside more time for and implement if this process was to be conducted again.

### Version Control

##### GitHub

Github was chosen as the version control manager for our codebase. As well as being an industry used piece of software it was the logical choice to keep the team co-ordinated, aligned and increase poductivity. It allowed the poject to be split into its logical sections with a Master development branch forked by each team member. From here development could be continued, reviewed and then merged into the master branch. Successfully setting up the GitHub project and implementing the features avaliable (Code Reviews, Issue Tracking etc) was a major improvement from previous projects and has been a major success for the team with the whole team being in agreement they would use GitHub for any future software engineering projects. 

##### Code Quality

Code Climate was used to enforce light-weight coding standards upon our code. This included rules such as maintaining less than 25 lines of code within a method and keeping the complexity of a method to be within a certain threshold.

This was found to be a very unnatural way of programming at first and adjustments had to be made to accommodate these rules. We found some issues arose when using default methods that required a certain number of lines to achieve core functionality. This would leave very little room for additional lines which would cause some issues within code climate.

Overall this process of increasing the quality of our code forced maintainable code to be made with more thought going into the logical structure the code could take. Although unaware of a benefit of this when setting up code climate, this made for very testable code allowing the separated methods to be thoroughly tested to increase the coverage our tests were able to attain. With the extra effort taken into account, this was seen as a very useful addition to the software engineering process.

### Automated build process

#### Travis CI

Travis CI was implemented to allow the automatic testing and deployment of code to Amazon Web Service. It was chosen due to being easily integrated into github, its multi-language support, ability to test directly on every pull request made and then the automatic and configurable deployment to AWS. 

Having a clean enirmoent to allow the visulisation and parallel running of tests with visual indicators as well as automatic communication with Slack were all seen as incredibly useful tools for automating these aspects of our development process. The speed increase that has been achieved by implementing Travis as well as the container infastructure has made the tool helpful and learning how to use this tool successfully has been another of the software engirneering successes of the project. 

#### GitHub Badges

Github has the ability to add badges to pull requests to allow for easy visulisation code coverage and the result of the test suite on the code. This is a nice addition to the information avaliable on GitHub and allows for future integration for other badges, such as the version bagde. Although only a small change to the development process the extra, easily visible information has been found to be useful and a nice addition. 

### Group Communication

#### Slack

For in team communication 'Slack' was found to be a logical choice of software to use. It is a piece of industry standard communication software that allowed specific channels to be set up to follow the team structure we had adopted. This allowed the easy communication of any problems or progress within the project and help keep the schedule on time.

We were able to integrate GitHub and Travis CI into Slack on its own channel to keep all members informed of any changes to the project by other members.

While members of the team were working remotely on the project, Salck played a key role in allowing progress to be maintained, keeping productivity high with all members of the team informed. With remote working being widely used within the industry it was a good experience for the whole team and we found, mainly due to our communication channels, that it did not negatively affect the overall performance of the team.

Slack was found to be an exceptionally useful tool and its use will be continued into future projects. It has been key to the success of the team by maintaining free and open communication as well as providing both local and mobile updates at the project progressed.

#### Github

Within GitHub, you are given the ability to raise issues with the rest of the team within that repository. As our repository was logically split into the sections people would work on it was easy to raise these area-specific issues with the group, use labels to set a priority to the issue and assign it to a member with the most experience within that area to look into. This was very much used in a 'to-do' list style, not only focussing on very urgent issues that needed attention but also for more general issues within the app that would need attention over the course of the software engineering process.

We found this to be an efficient and effective way to communicate issues within the project due to GitHub being linked to Slack, so these issues would be communicated to the team automatically. Although very helpful the issues on GitHub could have been better utilised within the project to keep track of issues within the project more efficiently while allowing issue specific comments kept on that thread allowing a quick reference for the team. Aside from using these more effectively in the future they were an asset to the team and found to be very helpful in the software engineering process.

*** GitHub should probably be put into its own "Version Control" section ***

### Testing

###### Unit Testing

Code Climate (discussed above) encouraged modular code and this made large amounts of unit testing (on both the server-side and the client-side) trivial.

Each unit test was designed to test one method with some specific arguments put into that method to test for an expected result. Tests were carried out for an expected, successful output, edge cases were tested as well as an input that would cause the method to fail.

There were, however, fairly large sections of code that proved problematic to test — in particular, those relating to interface (e.g. on the client). On the server-side, the entry point for the program was a handler function for AWS's request object. This could not be mocked, and nor could the HTTP response code.

Code coverage (discussed below) reported a fairly low (less than 50% on the server-side) coverage report after Task 4. Following this, a lot of work went into refactoring the server-side to be more modular, and this allowed test coverage to improve by more than 10%.

### Code Coverage

As briefly mentioned in a previous section, Coveralls was used to report on the coverage of both the client and server-side code after each pull request was made.

This allowed a clear indication of how effective our testing was and discouraged merging pull requests that did not improve the overall test coverage.

Initially, we faced issues integrating the automatic coverage reports with GitHub, but these issues were resolved subsequently. It was convenient to place badges on the front of the GitHub pages to allow all team members to get an at-a-glance feel of the current coverage.

The team found code coverage a useful addition to the project as it acted as a good indicator of whether or not a pull request should be merged or adjusted first.

### Logging / Error Monitoring

###### CloudWatch

The built-in AWS logging system proved invaluable in helping to debug a whole host of different issues. Helpful error messages were thrown, such as:
> Timeout limit (3 seconds) exceeded

This led to rapid bug fixing efforts that would have otherwise taken much longer.

###### Custom Logging

As part of Task 5, the team decided it would be beneficial to implement a custom light-weight logging mechanism that would make a record of each request made to the server.

Information about the request, such as the coordinate search radius and whether the request was successfully responded to, was stored with each entry in the `requests_log` table.

### Known Issues

###### Server-Side Performance

Probably the most severe remaining unsolved problem pertained to the performance of the server-side program. Most API calls to the server-side take between 10 - 15 seconds to return which is, for a modern-day application, unacceptable.

Currently, when a request is made, the server runs through the entire table (containing millions of data-points) to check whether each one lies within the bounds of a specified rectangle.

As an attempt to speed this up, an index was created on the `latitude` attribute. This resulted in very fast random access when querying for specific data-points, but this specificity was, in fact, the reason this method was fundamentally unable to work.

###### Travis Not Updating Timeout

A rather less significant issue, this time relating to our build process, was that when Travis auto-deployed a new built of the server-side code (after a merge into the `master` branch), the `timeout` parameter for the Lambda function is reset to the default of 3 seconds.

As mentioned above, the server-side code takes more time than that to execute and so the function is prematurely terminated unless the `timeout` parameter is manually adjusted.

### Future Work

###### Average Large Return Datasets

One limitation of the app in its current state is that you can only select a search radius up to 20km. The reason for this restriction is that the server will attempt to return all results within the specified vicinity of the client.

It's not hard to imagine that this scales badly and, at some threshold, breaks down altogether. Consider the case of the user selecting a search radius that encompasses the entire country. Even if the server returned these results, it would be in the order of gigabytes.

A better solution might be to, before returning the data-points to the client, have the server average (cluster together) data-points so that no more than some threshold number of data-points are returned.
