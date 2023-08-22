
import { Box } from "@chakra-ui/react";
export default function Layout({ children }) {
    return (
        <Box
            bg="gray.100"
            maxW="100vw"
            minH="100vh"
            p="0"
        >
            {children}
        </Box>
    )
}
