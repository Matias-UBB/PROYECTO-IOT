import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Spinner, Box, Input} from "@chakra-ui/react";
import { Wrap, WrapItem, VStack} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Icon } from '@chakra-ui/react'
import{AddIcon} from '@chakra-ui/icons'
import { useForm } from "react-hook-form";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import {DeleteIcon} from '@chakra-ui/icons'
import { formatDate } from "@/utils/formatDate";



const VerExperimento = ({ isOpen, onClose, experimentId }) => {
   const [experiment, setExperiment] = useState(null);
    const { register, handleSubmit, reset } = useForm();


    useEffect(() => {
        getExperiment();
    },[]);

   const getExperiment = async () => {
        try {
            const response = await axios.get(`api/experimentos/getOne/${experimentId}`);
            setExperiment(response.data);
        } catch (error) {
            console.error("error al obtener el experimento ", error);
        }
    }
    const onSubmit = async (data) => {
        try {
            const newExperimento=await axios.post(`api/experimentos/compartir`, {
                experimentId: experimentId,
                email: data.email,
            });
            if(newExperimento.status===200){
               getExperiment();
                reset();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res= await axios.delete("/api/experimentos/noCompartir",
            {
                data: {
                    expId: experimentId,
                    userId: id
                }
            });
            if(res.status===200){
                setExperiment(prevExperiment=>({
                    ...prevExperiment,
                    compartidoConusuarios: prevExperiment.compartidoConusuarios.filter(usuario=>usuario._id!==id)
                }));

            }

        }catch (error) {
            console.error("Error al eliminar el experimento:", error);
        }
    };

 


   

    return (
        <>
         <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                {experiment ? (
                    <>
                        <ModalHeader>
                            <Text>{experiment.nombre}</Text>
                            <Text>{experiment.estado}</Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>{experiment.descripcion}</Text>
                            <Text>{formatDate(new Date(experiment.fecha_inicio))}</Text>
                            {experiment.compartidoConusuarios.length === 0 ? (
                                <Text>No compartido con nadie</Text>
                            ) : (
                                <>
                                    <Table variant="striped" size="sm">
                                        <Tbody size="sm">
                                        {experiment.compartidoConusuarios.map((usuario) => (
                                            <Tr key={usuario._id}>
                                            <Td>{usuario.email}</Td>
                                            <Td>
                                                <Button colorScheme="red" variant="outline" size="sm" _hover={{bg:"white"}} onClick={()=>handleDelete(usuario._id)}>
                                                    <Icon as={DeleteIcon} />
                                                </Button>
                                            </Td>
                                            </Tr>
                                        ))}
                                        </Tbody>
                                    </Table>
                                </>
                            )}
                            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={6}>
                                <Wrap direction={{ base: "column", md: "row" }} spacing={2} mt={4} mb={4} align="center">
                                        <WrapItem>
                                            <Input type="email" placeholder="email@example.com" {...register("email",{required:true})}/>
                                        </WrapItem>
                                        <WrapItem>
                                            <Button  type="submit" _hover={{ bg: "green.500" }  }>
                                                <Icon as={AddIcon} />
                                            </Button>
                                        </WrapItem>
                                </Wrap>
                            </VStack>
                        </ModalBody>
                    </>
                ) : (
                    <Box textAlign="center" >
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                         />
                    </Box>
                )}
                <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Cerrar
                </Button>
                </ModalFooter>
            </ModalContent>
         </Modal>
        </>
    );


}

export default VerExperimento;