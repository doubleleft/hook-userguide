# Introduction

hook's schema allows you to define the data-types of your fields in collections,
and assign relationships. It serves as well as a documentation of your current
database schema for everyone in the team.

**Example:**

```yaml
# hook-ext/schema.yaml
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

Every time you change the `hook-ext/schema.yaml` file, it's required to run
`deploy` command to modify it on the server.

```
hook deploy
```

# Security

As you read in [collections](Collections) documentation, the collections always
are auto-migrated when a new row is created with a field that doesn't exist in
the database.

This may speed-up your development process, but it's scary to run this way in
production. That is where `lock_attributes` come in:

```yaml
# hook-ext/schema.yaml
books:
  lock_attributes: true
  attributes:
    - ...
    - ...
```

When a collection have `lock_attributes`, any field name provided for update or
create will be ignored if it's not defined on your schema.

# Data-types

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

# Relationships

## → `belongs_to`

```yaml
books:
  relationships:
    belongs_to: author
```

```yaml
books:
  relationships:
    belongs_to:
      - author
      - publisher
```

**Complex example**

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
        collection: auth       # defaults to 'authors' collection
        foreign_key: author_id # defaults to {related}_id (author_id)
        primary_key: _id       # defaults to '_id'
        required: true         # defaults to false, since our priority is to be as free as possible
        on_delete: restrict    # 'restrict', 'cascade' or 'none' (defaults to 'none')
        on_update: cascade     # 'restrict', 'cascade' or 'none' (defaults to 'none')
```

## → `has_many`

```yaml
author:
  relationships:
    has_many: books
```

```yaml
author:
  relationships:
    has_many:
      - books
```

## → `has_one`

```yaml
author:
  relationships:
    has_one: book
```

## → `has_many_through`

```yaml
# 'books' collection
books:
 attributes:
   - name: name
     type: string

# 'book_authors' intermediary collection
book_authors:
  relationships:
    belongs_to:
      - books
      - authors

# 'authors' collection
authors:
  attributes:
    - name: name
      type: string

  relationships:
    has_many:
      - books:
          through: book_authors
          collection: books  # defaults to 'books' collection
          foreign_key: author_id # defaults to {related}_id (author_id)
          far_key: # defaults to '{relation}_id' (book_id)
          local_key: _id # defaults to _id
          required: true # defaults to false, since our priority is to be as free as possible
```
