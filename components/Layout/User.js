import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

import {
    Text,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
} from "@chakra-ui/react";



const User = () => {
    const { data: session, status } = useSession();
    return (
        <Box bg="blue.100" px="6" py="3" borderRadius="full" _hover={{ bg: "black.100", }}>
            {
                session ? (
                    <Menu>
                <MenuButton as="button">{session.user.nombre}</MenuButton>
                <MenuList color="#67686B">
                    <MenuGroup color="#000">
                        <MenuItem onClick={() => signOut({ callbackUrl: '/login' })}>Salir</MenuItem>
                    </MenuGroup>
                </MenuList>
                </Menu>
                ) : (
                    <Text>
                        cargando..
                    </Text>
                )
            }
        </Box>

    );
}

export default User;