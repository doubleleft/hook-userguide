# How to use

Templates may be used as email contents, or the response of [custom
routes](The-Basics/Custom-routes/). They're compiled using mustache or
handlebars syntax.

Generating a template from commandline:

```bash
hook generate:template user_signup
...
Template created at 'hook-ext/templates/user_signup.html'.
```

Consuming the template:

```php
$string = Module::template('user_signup.html')->compile(array(
  'name' => "Somebody"
));
```

# Helpers

## String helpers

| Helper | Template | Output |
|--------|----------|--------|
| str_plural | `{{ str_plural "hook" }}` | `hooks` |
| str_singular | `{{ str_singular "hooks" }}` | `hook` |
| uppercase | `{{ uppercase "hook" }}` | `HOOK` |
| lowercase | `{{ lowercase "HOOK-Platform" }}` | `hook-platform` |
| camel_case | `{{ camel_case "hook_platform" }}` | `hookPlatform` |
| snake_case | `{{ snake_case "HookPlatform" }}` | `hook_platform` |

## Miscelaneous

### config

Get a definition from `hook-ext/config.yaml`

```hbs
{{ config 'site_url' }}
```

### count

Count number of items in array.

```hbs
{{ count items }}
```

## URL helpers

### link_to

Generate a HTML link to the given URL.

```hbs
{{ link_to "about" "About page" class="featured" }}
```

### form

Generate HTML form tag.

```hbs
{{#form method="post"}}
  {{ input "username" }}
  {{ input "password" type="password" }}
{{/form}}
```

### form_for

Same as `form`. Plus generated field names will have a namespace. Example: `<input name="item[name]" />`

```hbs
{{#form_for "item"}}
  {{ input "name" }}
  {{ input type="submit" value="Create!" }}
{{/form}}
```
