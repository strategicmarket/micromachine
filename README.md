## Strategic Machines

## Developer workbench for testing microservices

A simple http server providing a platform for testing microservices used on the Strategic Machine platform. The server is purposely stripped down to emulate the functions one would run in Lamda or OpenWhisk environments.


## Getting Set Up and Usage

Getting the app running on your local machine takes only a few steps:

1. clone the project - `git clone https://github.com/strategicmarket/micromachine.git`
2. Update configuration parameters
3. start the app - npm run start

4. npm run std - analyzes code based on common javascript standards

5. npm run test

Note that a model microservice and the use of @xmachina/message factory function for managing the state machine and working with the data object from the messaging platform can be found at

[sample microservice and use of @machina/message](./skills/ibm/packages/sm_banter/banter.js)


Microservices are the core of an Agent's 'intelligent interaction'. The design of Strategic Machines is to integrate the use NLO, NLU, NLG and Machine Learning with pure functions (microservices) -- reducing complexity, cost and cycle time for the build, test and deployment of winsome virtual Agents for businesses. The architecture of the Machines platform presumes a separation of concerns between important entities involved in the composition of cognitive apps:

> platform services- The messaging platform is a low latency processing platform, integrating channels, state machines, and data services with every message before handing it to a microservice for response
> ai services - the platform leverages ai engines for intent, entity identification and other cognitive services as required
> microservices - pure functions which parse data objects received form the platform to compose responses with precision.

There are two servers that are helpful to developers who are building microservices for consumption by the Strategic Machines platform.

> the apimachine is a test server to send a web transaction with payload to the micromachine.
> the micromachine is a test server which processes the http transaction from micromachine and runs the microservice that it hosts. Essentially, the micromachine is emulates the execution of the microservice that would otherwise need to be deployed to AWS Lamda or OpenWhisk for testing

In addition to these two test servers, the developer also has access to a constructor which permits ready interrogation of the data object through a set of methods. See @machina/message for more information

## License and Use
 [LICENSE](./LICENSE.txt)

## Contributing
 [contributing](.github/CONTRIBUTING.md)

Strategic Machines and affiliates
