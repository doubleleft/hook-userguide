# message

The `Mail::message($template, $data)` creates a new Message instance, with a
template compiled as the body.

The `Message` instance provides methods to setup the email to be sent:

```php
$message = Mail::message('register_success.html', array(
  'name' => "Endel"
));
$message->subject("Successfully registered to xxxx");
$message->to("somebody@domain.com");
$message->from("no-reply@domain.com");
$message->contentType("text/html");

$success = $message->send();

if ($success) {
  debug("Mail sent successfully.");
} else {
  debug("Could not send email.");
}
```

# send

The shortest way to send an email is via `Mail::send($options)` method. You may
compile a [template](Templates) as a body of your email.

```php
$success = Mail::send(array(
  'body' => Module::template("Hey {{name}}")->compile(array("name" => "Your name")),
  'subject' => "Email subject",
  'to' => "to@domain.com",
  'from' => "from@domain.com",
  'contentType' => "text/html" // optional
));

if ($success) {
  debug("Mail sent successfully.");
} else {
  debug("Could not send email.");
}
```

# Providers

To configure the transport to deliver the email, you'll need to configure one of
the [providers](Configuration/#email-providers) available.
