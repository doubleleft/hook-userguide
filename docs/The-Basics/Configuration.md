Any configuration change need your application to be deployed with the following
command:

```
hook deploy
```

# Storage providers

**Windows Azure**

Windows Azure Blob Storage config:

```yaml
storage:
  provider: windows_azure
  account: account_name
  key: secret_key_here
  container: uploads # optional
```

Add to your `hook-ext/packages.yaml`:

```yaml
microsoft/windowsazure: 0.4.0
pear-pear.php.net/mail_mime: "*"
pear-pear.php.net/http_request2: "*"
pear-pear.php.net/mail_mimedecode: "*"
```

**Amazon AWS**

Amazon Web Services - Simple Storage Service config:

```yaml
storage:
  provider: amazon_aws
  key: YOUR_AWS_KEY
  secret: YOUR_AWS_SECRET
  bucket: uploads
```

Add to your `hook-ext/packages.yaml`:

```yaml
aws/aws-php-sdk: 2.7.*
```

**Dropbox**

1. Create an [Dropbox API App](https://www.dropbox.com/developers/apps/create), with "Files and Datastores".
2. Generate your OAuth 2 access token.

```yaml
storage:
  provider: dropbox
  access_token: YOUR_ACCESS_TOKEN
```

Add to your `hook-ext/packages.yaml`:

```yaml
dropbox/dropbox-sdk: 1.1.*
```

# Email providers

You can change your email service provider at any time be editing your `hook-ext/config.yaml`'s `mail` section.

**Supported drivers:**

- `mail` (default)
- `sendmail`
- `smtp`
- `sendgrid` ([preset](https://github.com/doubleleft/hook/tree/master/src/Mailer/presets/sendgrid.php))
- `gmail` ([preset](https://github.com/doubleleft/hook/tree/master/src/Mailer/presets/gmail.php))
- `amazon_ses` ([preset](https://github.com/doubleleft/hook/tree/master/src/Mailer/presets/amazon_ses.php))

**Example with SMTP:**

```yaml
# hook-ext/config.yaml

mail:
  driver: 'smtp'
  host: 'smtp.gmail.com'
  port: 465
  encryption: 'ssl'
  username: 'your-email@gmail.com'
  password: 'your-password'
```

**Example with `amazon_ses` preset:**

```yaml
# hook-ext/config.yaml

mail:
  driver: amazon_ses
  userame: user@domain.com
  password: password123
```

**Related content:**
- [Sending mails](https://github.com/doubleleft/hook/wiki/Sending-mails)


# Composer packages

You're able to require any composer package into your project.

Edit `hook-ext/packages.yaml` and add the package name and version you need.

**Example: Captcha**

Add the external package into `hook-ext/packages.yaml`:

```yaml
# hook-ext/packages.yaml
gregwar/captcha: "dev-master"
```

Create a custom route to output captcha image::

```
$ hook generate:route catpcha
```

```php
<?php
// hook-ext/routes/get_catpcha.php
use Gregwar\Captcha\CaptchaBuilder;

/**
 * GET /captcha
 */
Router::get('/captcha', function() {
  $builder = new CaptchaBuilder;
  $builder->build();
  Response::header('Content-type', 'image/jpeg');
  return $builder->get(80);
});
```

# Security

By default, hook has minimal security checks to allow very fast development. As
you need to secure your application, some configurations will be necessary.

**allowed_origins**

A list of domains that are allowed to use JavaScript client as referrer.

```yaml
# hook-ext/security.yaml
allowed_origins:
  - 'mydomain.com'
  - 'another.domain.com'
```

**roles**

A list of available auth roles for the application. There is two built-in roles
are `all` and `owner`.

```yaml
# hook-ext/security.yaml
roles:
  - admin
```

**collections**

Which auth role can do `read`, `create`, `update` and `delete` operations. The
allowed arguments for each operations are `all`, `owner` and any roles you've
defined in the previous section.

```yaml
# hook-ext/security.yaml
collections:
  events:
    read: all     # everyone can read
    create: owner # only the owner can create
    update: owner # only the owner can update
    delete: none  # nobody can delete it.
```

When a collection operation has the `all` argument, there is no restriction to
perform it.

When a collection operation has the `owner` argument, it needs to have an
`auth_id` attribute equals to the current authenticated user.

By default, every collection have the following configuration:

```yaml
collections:
  default:
    create: 'all'
    read: 'all'
    update: 'owner'
    delete: 'owner'
```

# Task scheduler

Scheduled tasks is a way of scheduling [custom routes](Custom-routes) to be
called at a time interval.

Let's generate a schedule template:

```bash
$ hook generate:schedule
Schedule configuration created at 'hook-ext/schedule.yaml'.
```

On schedule configuration, it's possible to specify intervals such as `daily`,
`hourly`, `monthly`, `weekly`, or a raw crontab expression.

The following example configure the route `GET /update_something` to run every
day.

```yaml
# hook-ext/schedule.yaml
schedule:
  - task: update_something
    schedule: daily
```

After deployng your application, the crontab will install this configuration on
the server.

To view your raw crontab schedule, use `hook schedule`:

```
0 0 * * * curl -XGET -H 'X-App-Id: 36' -H 'X-App-Key: e12d3031809230dcb0d62086709d079e' 'http://hook.ddll.co:8280/index.php/update_something' 2>&1 /dev/null
```

**Advanced crontab expressions**

[Source](https://code.google.com/p/ncrontab/wiki/CrontabExamples)

Following are examples of crontab expressions and how they would interpreted as a recurring schedule.

```
* * * * *
```
This pattern causes a task to be launched every minute.

```
5 * * * *
```
This pattern causes a task to be launched once every hour and at the fifth minute of the hour (00:05, 01:05, 02:05 etc.).

```
* 12 * * Mon
```
This pattern causes a task to be launched every minute during the 12th hour of Monday.

```
* 12 16 * Mon
```
This pattern causes a task to be launched every minute during the 12th hour of Monday, 16th, but only if the day is the 16th of the month.

```
59 11 * * 1,2,3,4,5
```
This pattern causes a task to be launched at 11:59AM on Monday, Tuesday, Wednesday, Thursday and Friday. Every sub-pattern can contain two or more comma separated values.

```
59 11 * * 1-5
```
This pattern is equivalent to the previous one. Value ranges are admitted and defined using the minus character.

```
*/15 9-17 * * *
```
This pattern causes a task to be launched every 15 minutes between the 9th and 17th hour of the day (9:00, 9:15, 9:30, 9:45 and so on... note that the last execution will be at 17:45). The slash character can be used to identify periodic values, in the form of a/b. A sub-pattern with the slash character is satisfied when the value on the left divided by the one on the right gives an integer result (a % b == 0).

```
* 12 10-16/2 * *
```
This pattern causes a task to be launched every minute during the 12th hour of the day, but only if the day is the 10th, the 12th, the 14th or the16th of the month.

```
* 12 1-15,17,20-25 * *
```
This pattern causes a task to be launched every minute during the 12th hour of the day, but the day of the month must be between the 1st and the 15th, the 20th and the 25, or at least it must be the 17th.
