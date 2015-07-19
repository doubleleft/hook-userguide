# Heroku

```bash
git clone git@github.com:doubleleft/hook.git
cd hook
```

Create an heroku app using a custom buildpack. (Thanks to [@CHH](https://github.com/CHH))

```bash
heroku create myapp --buildpack https://github.com/CHH/heroku-buildpack-php
```

Configure git remote to heroku endpoint.

```bash
git remote add heroku git@heroku.com:myapp.git
git push heroku master
```

The buildpack will install nginx, php, php-fpm, and run `composer install`
automatically. When it finishes it's already possible to hack on using
http://myapp.herokuapp.com as your hook endpoint.

By default hook uses SQLite. You can pick any database add-on available on
Heroku to use, such as [cleardb](https://addons.heroku.com/cleardb) (MySQL).
Let's do this:

```bash
heroku addons:add cleardb
```

Run `heroku config` and check out the `CLEARDB_DATABASE_URL` variable. Let's
extract database variables from there and edit our `app/config/database.php`
file.

```php
<?php
// config/database.php
return array(
	'driver'   => 'mysql',
	'host'     => 'us-cdbr-east-04.cleardb.net',
	'username' => 'b2fe300440300f',
	'password' => 'a7440e49',
	'database' => 'heroku_b4270320d92f20f',
	'collation' => 'utf8_general_ci',
	'charset' => 'utf8'
);
```

Push it again, and you are ready to go.

# OpenShift

```
git clone git@github.com:doubleleft/hook.git
cd hook
```

Create a PHP-5.4 app from [OpenShift console](https://openshift.redhat.com/app/console/application_types?tag=php)

```
git remote add openshift ssh://53791a514382ec417500014f@php-dlapi.rhcloud.com/~/git/php.git/
```

Create a deployment hook to install `composer` dependencies.

```
mkdir -p .openshift/action_hooks
```

Deployment hook file: `.openshift/action_hooks/deploy` (needs `chmod +x`)

```
#!/bin/bash
# Credits: http://stanlemon.net/2013/03/22/composer-on-openshift/

export COMPOSER_HOME="$OPENSHIFT_DATA_DIR/.composer"

if [ ! -f "$OPENSHIFT_DATA_DIR/composer.phar" ]; then
    curl -s https://getcomposer.org/installer | php -- --install-dir=$OPENSHIFT_DATA_DIR
else
  php $OPENSHIFT_DATA_DIR/composer.phar self-update
fi

( unset GIT_DIR ; cd $OPENSHIFT_REPO_DIR ; php $OPENSHIFT_DATA_DIR/composer.phar install )
```

Push your application to deploy:

```
$ git push openshift master
```

Live demo: [http://php-dlapi.rhcloud.com/](http://php-dlapi.rhcloud.com/)


# Google App Engine

It seems possible, but kinda hacky.

Reference for further deep look:
- http://blog.neoxia.com/laravel-4-on-google-appengine-for-php/
- https://gae-php-tips.appspot.com/2013/10/22/getting-started-with-laravel-on-php-for-app-engine/
- [Patched MySqlConnector](https://gist.github.com/gmergoil/5693102)

# Web Sockets

For the websocket itself:

```bash
php socket/server.php
```

And you may also need to setup a socket policy server:

```bash
perl -Tw socket/flash_socketpolicy.pl
```

Its set to listen on port 8430 in order to be able to run it as an unprivileged user, but as the script needs to bind in port 843 we can forward ports.

With iptables we can apply the following rule (of curse with `sudo` or as `root` user):

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 843 -j REDIRECT --to-port 8430
```

Or with ipfw on Mac OS X:
```bash
sudo ipfw add 100 fwd 127.0.0.1,8430 tcp from any to me 843 in
```

# Server Configuration

**Apache**

You may need to add the following snippet in your Apache HTTP server virtual host configuration or **.htaccess** file.

```apacheconf
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond $1 !^(index\.php)
RewriteRule ^(.*)$ /index.php/$1 [L]
```

Alternatively, if you’re lucky enough to be using a version of Apache greater than 2.2.15, then you can instead just use this one, single line:
```apacheconf
FallbackResource /index.php
```

**Nginx**

Under the `server` block of your virtual host configuration, you only need to add three lines.
```conf
location / {
  try_files $uri $uri/ /index.php?$query_string;
}
```

**IIS**

For IIS you will need to install URL Rewrite for IIS and then add the following rule to your `web.config`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Hook" stopProcessing="true">
                    <match url="^(.*)$" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="index.php/{R:1}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

# Vagrant / Saltstack

Clone [doubleleft/hook](https://github.com/doubleleft/hook.git) repository, in your `/Projects` dir and cd into it.

Have a look in Vagrantfile and customize it for your needs.

Type:

```bash
vagrant up
```

In order to deploy in a production server with [Saltstack](https://github.com/saltstack/salt), make sure you already have Salt installed. You can install it like this:

```bash
curl -L https://bootstrap.saltstack.com | sudo sh
```

Our salt formula accept some parameters. By default it should work out of the box in a Vagrant environment. The default values are setup like this:

```yaml
project_path: /vagrant
project_username: vagrant
proj_name: myproject
domain_name: localhost
```

If deploying through command line, you can customize this values like this:

```bash
cd your/directory/root/project
sudo salt-call -c salt state.highstate pillar='{project_path: your/directory/root/path, project_username: your-ssh-username, proj_name: hook, domain_name: hook.mydomain.com}'
```

If you are deploying inside vagrant itself through [vagrant-linode](https://github.com/displague/vagrant-linode), [vagrant-digitalocean](https://github.com/smdahlen/vagrant-digitalocean) or [vagrant-aws](https://github.com/mitchellh/vagrant-aws) for example, you could fill the salt pillar arguments right into `Vagrantfile`, like this, for ex:

```ruby
  config.vm.provision :salt do |salt|
    salt.minion_config = "salt/minion"
    salt.run_highstate = true
    salt.colorize = true
    salt.pillar({
      "project_path" => "/srv/www/hook",
      "project_username" => "ubuntu",
      "proj_name" => "hook",
      "domain_name" => "hook.mydomain.com"
    })
  end
```

# Deploying on PHP 5.3

It's not recommended to deploy hook on PHP 5.3. Use this guide if strictly
necessary.

It's possible to downgrade hook's code and dependencies to support PHP 5.3
version using [php-code-downgrade](https://github.com/endel/php-code-downgrade)
tool and some manual fixes. (see item 5 below)

**1.** Download and install hook:

```
git clone https://github.com/doubleleft/hook.git
cd hook
composer install
```

**2.** Edit the `composer.json` file and add the following dependency for [5.3
   compatiblity](https://github.com/packfire/php5.3-compatibility):

```bash
composer require packfire/php5.3-compat
cd ../
```

**3.** Install the downgrade tool:

```
git clone https://github.com/endel/php-code-downgrade.git
cd php-code-downgrade
composer install
```

**4.** Run the tool against hook directory to downgrade it's core and vendor features to 5.3. It's important that you have run `composer install` to install hook's dependencies before this step.

```
./php-code-downgrade ../hook
```

**5.** Try to run hook test suite, and fix manually the reference errors:

```
make test
```

**Common problems:**

**Traits**: Injected trait code may loose reference to it's `use` definitions.
Fill the complete class path for those cases.

`class_uses` not implemented: Since PHP5.3 don't have support for traits, any
algorithm that relies on `class_uses` are useless. Replace it by `array()` and
should be good.

**Typehint**: Remove `callable` typehint from parameter definitions.

**Closures**: PHP5.3 needs to use `$that` reference to access the previous scope
inside closures. Any method called from `$that` inside the closure must be
defined as `public`.

**6.** Deploy it at your own risk
