import { atom } from 'jotai'
import { register } from 'services/user';

interface User {
    uid: string;
    email: string;
}

export const userAtom = atom<User | null>(null);

export const authenticationErrorAtom = atom('');
export const clearAuthenticationErrorAtom =
    atom(null, (_, set) => set(authenticationErrorAtom, ''));

const existingEmailError = "auth/email-already-in-use";
const weakPasswordError = "auth/weak-password";

export const registerAtom = atom(
    null,
    (_, set, { email, password }) => {
        register(email, password)
            .then(({ uid, email }) => {
                email = email as string;
                set(userAtom, { uid, email })
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
);
