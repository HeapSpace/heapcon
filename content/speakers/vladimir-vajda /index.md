---
title: "Microservice Architecture Based on Event Sourcing"
description: ""
speaker: "Vladimir Vajda"
bio: "Vladimir Vajda works as Data Engineer at SmartCat. He started as Java developer but got interested in distributed and data intensive systems and system architecture. Loves great argument, a good book, good beer and tasty food. He usually spends his spare time with his family or thinkering and playing with some new technology or project."
company: "SmartCat"
job: "Data Engineer"
link: ""
day: "26"
track: "A"
weight: 1330
start: "13:30"
end: "14:05"
outputs:
- html
- calendar
slug: "vladimir-vajda"
ogpng: "og-speakers/vladimir-vajda.png"
---

Using HTTP as a means of communication between services, introduces tight coupling as each service needs to know about the existence of the other. Event sourcing solves the coupling problem as each service is unaware of any other. It just listens on events of interest, processes them and produces new events. At least, in theory.
Even though you have event sourcing, in some cases you cannot avoid asking other service for a piece of information.

This talk is about how to design your services to support the query communication pattern.
There are several approaches how this can be solved, none of them is almighty, each has its pros and cons. The decision should be made carefully.

<!-- Using HTTP as communication between services introduces tightly coupling as each service needs to know about the existence of other. This results in overall brittle and much more complex system than it actually needs to be.
Event sourcing solves the coupling problem as each service is unaware of any other. It just listens on events of interest, processes them and produces new events. At least, theory says that.
In practice, there are situations where compromises are made in order to keep system reasonably simple and easy to maintain.

This talk will present 3 different types of communication between services: commands, events and queries.
Commands tell other services to execute some work that will change the state of the system. Commands expect a response.
Events are notifications which other services can listen to and react, they do not expect a response.
Queries acquire an information from other service. They do not change the state of the system.

Commands and events are easily represented using event sourcing, however, that is not the case with the queries.
Queries can be implemented in several ways, depending on the situation.
This talk will explain pros and cons of each query approach. -->
