**Sending emails**

```php
Mail::send(array(
  'body' => Module::template("Hey {{name}}")->compile(array("name" => "Your name")),
  'subject' => "Email subject",
  'to' => "to@domain.com",
  'from' => "from@domain.com"
));
```

**Testing SMTP**

```bash
$ hook config:set mail.driver=gmail mail.username=dl.tools.sendmail@gmail.com mail.password=VU7SOy3ne0hz
```

For configuring other providers to send email, see [Email providers](Email-providers)