import { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material'
import { useForm } from '@tanstack/react-form'
import { client, paths } from '../api';
import { useAppStore, useSupabaseStore } from '../store';


const fieldDefinitions = [
    {
        name: "email",
        label: "Email",
        type: "email",
        // validators: {
        //     onChange: (value) => (value > 10)
        // }
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        // validators: {
        //     onChange: (value) => (value > 10)
        // }
    }
];

const employeeFieldDefinitions = [
    {
        name: "key",
        label: "Key",
        type: "number",
        // validators: {
        //     onChange: (value) => (value > 10)
        // }
    }
];

const AuthForm = (props: any) => {
    const appStore = useAppStore(); // for employee signin
    const supabaseStore = useSupabaseStore();

    const [signinType, setSigninType] = useState<"guest" | "employee">("guest");
    console.log("AuthForm: ", props)

    const onSubmit = async (values: any) => {
        console.log("onSubmit: ", values)

        // ------- Employee Signin Flow -------
        const response = (await client.post("/signin", {
            ...values.value,
            type: signinType
        })).data;

        if (response) {
            supabaseStore.setSession({
                user: {
                    id: "", 
                    email: "", 
                    ...response
                }
            });
            appStore.setActiveView("tables");
        };
        // ------- Employee Signin Flow -------


        // ------- Guest Signin Flow -------
        if (props?.handleSubmit) await props.handleSubmit(values.value);
    };

    const defaultValues = Object.assign(
        {}, 
        ...fieldDefinitions.map(({ name }) => ({ [name]: '' }))
    );

    const validators = {
        onChange: ({ value }: any) => {
            // console.log("validators.onChange: ", value)
            if (parseInt(value.age) < 21) {
                return 'Must be 21 or older to sign'
            }
            return undefined;
        },
        // onBlur: ({ value }) => {...}
    };

    const form = useForm({ defaultValues, onSubmit, validators });

    return (
        <Box
            sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                minHeight: "100vh",
                width: "100vw" 
            }}
        >
            <Box sx={{ border: "1px solid white", borderRadius: 2, p: 3, display: "block" }}>
                <Grid container
                    component={"form"}
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    {({
                        "guest": fieldDefinitions.map((field, index) => (
                            <Grid item xs={12} key={index}>
                                <form.Field name={field.name as any}>
                                    {(field) => <TextField
                                        {...field}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => field.handleChange(event.target.value)}
                                        onBlur={field.handleBlur}
                                        value={field.state.value}
                                        id={field.name}
                                        type={field.name}
                                        label={field.name}
                                        autoComplete={field.name}
                                        fullWidth
                                    /> }
                                </form.Field>
                            </Grid>
                        )),
                        "employee": employeeFieldDefinitions.map((field, index) => (
                            <Grid item xs={12} key={index}>
                                <form.Field name={
                                    "emplyoee_id"
                                }>
                                    {(field) => <TextField
                                        {...field}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => field.handleChange(event.target.value)}
                                        onBlur={field.handleBlur}
                                        value={field.state.value}
                                        id={field.name}
                                        type={"password"}
                                        label={"ID"}
                                        autoComplete={field.name}
                                        fullWidth
                                    /> }
                                </form.Field>
                            </Grid>
                        ))
                    }[signinType])}
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
                        <Box>
                            <Button variant="text" color="inherit" onClick={() => setSigninType(signinType === "guest" ? "employee" : "guest")}>{signinType === "guest" ? "Sign in as employee" : "Sign in as guest"}</Button>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button variant="outlined" color="error" onClick={() => props.handleCancel()}>Cancel</Button>
                            <Button variant="outlined" color="inherit" type="submit">Submit</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AuthForm