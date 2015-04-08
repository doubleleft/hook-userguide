Get User position on ranking
---

```javascript
var userCurrentScore = 1500;
hook.collection('users').where('score','>',userCurrentScore).count(function(position){
    console.log(position);
});
```

Get Facebook friends ranking
---

```javascript
var fql = "SELECT uid FROM user WHERE is_app_user=1 AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me())";
FB.api({method: 'fql.query', query:fql}, function(data){
    if(data == null){
        return;
    }
    var friends_ids = [];
    for(var i = 0; i<data.length; i++){
        friends_ids.push(data[i].uid);
    }
    hook.collection('auth').where('facebook_id', 'in', friends_ids).then(function(response){
        console.log(response);
    });
});
```
