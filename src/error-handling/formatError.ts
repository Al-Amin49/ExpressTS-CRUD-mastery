const formatError = (statusCode: number, message: string, description?: string) => ({
    success: false,
    message,
    error: {
      code: statusCode,
      description: description || message,
    },
  });
  export default formatError;