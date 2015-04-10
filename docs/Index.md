# Welcome to hook

hook is a RESTful, extendable Backend as a Service that provides instant backend
to develop sites and apps faster, with dead-simple integration for iOS, Android,
JavaScript and more.

It follows the same principles from [nobackend](http://nobackend.org/), [hoodie.js](https://github.com/hoodiehq/hoodie.js) and [Parse](http://parse.com)

**Requirements**: PHP 5.4+, or [PHP 5.3](https://github.com/doubleleft/hook/wiki/Deploying-on-PHP-5.3).

## Features

- Multitenancy (same instance may be used for many apps)
- User authentication (register, login, reset password)
- Data persistance through `collections`
- Data storage through [many providers](https://github.com/doubleleft/hook/wiki/Storage-providers)
- Real-time communication through [WAMP](http://wamp.ws) subprotocol (WebSockets).
- [Package management](https://github.com/doubleleft/hook/wiki/Composer-dependencies) through composer

## Installation

Run this command in your terminal to get the lastest
version:

```bash
curl -sSL https://raw.githubusercontent.com/doubleleft/hook/master/scripts/install.sh | bash
```

At the end of the process you should have
[hook](https://github.com/doubleleft/hook) and
[hook-cli](https://github.com/doubleleft/hook-cli.git) installed in your
machine.

License
---

MIT.
