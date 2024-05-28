// Functional
const customError = (status, message) => {
    let error = new Error();
    error.statusCode = status || 500;
    error.message = message || 'Something went wrong';
    return error;
};


export { customError }