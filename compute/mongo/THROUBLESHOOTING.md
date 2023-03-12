# On unknown and unhandled panics

It means commonly that data is corrupted, if mongo repair did not work,
very probably data is losed and you should start from 0

# On failures

Execute `mongo --repair`

This will execute repairs over data, and next will end the service

# Version 6 does not survive to pod restart

By some reason version 6 ends in an unhandled panic (and is not recoverable,
also not with --repair)

By now version `5.0.15` is tested and works, is the unique workaround found up to date
