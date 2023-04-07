# Use the official RethinkDB image as the base image
FROM rethinkdb:latest

# Expose the default RethinkDB ports
EXPOSE 28015 29015 8080

# Set the RethinkDB process as the entry point
CMD ["rethinkdb", "--bind", "all"]
