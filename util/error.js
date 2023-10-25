class Error {
    constructor(error) {
        this.errorObj = error;
    }
    errorHandler() {
        return this.errorObj;
    }
}

module.exports = Error;