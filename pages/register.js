import RegisterForm from "@/components/Auth/RegisterForm";
import Layout from "@/components/Auth/Layout";
import { Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const Register = () => {
  return (
    <Layout>
      <Flex
        w="full"
        h="100vh"
        align="center"
        justifyContent="center"
        bg="gray.100"
      >
        <Stack
          spacing={8}
          mx="auto"
          w="full"
          maxW="md"
          py={12}
          px={6}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
        >
          <Stack align="center">
            <Heading fontSize="4xl">Crear una cuenta</Heading>
            <Text fontSize="lg" color="gray.600">
              para disfrutar de todas nuestras <Text as="span" color="blue.400">funcionalidades</Text>
               ✌️
            </Text>
          </Stack>
          <RegisterForm />
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Register;
