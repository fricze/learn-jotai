import { atom } from 'jotai'
import { login, register } from '../services/user';

interface User {
    uid: string;
    email: string;
}

export const userAtom = atom<User | null>(null);

export const authenticationErrorAtom = atom('');
export const clearAuthenticationErrorAtom = atom(null, (_, set) => set(authenticationErrorAtom, ''));

const existingEmailError = "auth/email-already-in-use";
const weakPasswordError = "auth/weak-password";

export const registerAtom = atom(
    null,
    (_, set, { email, password }) => {
        register(email, password)
            .then(({ uid, email }) => {
                set(userAtom, { uid, email: email as string })
            })
            .catch(({ code, message }) => {
                switch (code) {
                    case existingEmailError: {
                        set(authenticationErrorAtom, "User with this email already exists")
                        break;
                    }
                    case weakPasswordError: {
                        set(authenticationErrorAtom, message)
                        break;
                    }
                    default: {
                        set(authenticationErrorAtom, message)
                    }
                }
            })
    }
)

const userNotFoundError = "auth/user-not-found";
const invalidPasswordError = "auth/wrong-password";

export const loginAtom = atom(
    null,
    (_, set, { email, password }) => {
        login(email, password)
            .then(({ uid, email }) => {
                set(userAtom, { uid, email: email as string })
            })
            .catch(({ code, message }) => {
                switch (code) {
                    case userNotFoundError: {
                        set(authenticationErrorAtom, "User with given email not found")
                        break;
                    }
                    case invalidPasswordError: {
                        set(authenticationErrorAtom, "Invalid password for given email")
                        break;
                    }
                    default: {
                        set(authenticationErrorAtom, message)
                    }
                }
            })
    }
)
