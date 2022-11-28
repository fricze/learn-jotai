import {
    atom,
    Atom
} from "jotai";

const emailAtom = atom("john@email.com");
const passwordAtom = atom("");

const derived = function <T, R>(source: Atom<T>, fn: (v: T) => R): Atom<R> { return atom((get) => fn(get(source))) };

const emailLengthAtom = atom((get) => get(emailAtom).length);
const passwordLengthAtom = derived(passwordAtom, p => p.length);

/* const isEmailValidAtom = atom((get) => get(emailLengthAtom) >= 3);
 * const isPasswordValidAtom = atom((get) => get(passwordLengthAtom) >= 3);
 *  */
