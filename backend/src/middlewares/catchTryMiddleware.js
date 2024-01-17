export const catchAsyncError = (passedFunction) => {
  return async (req, res, next) => {
    try {
      await Promise.resolve(passedFunction(req, res, next));
    } catch (error) {
      console.error("Error caught in catchAsyncError:", error);

      // Determine the appropriate status code based on the error
      const statusCode = error.statusCode || 500;

      // Send an appropriate response
      res.status(statusCode).json({
        success: false,
        error: error.message || "Internal Server Error",
      });
    }
  };
};
