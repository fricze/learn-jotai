import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'

export const register = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => user)
