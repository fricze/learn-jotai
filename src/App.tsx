import {
    atom,
    useAtom,
    PrimitiveAtom,
} from "jotai";
import { useAtomsDebugValue, useAtomsDevtools } from 'jotai/devtools'
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { registerAtom } from "models/user";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "@fontsource/roboto/400.css";
import { useDispatch } from "react-redux";
import { setEmail, setPassword } from "reducer";
import { useSelector } from "store";
import { Suspense } from "react";
import { isEmailValid, isPasswordValid } from "selectors/user";

const emailAtom = atom("john@email.com");
const passwordAtom = atom("");

const isEmailValidAtom = atom((get) => get(emailAtom).length >= 3);
const isPasswordValidAtom = atom((get) => get(passwordAtom).length >= 3);

const isFormValid = atom((get) => get(isEmailValidAtom) && get(isPasswordValidAtom));

interface InputProps {
    label: string;
    type?: string;
    sourceAtom: PrimitiveAtom<string>;
}

interface MultiInputProps {
    label: string;
    type?: string;
    text: string;
    setText: (v: string) => void;
}

const Input = ({ type = "text", label, sourceAtom }: InputProps) => {
    const [text, setText] = useAtom(sourceAtom);
    return (
        <TextField
            type={type}
            label={label}
            variant="filled"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
    );
};

const MultiInput = ({ type = "text", label, text, setText }: MultiInputProps) => {
    return (
        <TextField
            type={type}
            label={label}
            variant="filled"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
    );
};

interface ErrorValueProps {
    errorInfo: string;
}

const ErrorValue = ({ errorInfo }: ErrorValueProps) => {
    return <div style={{ color: "red" }}>{errorInfo}</div>;
};

const SubmitButton = () => {
    const register = useUpdateAtom(registerAtom);
    const email = useAtomValue(emailAtom)
    const password = useAtomValue(passwordAtom);

    const isValid = useAtomValue(isFormValid);

    return (
        <Box>
            <Button disabled={!isValid} variant="outlined"
                onClick={() => register({ email: "", password })}>
                Register
            </Button>
        </Box>
    );
};

const failedAtom = atom<number | Promise<number>>(Promise.reject("error").catch(() => 45));

const Datum = () => {
    const failed = useAtomValue(failedAtom);
    console.log(failed)

    return <div>Hello</div>
}

const Loading = () => <div>loading...</div>;

const Form = () => {
    const isEmailValid = useAtomValue(isEmailValidAtom);
    const isPasswordValid = useAtomValue(isPasswordValidAtom);

    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": { m: 2, width: "25ch" }
            }}
        >
            <Suspense fallback={<Loading />}>
                <Datum />
            </Suspense>

            <Typography variant="h3" gutterBottom>
                Registration form
            </Typography>

            <Input label="Email" sourceAtom={emailAtom} />
            <Input type="password" label="Password" sourceAtom={passwordAtom} />

            {!isEmailValid ? <ErrorValue errorInfo="Email is too short" /> : null}
            {!isPasswordValid ? <ErrorValue errorInfo="Password is too short" /> : null}

            <SubmitButton />
        </Box>
    )
};

const Inputs = () => {
    const dispatch = useDispatch()

    const onChangePassword = (password: string) => dispatch(setPassword(password))
    const onChangeEmail = (email: string) => dispatch(setEmail(email))

    const password = useSelector(state => state.user.form.password)
    const email = useSelector(state => state.user.form.email)

    const emailValid = isEmailValid(email);
    const passwordValid = isPasswordValid(password);

    return (
        <>
            <MultiInput label="Email"
                text={email}
                setText={text => onChangeEmail(text)} />
            <MultiInput type="password"
                label="Password"
                text={password}
                setText={text => onChangePassword(text)} />

            {!emailValid ? <ErrorValue errorInfo="Email is too short" /> : null}
            {!passwordValid ? <ErrorValue errorInfo="Password is too short" /> : null}
        </>
    )
};

const FormRedux = () => {
    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": { m: 2, width: "25ch" }
            }}
        >
            <Typography variant="h3" gutterBottom>
                Registration form
            </Typography>

            <Inputs />

            <SubmitButton />
        </Box>
    )
};

/* const App = () => (
 *     <FormRedux />
 * );
 *  */
const DebugAtoms = () => {
    useAtomsDebugValue()

    return null
}

const AtomsDevtools = ({ children }: { children: JSX.Element }) => {
    useAtomsDevtools('demo')
    return children
}
const App = () => {
    return (
        <div>
            <DebugAtoms />
            <AtomsDevtools>
                <Form />
            </AtomsDevtools>
        </div>
    )
};


export default App;
