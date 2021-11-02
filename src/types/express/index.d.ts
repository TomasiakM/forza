import { TokenUser } from "../User";

declare global {
  namespace Express {
    interface Request {
      user: TokenUser
    }
  }
}