const AsyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn;
  } catch (err) {
    next(new CustomError(err.message, err.statusCode, err.details));
  }
};
export default AsyncHandler;
