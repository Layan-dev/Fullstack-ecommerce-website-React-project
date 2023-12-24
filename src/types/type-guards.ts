import { DecodedUser } from '../redux/slices/products/usersSlice'

export function isDecodedUser(obj: unknown): obj is DecodedUser {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'role' in obj &&
    'email' in obj &&
    'userID' in obj &&
    'firstName' in obj &&
    'lastName' in obj
  )
}
