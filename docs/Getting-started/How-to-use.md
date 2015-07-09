# Installation

Run the following command in your terminal to install the latest version of
[hook](https://github.com/doubleleft/hook) and
[hook-cli](https://github.com/doubleleft/hook-cli.git):

```bash
curl -sSL https://raw.githubusercontent.com/doubleleft/hook/master/scripts/install.sh | bash
```

# Local development server

To run a local development server, `cd` into hook directory, then run the `server` command:

```
$ cd ~/Projects/hook
$ hook server
...
PHP 5.4.33 Development Server started at Sat Apr 11 18:51:47 2015
Listening on http://0.0.0.0:4665
Document root is /Users/endel/Projects/hook/public
Press Ctrl-C to quit.
```

The default endpoint for local development server is
[http://0.0.0.0:4665](http://0.0.0.0:4665).

# Creating a new application

The first step to develop application with hook, is to create a [new
application](../The-Basics/Application/) in the server.

# Deploying your application

The `deploy` command will upload all your application modifications inside
`hook-ext` directory, such as modules (observers, routes, templates and
channels), configurations (config.yaml, security.yaml, schema.yaml), packages
(packages.yaml) and schedule (schedule.yaml).

```
hook deploy
...
Successfully deployed.
```

Every change you make inside `hook-ext` directory needs to be deployed to
affect the backend.

# Seeding collections

Collection seeding is a way to define some initial contents for your
application's collections, such as categories, tags, etc. In this example we'll
generate some dummy content for a collection called `events`.

To generate the seed file for the collection you need, run the following
command:

```
hook generate:seed events
Seed created at 'hook-ext/seeds/events.yaml'.
```

You can now edit the `hook-ext/seeds/events.yaml` file that was generated to
add your entries.

```yaml
#
# Seed for events
#
truncate: true
data:
  - name: My first event
    picture: !upload path/to/picture.jpg
  - name: My second event
    picture: !upload path/to/picture-2.jpg
```

Things to note here:

* You may upload files by using `!upload` instruction.
* By using `truncate: true` instruction, the collection will be entirely
cleared before being seeded again.

After you're done, let's seed the events collection with the following command:

```
hook db:seed events
```

If you have more than one seed file, you may seed all of them once by running:

```
hook db:seed
```

Be careful to not truncate collections with user generated content.

# Interactive console

The interactive console is a tool to use the
[javascript](https://github.com/doubleleft/hook-javascript) interface with the
[CLI application key](../The-Basics/Application/#application-key-cli)
interactively from your terminal.

It is designed for testing and debugging your application code and evaluating state.

```
$ hook console
```

The console can be closed by pressing  `Ctrl+C` twice.

The console has the JavaScript client instantiated by default as `hook`. Unlike the browser environment, every time the client tries to return a Promise, it will immediatelly be evaluated and its output will formatted and displayed.

Example:

```
client: javascript> hook.collection('events').count()
2
```
The console JavaScript client also has extended permissions on hook's restricted collections:
```
client: javascript>  hook.collection('auths').select('email').get()
...
```

# Generators

**generate:channel** - Generate custom channel class.

```
hook generate:channel <channel-name>
```

**generate:observer** - Generate observer class for collection events.

```
hook generate:observer <collection-name>
```

See [more about observers here](../The-Basics/Collections/#observers).

**generate:route** - Generate a custom route for the application.

```
hook generate:route <path> [method=GET]
```

See [more about custom routes here](../The-Basics/Custom-routes/).

**generate:schema** - Generate schema definition config.

```
hook generate:schema
```

See [more about schema definition here](../The-Basics/Schema/).

**generate:seed** - Generate seed template.

```
hook generate:seed <collection-name>
```

See [more about seeding collections
here](../The-Basics/Collections/#seeding-collections).

**generate:template** - Generate an HTML template.

```
hook generate:template <template-name>
```

See [more about templates here](../The-Basics/Templates/).

# Retrieving application data

**keys**: List all application keys.

```
hook keys
```

**logs**: Get app back-end logs.

```
hook logs
```

You may specify the number of lines you want to return from logs with `-n 1000`
(1000 lines)

**modules**: List all application modules

```
hook modules
```

**schedule**: List tasks scheduled for app.

```
hook schedule
```
