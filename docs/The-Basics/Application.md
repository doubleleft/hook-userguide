## Creating an application

Having the server [installed](Getting-started/How-to-use/#installation) locally
or remotely, you'll need to create one application into that endpoint. Every
collection or configuration on hook is tied to a single application.

To create one, you'll need to run the following command from the commandline.
Remember to copy the output of the command, which you'll need in near future.

```
hook app:new my-hook-powered-application
```

The default endpoint is [http://0.0.0.0:4665/](http://0.0.0.0:4665/), for local development. You'll
need to speficy `endpoint` option if you have installed it remotely.

```
hook app:new my-hook-powered-application --endpoint http://your-server.com/
...
create hook-ext/security.yaml
create hook-ext/packages.yaml
create hook-ext/schedule.yaml
create hook-ext/schema.yaml
create hook-ext/config/config.yaml
create hook-ext/config/config.development.yaml
create hook-ext/credentials/development/cli.json
create hook-ext/credentials/development/browser.json
create hook-ext/credentials/development/device.json
create hook-ext/credentials/development/server.json
Application created successfully.
```

The `app:new` command will scaffold the available [configuration](Configuration)
files. As you can see `development` is the default environment, when not
specified.

## Application environment

In a real scenario you will need to handle different environments, such as
staging and production. In hook you'll need to create an application for each
one of them.

The CLI offers a handy `--environment` (`--env`) option for that.

Example, creating an `staging` application:

```
hook app:new my-application --environment staging
```

Having your different environment credentials, ou may specify the
`--environment` for commands such as `db:seed` and `deploy`.

## Application keys

After running `app:new` command, it will output the application keys:

```
$ hook app:new my-hook-powered-application
...
Application: my-hook-powered-application
Keys:
{
  app_id: 1
  key: 9e48d5a6acc6006d3428e7aeef8974a1
  type: cli
}
{
  app_id: 1
  key: ff36cf472352174365f22bc2586b8dc7
  type: browser
}
{
  app_id: 1
  key: ecec71610a738aa9df70acbae5e9fa06
  type: device
}
{
  app_id: 1
  key: 6c8b72e1765801c4974b95cf175a451b
  type: server
}
```

As you can see, there is 4 different key types here. Each of them should be
used to perform specific tasks. Most of the time you'll need to worry just
about the `cli` and the platform you're interested in.

### Application key: cli

That's your private key that have with full access to the application. It is
important to never expose it, so keep it secret.

Only the `cli` application key has the ability to deploy the application, also
any security check is skipped when you're using `hook console` command.

### Application key: browser

The `browser` application key is targeted for web browsers, which needs
[Cross-origin_resource_sharing](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
headers exposed to the client. You'll mostly use it with the
[hook-javascript](https://github.com/doubleleft/hook-javascript) client.

By default the server will allow any host origin to get responses using a
`browser` application key. As your application go to production, it is
interesting to limit it's access to your server's origin using
[`allowed_origins` security configuration](Configuration/#security).

### Application key: device

Targeted for mobile devices. Only device application keys has the ability to
register for push notifications.

### Application key: server

Targeted for server-to-server communication.
