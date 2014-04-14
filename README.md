# Ping pong

A web based, multi device, classroom interaction tool.

## Development

Install pre-requisites

    npm install

Start the server

    grunt

View the site at [http://localhost:7770](http://localhost:7770), or your local (internal) ip address (useful for testing on other devices). You can also run

    grunt open

To run the site on another port, use the `port` flag eg,

    grunt --port=3000

To run the site using a different livereload port (default is `35729`), use the `lrp` flag (prevents this error: `Fatal error: Port 35729 is already in use by another process.`) eg,

    grunt --lrp=35720

## Testing

Uses [karma](http://karma-runner.github.io/) and [jasmine](http://pivotal.github.io/jasmine/).

Karma is run automatically when `grunt` is called. To run it manually

    karma start config/karma.conf.js

For continuous integration, run

    grunt ci:test

    # Or,

    npm test

## Deployment

Before being able to deploy, you will need to setup your environmnet, with

    grunt deploy:init

### Staging

The staging site is hosted on heroku: http://pebblecode-staging.herokuapp.com/

To push the master branch to staging, run:

    grunt deploy:staging

Or if you want a particular branch, run:

    grunt deploy:staging --branch branch-name

where `branch-name` is the branch you want to push.

If there are errors with the push eg, `error: failed to push some refs`, you can add the `--force` flag eg,

    grunt deploy:staging --force
