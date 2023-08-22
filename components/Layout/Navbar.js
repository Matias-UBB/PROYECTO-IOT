import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import User from "@/components/Layout/User";

const Navbar = () => {

    return (
        <Flex
        bg="white"
        w="full"
        h="60px"
        px="8"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth="1px"
        borderColor="gray.100"
        >
        <Flex align="center">
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            <Text as="span" fontWeight="bold" color="blue.500">
               Experimentos
            </Text>

            </Heading>
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" w="full">
            <Box>
                 <User/>
            </Box>
        </Flex>
        </Flex>
    );

}

export default Navbar;