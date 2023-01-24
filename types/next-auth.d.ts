import { DefaultSession } from 'next-auth';

interface IMeta {
  id: string;
  isAdmin: boolean;
}
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends IMeta {}
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received
   * as a prop on the `SessionProvider` React Context
   */
  interface User extends DefaultSession['user'], IMeta {}
  interface Session {
    user: User;
  }
}
