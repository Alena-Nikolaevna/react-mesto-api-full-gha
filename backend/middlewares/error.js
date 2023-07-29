const ServerError = require('../errors/ServerError'); // 500 ошибка

const errorMiddlewares = (err, req, res, next) => {
  const { statusCode = ServerError } = err;
  const message = statusCode === ServerError ? 'На сервере произошла ошибка.' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorMiddlewares;
