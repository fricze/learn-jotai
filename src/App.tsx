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

const Form = () => {
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

            <Input label="Name" sourceAtom={nameAtom} />
            <Input type="password" label="Password" sourceAtom={passwordAtom} />

            <Error sourceAtom={isNameValid} errorInfo="Name is too short" />
            <Error sourceAtom={isPasswordValid} errorInfo="Password is too short" />

            <SubmitButton />
        </Box>
    )
};

const App = () => (
    <Form />
);

export default App;
