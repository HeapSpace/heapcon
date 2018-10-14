---
title: "Decomposing Java applications"
description: "Ending up with application design that has good chance to evolve over the years without introducing additional accidental complexity."
day: "18"
track: "B"
weight: 1000
start: "10:00"
end: "10:45"
outputs:
- html
- calendar
---

Most Java developers happily use libraries in their applications. Many developers split their own code into what they call modules hoping that brings benefits. Yet way too often they end up having a (distributed?) big ball of mud sooner or later? This session aim to answer the question: why simply cutting things down into smaller pieces and calling them libraries, modules, microservices, ... does not work?

In this talk we'll go one abstraction level above and look at the process of decomposing a Java application into reusable components. We'll examine different ways to organize Java code in methods, classes, packages and modules. We'll talk about APIs, SPIs, hiding implementation details and enforcing module boundaries. Some of you will be surprised how well SOLID principles fits into the picture. But most important of all, we'll end up with application design that has good chance to evolve over the years without introducing additional accidental complexity.
