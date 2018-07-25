# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Portable Abstractions and Patterns for Node.js

This framework is a part of [Pip.Services](https://github.com/pip-services/pip-services) project.
It provides portable abstractions and  patterns that can be used to implement non-trivial business logic in applications and services.

The key difference of this framework is a portable implementation across variety of different languages. 
Currently it supports Java, .NET, Python, Node.js, Golang. The code provides reasonably thin abstraction layer 
over most fundamental functions and delivers symmetric implementation that can be quickly ported between different platforms.

All functionality is decomposed into several packages:

- **Commands** - commanding and eventing patterns
- **Config** - configuration framework
- **Convert** - soft value converters
- **Data** - data patterns
- **Errors** - application errors
- **Random** - random data generators
- **Refer** - locator (IoC) pattern
- **Reflect** - reflection framework
- **Run** - execution framework
- **Validate** - validation framework

Quick Links:

* [Downloads](https://github.com/pip-services-node/pip-services-commons-node/blob/master/doc/Downloads.md)
* [API Reference](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/index.html)
* [Building and Testing](https://github.com/pip-services-node/pip-services-commons-node/blob/master/doc/Development.md)
* [Contributing](https://github.com/pip-services-node/pip-services-commons-node/blob/master/doc/Development.md/#contrib)

## Acknowledgements

The library is created and maintained by **Sergey Seroukhov**.

The documentation is written by **Mark Makarychev**.
