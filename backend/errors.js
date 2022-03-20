class InvalidArgumentException extends Error {
    constructor(message) {
      super(message);
      this.name = "InvalidArgumentException";
    }
}

class NotFoundException extends Error {
    constructor(message) {
      super(message);
      this.name = "NotFoundException";
    }
}

export {InvalidArgumentException, NotFoundException};