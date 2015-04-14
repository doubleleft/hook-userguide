hook-userguide [![Build status](https://travis-ci.org/doubleleft/hook-userguide.svg?branch=master)](https://travis-ci.org/doubleleft/hook-userguide) [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/doubleleft/hook?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
===

User guide for [hook](https://github.com/doubleleft/hook). Built using [mkdocs](https://github.com/mkdocs/mkdocs).

Contribute!
---

All guides are written using Markdown. Feel free to edit those files here in
GitHub and submit a pull-request.

How to build
---

Install the last version of `mkdocs`. It requires Python 2.7.2.

```
pip install https://github.com/mkdocs/mkdocs/archive/master.zip
```

If you added a new page, add it to the `pages` section inside `mkdocs.yml` file.
When you're ready run the following command:

```
mkdocs build --clean
```

License
---

MIT License
