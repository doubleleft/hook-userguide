# Observers

When extending back-end code, it's possible to use any of the core dependencies.
Read the [API documentation](http://doubleleft.github.io/hook/) for details.

***

Events
---

Observers can listen to collection item events, such as `creating`, `created`,
`updating`, `updated`, `saving`, `saved`, `deleting` and `deleted`.

You may cancel any `*ing` event by returning false, or throwing an exception.

To demonstrate with a real-world example, let's customize our auth Collection to
allow only specific domain members to register in.

```bash
$ hook generate:observer auth
Observer created at 'hook-ext/observers/auth.php'.
```

```php
<?php
/**
 * Custom observer for: auth
 */

class Auth {
	public function creating($model) {
		if (strpos($model->email, '@doubleleft.com') === false) {
			throw new Exception("Only doubleleft.com members can register here.");
		}
	}
}
```

Let's upload the module and test what happens.

```bash
$ hook module:upload
Uploading: 'hook-ext/observers/auth.php'
```

```
$ hook console
hook: javascript> hook.auth.register({email: "endel.dreyer@gmail.com", password: "123"})
Error: Only doubleleft.com members can register here.

hook: javascript> hook.auth.register({email: "edreyer@doubleleft.com", password: "123"})
{ email: 'edreyer@doubleleft.com',
  updated_at: 1397149349,
  created_at: 1397149349,
  }
```

Custom collection item's response
---

It's possible to change the default JSON response of each collection item by
overriding the observer `toArray` method. Example:

```bash
$ hook generate:observer posts
Observer created at 'hook-ext/observers/posts.php'.
```

```php
<?php
/**
 * Custom observer for: posts
 */

class Posts {
	public function toArray($model, $array) {
		if ($model->expired) {
			return array('name' => "This item was expired.");
		} else {
			return $array;
		}
	}
}
```

Let's upload the module and test what happens.

```bash
$ hook module:upload
Uploading: 'hook-ext/observers/posts.php'
```

```
$ hook console

hook: javascript> hook.collection('posts').create({title: "Hello", expired: false})
{ title: 'Hello',
  expired: false,
  app_id: '36',
  updated_at: 1397150195,
  created_at: 1397150195,
  _id: 1380 }

hook: javascript> hook.collection('posts').create({title: "World", expired: true})
{ name: 'This item was expired.' }

hook: javascript> hook.collection('posts').then()
┌──────────────────────────┬─────────┬─────────┐
│ _id                      │ title   │ expired │
├──────────────────────────┼─────────┼─────────┤
│ '1380'                   │ 'Hello' │ '0'     │
├──────────────────────────┼─────────┼─────────┤
│ 'This item was expired.'
└──────────────────────────┴─────────┴─────────┘
```

Note that every time the JSON should be retrieved, the toArray method is called.
Even when you're creating the record.

# Querying the database

hook uses Laravel's Eloquent under the hood, so the way to build queries is
the same. The only difference on hook is that you need a Collection reference
to start querying.

## Creating

Example of creating a Collection item:

```php
$stuff = App::collection('stuff')->create(["foo" => "bar"]);
```

## Reading

Example retrieving a Collection reference:

```php
$stuff = App::collection('stuff');
```

Example of query:

```php
App::collection('stuff')
  ->where('name', '=', 'John')
  ->orWhere(function($query)
  {
      $query->where('votes', '>', 100)
            ->where('title', '<>', 'Admin');
  })
  ->get();
```

## Updating

```php
// update all items matching a filter.
// in this example "$items_updated" will receive the number of entries that has been updated.
$items_updated = App::collection('stuff')->where("prop_count" => 1)->update(["foo" => "bar"]);

// or update by _id
$items_updated = App::collection('stuff')->find(1)->update(["foo" => "bar"]);
```

## Deleting

```php
// remove all items matching a filter
$items_removed = App::collection('stuff')->where("votes", '<', 100)->remove();

// remove item by _id.
// in this example, the "stuff" item with _id=42 will be removed from the database.
App::collection('stuff')->remove(42);
```

## Continue here...
Read more: [http://laravel.com/docs/queries](http://laravel.com/docs/queries)
(Generally you're good by replacing `DB::table` to `App::collection` on Query
Builder examples.)

# Seeding collections

Seeding is the easiest way to populate your default application's data.

To generate a collection seed file, run `generate:seed {collection_name}` from
commandline.

```bash
hook generate:seed books
```

It will create a seed template at `hook-ext/seeds/books.yml`. You may
customize it for your particular setup.

The seed file consists on two different keys:
- `truncate` - Boolean - delete all your previous data if true. (optional)
- `data` - Array - list of keys and values to be inserted into the database.

```yaml
#
# Seed for books
#
truncate: true
data:
  - name: Programming PHP
    isbn: 1449392776
  - name: JavaScript: The Good Parts
    isbn: 0596517742
```

See the [YAML reference](http://www.yaml.org/start.html) if you are not familiar
with the syntax.

Let's really seed it into our database:

```bash
$ hook db:seed
...
Truncating 'books'...
Seeding 'books': 100%
Done.
```

You can open up the console from commandline to check the collection's data:

```bash
$ hook console
hook: javascript> hook.collection('books').then()
┌─────┬──────────────────────────────┬──────────────┐
│ _id │ name                         │ isbn         │
├─────┼──────────────────────────────┼──────────────┤
│ '1' │ 'Programming PHP'            │ '1449392776' │
├─────┼──────────────────────────────┼──────────────┤
│ '2' │ 'JavaScript: The Good Parts' │ '12230626'   │
└─────┴──────────────────────────────┴──────────────┘
```
