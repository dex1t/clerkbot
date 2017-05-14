const Bot = require('./app/bot.js');

if (process.env.SLACK_BOT_TOKEN &&
    process.env.SLACK_APP_CLIENT_ID &&
    process.env.SLACK_APP_CLIENT_SECRET &&
    process.env.INTERCOM_ACCESS_TOKEN) {
  new Bot().run();
} else {
  console.log('Error: Specify Slack Token and Intercom Token in environment');
  process.exit(1);
}
