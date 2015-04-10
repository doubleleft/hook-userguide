hook is a RESTful, extendable Backend as a Service that provides instant backend
to develop sites and apps faster, with dead-simple integration for iOS, Android,
JavaScript and more.

It follows the same principles from [nobackend](http://nobackend.org/), [hoodie.js](https://github.com/hoodiehq/hoodie.js) and [Parse](http://parse.com)

**Requirements**: PHP 5.4+, or [PHP 5.3](More/Deployment/#deploying-on-php-53).

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

## Local development

Run the server locally:

```
hook server
```

## Creating an application

Create a new application from the commandine:

```
hook app:new my-app --endpoint http://0.0.0.0:4665
```

It will output access keys to use in the front-end. Checkout this example using
[JavaScript](https://github.com/doubleleft/hook-javascript#how-to-use) frontend.

## Front-end Integration

Reduce the gap between backend and frontend development:

- [JavaScript](https://github.com/doubleleft/hook-javascript) ([docs](http://doubleleft.github.io/hook-javascript))
- [C# / Unity3D](https://github.com/doubleleft/hook-csharp)
- [Corona SDK](https://github.com/doubleleft/hook-corona-sdk)
- [iOS / OSX](https://github.com/doubleleft/hook-swift)
- [Java / Android](https://github.com/doubleleft/hook-android)
- [C++](https://github.com/doubleleft/hook-cpp)
- [PHP](https://github.com/doubleleft/hook-php) ([docs](http://doubleleft.github.io/hook-php))
- [Ruby](https://github.com/doubleleft/hook-ruby) ([docs](http://doubleleft.github.io/hook-ruby/))
- [Flash / ActionScript 3.0](https://github.com/doubleleft/hook-as3)
