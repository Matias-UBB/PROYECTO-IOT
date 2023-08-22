import { Box, Heading, HStack, Stack, Text, Flex } from "@chakra-ui/react";
import LoginForm from "../components/Auth/LoginForm";
import { Link } from "@chakra-ui/next-js";
import Layout from "../components/Auth/Layout";

const Login = () => {
  return (
    <Layout>
      <Box
        bg="gray.100"
        maxW="100vw"
        minH="100vh"
        p="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing="6" maxWidth="450px" width="100%">
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              color="black.100"
              size={{
                base: "xl",
                md: "sm",
              }}
            >
              Bienvenido, inicia sesión.
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="gray.600">No tienes una cuenta?</Text>
              <Link href="/register" color="blue.500">
                Registrate
              </Link>
            </HStack>
          </Stack>
          <Box
            py={{
              base: "0",
              sm: "8",
            }}
            px={{
              base: "4",
              sm: "10",
            }}
            bg="white"
            borderRadius={{
              base: "none",
              sm: "xl",
            }}
          >
            <LoginForm />
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Login;
