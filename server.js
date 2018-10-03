/* eslint-disable no-console */
const app = require('./app');

// start server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
