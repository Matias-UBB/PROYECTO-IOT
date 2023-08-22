//components/RegisterForm.js


import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { hashPassword } from "../../utils/auth";

const RegisterForm = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        const hashedPassword = await hashPassword(data.password);
        try {
            await axios.post('/api/auth/register', {
                nombre: data.nombre,
                apellido: data.apellido,
                rut: data.rut,
                email: data.email,
                password: hashedPassword,
            });
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Box color="black.100" width="100%" maxWidth="500px" margin="auto">
            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={6}>
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input type="nombre" {...register("nombre", { required: true })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Apellido</FormLabel>
                    <Input type="apellido" {...register("apellido", { required: true })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Rut</FormLabel>
                    <Input type="rut" {...register("rut", { required: true })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" {...register("email", { required: true })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Cotraseña</FormLabel>
                    <Input type="password" {...register("password", { required: true })} />
                </FormControl>
                <Button
                    type="submit"
                    bg="blue.400"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                >
                    Registrar
                </Button>
            </VStack>
        </Box>
    );
};

export default RegisterForm;
