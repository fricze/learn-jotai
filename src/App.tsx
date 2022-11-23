import {
    atom,
    useAtom,
    PrimitiveAtom,
    Atom
} from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { registerAtom } from "models/user";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "@fontsource/roboto/400.css";
import { useDispatch, useSelector } from "react-redux";
import { setName, setNameAction, setPassword, setPasswordAction } from "reducer";
import { RootState } from "store";
import { Suspense } from "react";

const nameAtom = atom("John");
const passwordAtom = atom("");

const nameLengthAtom = atom((get) => get(nameAtom).length);
const passwordLengthAtom = atom((get) => get(passwordAtom).length);

const isNameValid = atom((get) => get(nameLengthAtom) >= 3);
const isPasswordValid = atom((get) => get(passwordLengthAtom) >= 3);

const isFormValid = atom((get) => get(isNameValid) && get(isPasswordValid));

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

interface ErrorProps {
    sourceAtom: Atom<boolean>;
    errorInfo: string;
}

const Error = ({ sourceAtom, errorInfo }: ErrorProps) => {
    const isValid = useAtomValue(sourceAtom);
    return isValid ? null : <div style={{ color: "red" }}>{errorInfo}</div>;
};

const SubmitButton = () => {
    const register = useUpdateAtom(registerAtom);
    const name = useAtomValue(nameAtom);
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
    const dispatch = useDispatch()

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

            <Input label="Name" sourceAtom={nameAtom} />
            <Input type="password" label="Password" sourceAtom={passwordAtom} />

            <Error sourceAtom={isNameValid} errorInfo="Name is too short" />
            <Error sourceAtom={isPasswordValid} errorInfo="Password is too short" />

            <SubmitButton />
        </Box>
    )
};

const FormRedux = () => {
    const dispatch = useDispatch()
    const number = useSelector(a => a)

    const onChangePassword = () => dispatch(setPassword(''))
    const onChangeName = () => dispatch(setName(''))

    const nameSource = useAtom(nameAtom)
    const passwordSource = useAtom(passwordAtom)

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

            <MultiInput label="Name" text={nameSource[0]} setText={nameSource[1]} />
            <MultiInput type="password" label="Password" text={passwordSource[0]} setText={passwordSource[1]} />

            <Error sourceAtom={isNameValid} errorInfo="Name is too short" />
            <Error sourceAtom={isPasswordValid} errorInfo="Password is too short" />

            <SubmitButton />
        </Box>
    )
};

const App = () => (
    <FormRedux />
);

export default App;
