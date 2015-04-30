# Custom routes

When extending back-end code, it's possible to use any of the core dependencies.
Read the [API documentation](http://doubleleft.github.io/hook/) for details.

***

Sometimes you need some extra work done in the server-side, such as scraping
websites, accessing remote API's, etc.

```bash
$ hook generate:route update_something
Route created at 'hook-ext/routes/get_update_something.php'.
```

By default, `generate:route` command will define a route using `GET` HTTP verb.
You may use another verb by providing the second argument.

To define a response, you must associate it into `$app->content` variable. It
must be an `array`, or must respond to `toArray` method. The responses of custom
routes are always in JSON format.

```php
<?php
/**
 * GET /update_something
 */
Router::get('/update_something', function()
{
    return array("hey" => "It works");
});
```

Let's upload the route and test what happens.

```bash
$ hook deploy
Uploading: 'hook-ext/routes/get_update_something.php'
```

```bash
$ hook console
hook: javascript> hook.get('update_something')
{ hey: 'It works!' }
```
