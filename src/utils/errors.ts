export class NotFoundError extends Error {
    constructor(msg: string) {
        super(msg)

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

export class InvalidError extends Error {
    constructor(msg: string) {
        super(msg)

        Object.setPrototypeOf(this, InvalidError.prototype)
    }
}

export class UnauthorizedError extends Error {
    constructor(msg: string) {
        super(msg)

        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }
}

export class TokenExpiredError extends Error {
    constructor(msg: string) {
        super(msg)

        Object.setPrototypeOf(this, TokenExpiredError.prototype)
    }
}