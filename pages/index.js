import Layout from "@/components/Auth/Layout";
import Navbar from "@/components/Layout/Navbar";
import MisExperimentos from "@/components/Experimentos/MisExperimentos";
import CompartidoConMigo from "@/components/Experimentos/CompartidoConMigo";
import { Button, Flex } from '@chakra-ui/react';
import { useState } from "react";



const List = () => {
    const [opcion, setOpcion] = useState('mis-experimentos');
  
    // Función para cambiar la opción seleccionada
    const cambiarOpcion = (nuevaOpcion) => {
      setOpcion(nuevaOpcion);
    };
  
    return (
      <Layout>
        <Navbar />
  
        <Flex justify="center" mt={4}>
          <Button
            colorScheme={opcion === 'mis-experimentos' ? 'blue' : 'gray'}
            onClick={() => cambiarOpcion('mis-experimentos')}
            mr={2}
          >
            Mis Experimentos
          </Button>
          <Button
            colorScheme={opcion === 'compartido-conmigo' ? 'blue' : 'gray'}
            onClick={() => cambiarOpcion('compartido-conmigo')}
            ml={2}
          >
            Compartido Conmigo
          </Button>
        </Flex>
  
        {opcion === 'mis-experimentos' ? <MisExperimentos /> : <CompartidoConMigo />}
      </Layout>
    );
  };
  
  export default List;
  