# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Portable Abstractions and Patterns for Node.js

This framework is a part of [Pip.Services](https://github.com/pip-services/pip-services) project.
It provides portable abstractions and  patterns that can be used to implement non-trivial business logic in applications and services.

The key difference of this framework is a portable implementation across variety of different languages. 
Currently it supports Java, .NET, Python, Node.js, Golang. The code provides reasonably thin abstraction layer 
over most fundamental functions and delivers symmetric implementation that can be quickly ported between different platforms.

All functionality is decomposed into several packages:

- [**Commands**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/commands.html) - commanding and eventing patterns
- [**Config**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/config.html) - configuration framework
- [**Convert**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/convert.html) - soft value converters
- [**Data**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/data.html) - data patterns
- [**Errors**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/errors.html) - application errors
- [**Random**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/random.html) - random data generators
- [**Refer**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/refer.html) - locator (IoC) pattern
- [**Reflect**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/reflect.html) - reflection framework
- [**Run**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/run.html) - execution framework
- [**Validate**](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/modules/validate.html) - validation framework

Quick Links:

* [Downloads](https://github.com/pip-services-node/pip-services-commons-node/blob/master/doc/Downloads.md)
* [API Reference](https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/globals.html)
* [Building and Testing](https://github.com/pip-services-node/pip-services-commons-node/blob/master/doc/Development.md)
* [Contributing](https://github.com/pip-services-node/pip-services-commons-node/blob/master/doc/Development.md/#contrib)

## Acknowledgements

The library is created and maintained by **Sergey Seroukhov**.

The documentation is written by **Mark Makarychev**.
