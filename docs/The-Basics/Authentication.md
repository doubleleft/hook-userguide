# Register / Login

The default way to deal with user authentication is via `register` and `login`
methods.

**Register**

Any user registration acts like a default [collection](Collections). You may
register users with as many fields and values you need.

Required fields: `email` and `password`. If they're not provided, the server
will throw a "bad request" error.

```javascript
var hook = new Hook.Client({/* browser credentials */});
hook.auth.register({
  email: "user@domain.com",
  password: "userpass",
  birthdate: "1990-05-26"
}).then(function(data) {
  console.log("Register success: ", data);
}).otherwise(function(error){
  console.log("Error", error);
});
```

If the registration fails the `otherwise` callback will be called. It happens
when the email is invalid or already exists, or the password is empty.

**Login**

Required fields: `email` and `password`.

```javascript
var hook = new Hook.Client({/* browser credentials */});
hook.auth.login({ email: "user@domain.com", password: "userpass" }).then(function(data) {
  console.log("Login success: ", data.first_name);
}).otherwise(function(error){
  console.log("Can't login: ", error);
});
```

# Custom login handler

It is possible to validate user data when checking if it is allowed to login on
your application. This is possible through `login` method on `auths` observer.

**Generate auths observer**

```bash
$ hook generate:observer auth
```

**Implement login validation**

The `login` method must return `TRUE` in order to allow to user to login
successfully.

```php
// hook-ext/observers/auths.php
class Auths {
    public function login($model) {
        return ($model->approved == true);
    }
}
```

Note that this implementation is optional. If you don't need any extra-check for
logging-in users, just don't define the `login` method on `auths` observer.

# Oauth

For Oauth integration with 3rd party services, such as Twitter, Facebook, G+,
etc. You'll need to require the [OAuth
plugin](https://github.com/doubleleft/hook-javascript/blob/master/src/plugins/oauth.js)
in your webapp.

```javascript
var hook = new Hook.Client({/* browser credentials */});
hook.oauth.popup('facebook').then(function(data) {
  console.log("Logged in:", data.first_name);
}).otherwise(function(error){
  console.log("Error", error);
});
```

**Facebook**

```yaml
# hook-ext/config.yaml
oauth:
  Facebook:
    app_id: 'facebook_app_id'
    app_secret: 'facebook_app_secret'
```

```yaml
# hook-ext/packages.yaml
opauth/opauth: "dev-master"
opauth/facebook: "dev-master"
```

```bash
hook deploy
```

**Twitter**

```yaml
# hook-ext/config.yaml
oauth:
  Twitter:
    key: 'twitter_key'
    secret: 'twitter_secret'
```

```yaml
# hook-ext/packages.yaml
opauth/opauth: "dev-master"
opauth/twitter: "dev-master"
```

```bash
hook deploy
```

**Google Plus**

```yaml
# hook-ext/config.yaml
oauth:
  Google:
    client_id: 'google_client_id'
    client_secret: 'google_client_secret'
```

```yaml
# hook-ext/packages.yaml
opauth/opauth: "dev-master"
opauth/google: "dev-master"
```

```bash
hook deploy
```
