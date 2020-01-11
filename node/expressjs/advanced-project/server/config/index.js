require('dotenv').config();

const path = require('path');
const bunyan = require('bunyan');

/**
 * make the logging use different log levels depending on the environment we are running in
 * In config loggers should be a function, because we want to lazy load those loggers
 *  and not instantiate all of them.
 * log level in test: only show fatal errors because otherwise
 *  it would just clutter testing results if there are many logs
 */
const loggers = {
  development: () => bunyan.createLogger({ name: 'development', level: 'debug'}),
  production: () => bunyan.createLogger({ name: 'production', level: 'info'}),
  test: () => bunyan.createLogger({ name: 'test', level: 'fatal'}),
}

module.exports = {
  development: {
    sitename: 'Roux Meetups [Development]',
    log: loggers.development,
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      avatars: path.join(__dirname, '../data/avatars'),
    },
    database: {
      dsn: process.env.DEVELOPMENT_DB_DSN,
    },
  },
  production: {
    sitename: 'Roux Meetups',
    log: loggers.production,
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      avatars: path.join(__dirname, '../data/avatars'),
    },
    database: {
      dsn: process.env.PRODUCTION_DB_DSN,
    },
  },
  test: {
    sitename: 'Roux Meetups [Test]',
    log: loggers.test,
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback-test.json'),
      avatars: path.join(__dirname, '../data/avatars/test'),
    },
    database: {
      dsn: process.env.TEST_DB_DSN,
    },
  },
};
