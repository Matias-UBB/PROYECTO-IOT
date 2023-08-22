import axios from "axios";
import { Card, CardFooter, Flex, Heading, Text, Button, Box, CardHeader, CardBody} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import ModalVerExperimento from "@/components/Experimentos/VerExperimento";
import ModalCreateExperimento from "@/components/Experimentos/ModalCreateExperimento";
import { Icon } from '@chakra-ui/react'
import { DeleteIcon, ViewIcon, EditIcon , ExternalLinkIcon } from '@chakra-ui/icons'
import { Link } from "@chakra-ui/next-js";
import { formatDate } from "@/utils/formatDate";



const MisExperimentos = () => {
    //Funcion listar experimentos
    const [experiments, setExperiments] = useState([]);
    const { data: session, status } = useSession();
    const router = useRouter();


    const getExperiments = async () => {
        try {
            const response = await axios.get(`api/experimentos/getExperimentosByUser/${session.user.id}`);
            setExperiments(response.data);
        } catch (error) {
            console.error("Error al obtener la lista de experimentos:", error);
        }
    }


    useEffect(() => {
        if (status==="loading") {
            console.log("Cargando");
        }else if(!session){
            router.push("/login");
        }else{
            getExperiments();
        }

    },[session,router]);
    //Boton crear experimento
    const [isOpenModalCreateExperimento, setIsOpenModalCreateExperimento] = useState(false);
    const handleOpenModalCreateExperimento =()=> setIsOpenModalCreateExperimento(true);
    const handleCloseModalCreateExperimento =()=> setIsOpenModalCreateExperimento(false);

    const addExperimentToList = (newExperimento) => {
        setExperiments((prevExperiments) => [...prevExperiments, newExperimento]);
    };
    
   // Boton eliminar experimento
    const handleDelete = async (id) => {
        try {
            const res= await axios.delete("/api/experimentos/delete",
            {
                data: {
                    expId: id,
                    userId: session.user.id
                }
            }
            );
            if(res.status===200){
                deleteExperimentFromList(id);
            }
        } catch (error) {
            console.error("Error al eliminar el experimento:", error);
        }
    };
    const deleteExperimentFromList = (id) => {
        setExperiments((prevExperiments) => prevExperiments.filter((experiment) => experiment._id !== id));
    };

    // Ver experimento
    const [isOpenModalVerExperimento, setIsOpenModalVerExperimento] = useState(false);
    const handleOpenModalVerExperimento =(id)=> {
        setSelectedExperimentId(id);
        setIsOpenModalVerExperimento(true)
    };
    const handleCloseModalVerExperimento =()=> {
        setIsOpenModalVerExperimento(false)
        setSelectedExperimentId("");
    };
    const [selectedExperimentId, setSelectedExperimentId] = useState("");






    return (
        <Flex direction="column" align="center" justify="center" p={4}>
        <Heading as="h2" size="lg" mb={4}>
            Lista de Experimentos
        </Heading>
        <Box p={4}>
            <Button colorScheme="blue" onClick={handleOpenModalCreateExperimento}>
                Crear Experimento
            </Button>
        </Box>
        {
        experiments.length === 0 ? (
            <Text fontSize="md">No hay experimentos</Text>
        ) : (experiments.map((experiment) => (
            <Card key={experiment._id} mb={3} p={2} w="50%" size='sm' >
                <CardHeader  size="sm" mb={0} align="center" >
                    <Heading size="sm">{experiment.nombre}</Heading>
                </CardHeader>
                <CardBody>
                    <Box mb={2} py={0} fontSize="xs" fontWeight="bold">
                        <Text mb={2} py={0} fontSize="xs" color="green.500">ID: {experiment._id}</Text>
                    </Box>
                    <Text mb={2} py={0} fontSize="md">{experiment.descripcion}</Text>
                    <Text mb={2} py={0}  fontSize="x-small" >{formatDate(new Date (experiment.fecha_inicio))}</Text>
                </CardBody>
                <CardFooter>
                    <Button colorScheme="blue" mr={3}>
                        <Icon as={EditIcon} w={4} h={4} />
                    </Button>
                    <Button colorScheme="red" mr={3} onClick={() => handleDelete(experiment._id)}>
                        <Icon as={DeleteIcon} w={4} h={4} />
                    </Button>
                    <Button colorScheme="green" mr={3} onClick={() => handleOpenModalVerExperimento(experiment._id)} >
                        <Icon as={ViewIcon} w={4} h={4} />
                    </Button>
                    <Button colorScheme="blue" mr={3}>
                        <Link href={`/grafico/${experiment._id}`}>
                            <Icon as={ExternalLinkIcon} w={4} h={4} />
                        </Link>
                    </Button>

                </CardFooter>
            </Card>
        )))}
        <ModalCreateExperimento isOpen={isOpenModalCreateExperimento} onClose={handleCloseModalCreateExperimento} addExperimentToList={addExperimentToList}/>
        {selectedExperimentId && (
           <ModalVerExperimento isOpen={isOpenModalVerExperimento} onClose={handleCloseModalVerExperimento} experimentId={selectedExperimentId} />
        )}
    </Flex>
    )

}
export default MisExperimentos;