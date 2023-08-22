//components/loginForm.js


import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: "/",
        });
    };

    return (
        <Box color="black" width="100%" maxWidth="500px" margin="auto">
            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={6}>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...register("password", { required: true })} />
                </FormControl>
                <Button
                    bg="blue.400"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                    type="submit"
                >
                    Iniciar sesión
                </Button>
            </VStack>
        </Box>
    );
};

export default LoginForm;
