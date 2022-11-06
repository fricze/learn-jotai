import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'

export const register = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => user)

export const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => user)
