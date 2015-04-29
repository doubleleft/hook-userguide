# Logging

You can log custom messages using the following commands:

```php
Logger::log("message"); // Which defaults to INFO level
Logger::debug("message");
Logger::info("message");
Logger::warn("message");
Logger::error("message");
```

All logs will be written to a text file, which you can read by running:

```
hook logs
```

You can also ask for a larger number of lines by adding an additional parameter:

```
hook logs -n 1000
```
