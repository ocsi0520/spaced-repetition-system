# Spaced Repetition System Implementation

## Goals of this repository
This repository has several aims:
- Be a reference for my current knowledge
- Bring a correct implementation of the [SRS](https://en.wikipedia.org/wiki/Spaced_repetition), so it can help me and others to broaden our vocabulary \
// This is [the video](https://youtu.be/78TWMZ-COcM) where I first encountered this technique, but it is in hungarian

- Provide a proof of concepts which I studied in the following books:
	- [Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164 "Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)")
		- *Ports and Adapters* package managing
		- *Independent Deployability* and *Decoupling modes (again)* 
		If I want to have the backend code in the browser I'm good to go. If I want to have it in a seperate node.js backend I'm good to go. The deployability does not affect the packages. The packages affects the deployability. In a best case scenario, I can change my mind whenever I want. To put it in a more professional way,  *deployment view* depends on *development view* and not the other way.
	- Principles of Package Design from [Agile Software Development, Principles, Patterns, and Practices - Robert C. Martin](https://www.amazon.com/Software-Development-Principles-Patterns-Practices/dp/0135974445 "Agile Software Development, Principles, Patterns, and Practices - Robert C. Martin") (Btw, these are also stated in the previously mentioned book.)
- Learning journey for [Lit](https://lit.dev/ "Lit").
I used to use [StencilJS](https://stenciljs.com/ "StencilJS"), but I have encountered some of its limitations - i.e. can't derive from component - I want to investigate whether Lit has its solutions for these problems.
