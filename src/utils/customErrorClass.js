class CustomError extends Error {
    constructor(status, message) {
        supper(message); //pass the message to the Error constructor
        this.status = status; // Set the status code
        this.name = this.costructor.name; // Set the name of the error
        Error.captureStackTrace(this, this.costructor)
    }
}

module.exports = CustomError;