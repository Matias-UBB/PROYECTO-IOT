import axios from "axios";
import { Card, CardFooter, Flex, Heading, Text, Button, Box, CardHeader, CardBody} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Link } from "@chakra-ui/next-js";
import { Icon } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { formatDate } from "@/utils/formatDate";
const CompartidoConMigo = () => {
    const [experiments, setExperiments] = useState([]);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status==="loading") {
            console.log("Cargando");
        }else if(!session){
            router.push("/login");
        }else{

        getExperimentsShareWhitMe();
        }
    }
    ,[session,router]);

    const getExperimentsShareWhitMe = async () => {
        try {
            const response = await axios.get(`api/experimentos/getExpCompConMigo`,
            {
                params: {
                    userId: session.user.id
                }
            });

            setExperiments(response.data);
        } catch (error) {
            console.error("error al obtener el experimento ", error);
        }
    }

    useEffect(() => {
        if (status==="loading") {
            console.log("Cargando");
        }else if(!session){
            router.push("/login");
        }else{
            getExperimentsShareWhitMe();
        }

    }
    ,[]);

    return (
        <>
         <Flex direction="column" align="center" justify="center" p={4}>
        <Heading as="h2" size="lg" mb={4}>
            Lista de Experimentos Compartidos Conmigo
        </Heading>
        {
        experiments.length === 0 ? (
            <Text fontSize="md">No hay experimentos</Text>
        ) : (experiments.map((experiment) => (
            <Card key={experiment._id} mb={3} p={2} w="50%" size='sm' >
                <CardHeader  size="sm" mb={0} align="center" >
                    <Heading size="sm">{experiment.nombre}</Heading>
                </CardHeader>
                <CardBody>
                    <Text mb={2} py={0} fontSize="md">{experiment.descripcion}</Text>
                    <Text mb={2} py={0}  fontSize="x-small" >{formatDate(new Date(experiment.fecha_inicio))}</Text>
                </CardBody>
                <CardFooter>
                    <Flex justify="center">
                        <Link href={`/grafico/${experiment._id}`}>
                            <Button colorScheme="blue" mr={2} size="sm" leftIcon={<Icon as={ExternalLinkIcon} />}>
                            </Button>
                        </Link>
                    </Flex>

                </CardFooter>
            </Card>
        )))}
    </Flex>
            
    </>)
}

export default CompartidoConMigo;