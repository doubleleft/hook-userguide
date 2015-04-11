# Introduction

hook's schema allows you to lock editing collection attributes, set relationships and define new collections.

# Collection schema

To generate a schema based on your current collections:

```
hook generate:schema
```

The file __hook-ext/schema.yaml__ will be created.

Note that Hook currently doesn't support changing property/field types.

You can push your schema changes back to the server using the deploy command:
```
hook deploy
```


**Example:**

```yaml
books:
  attributes:
    - name: name
      type: string
      required: true
    - name: price
      type: string
      index: true
    - name: discount
      type: decimal
    - name: stock
      type: text
    - name: description
      type: text
    - name: category
      type: text
    - name: isbn
      type: string
      unique: true
    - name: tag
      type: enum
      allowed: ['technology', 'science', 'it']
      default: 'science'
    - name: test
      type: decimal
      total: 10
      places: 5
      unique: ['tag', 'name']
```


Table of supported data-types:

| Data-type | Allowed attributes |
|----------|-------------|
| boolean | _none_ |
| date | _none_ |
| date_time | _none_ |
| time | _none_ |
| timestamp | _none_ |
| binary | _none_ |
| text | _none_ |
| medium_text | _none_ |
| long_text | _none_ |
| enum | allowed |
| char | length |
| string | length |
| float | total, places |
| double | total, places |
| decimal | total, places |
| integer | auto_increment, unsigned |
| big_integer | auto_increment, unsigned |
| medium_integer | auto_increment, unsigned |
| tiny_integer | auto_increment, unsigned |
| small_integer | auto_increment, unsigned |

# Collection relationships

**relation-type: string**

```yaml
books:
  relationships:
    belongs_to: author
```

**relation-type: array**

```yaml
books:
  relationships:
    belongs_to:
      - author
      - publisher
```

## Examples

```yaml
authors:
  relationships:
    has_many:
      - posts

posts:
  relationships:
    belongs_to: authors

books:
  belongs_to:
    - auths
    - author:
        collection: auth  # defaults to 'authors' collection
        foreign_key: # defaults to {related}_id (author_id)
        primary_key: # defaults to '_id'
        required: true # defaults to false, since our priority is to be as free as possible
        on_delete: restrict # 'restrict', 'cascade' or 'none' (defaults to 'none')
        on_update: cascade  # 'restrict', 'cascade' or 'none' (defaults to 'none')
```
