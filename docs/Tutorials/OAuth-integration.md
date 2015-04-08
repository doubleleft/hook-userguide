```yaml
# hook-ext/config.yaml
oauth:
  Twitter:
    key: 'twitter_key'
    secret: 'twitter_secret'
  Facebook:
    app_id: 'facebook_app_id'
    app_secret: 'facebook_app_secret'
  Google:
    client_id: 'google_client_id'
    client_secret: 'google_client_secret'
```

```yaml
# hook-ext/packages.yaml
opauth/opauth: "dev-master"
opauth/twitter: "dev-master"
opauth/facebook: "dev-master"
opauth/google: "dev-master"
```

```bash
hook deploy
```

Require the [OAuth plugin](https://github.com/doubleleft/hook-javascript/blob/master/src/plugins/oauth.js) in your webapp and use the following code to login:

```javascript
var hook = new Hook.Client({...});
hook.oauth.popup('facebook').then(function(data) {
  console.log("Logged in:", data.first_name);
}).otherwise(function(error){
  console.log("Error", error);
});
```