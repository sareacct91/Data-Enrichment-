module.exports = function errorHandler(err, req, res, next) {
  console.log('In errorHandler');
  console.error(err);

  const customError = {
    code: err.code || 500,
    message: err.message || 'Something went wrong. Try again later'
  };

  res.status(customError.code).json({ msg: customError.message });
};

