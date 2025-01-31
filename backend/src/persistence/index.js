if (process.env.MYSQL_HOST) module.exports = require('./mysql');
else if (process.env.MONGO_HOST) module.exports = require('./mongodb');

else module.exports = require('./sqlite');
