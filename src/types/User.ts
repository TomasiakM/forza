interface User {
    _id: string;
    username: string
    password: string
}

interface TokenUser {
    id: string
}

export {
    User,
    TokenUser,
}