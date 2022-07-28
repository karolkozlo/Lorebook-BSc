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

class InvalidPasswordException extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidPasswordException";
  }
}

export {InvalidArgumentException, NotFoundException, InvalidPasswordException };