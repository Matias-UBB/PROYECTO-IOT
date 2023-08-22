import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react"

const ModalCreateExperimento = ({ isOpen, onClose , addExperimentToList }) => {
  const { handleSubmit, register, reset } = useForm();
  const { data: session } = useSession();

    const getFechaActual = () => {
      const fecha = new Date();
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const anio = fecha.getFullYear();
      const hora = fecha.getHours();
      const minutos = fecha.getMinutes();
      const segundos = fecha.getSeconds();
      const fechaActual = `${anio}/${mes}/${dia} ${hora}:${minutos}:${segundos}`;

      return fechaActual;
    };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/api/experimentos/create/${session.user.id}`, {
        nombre: data.nombre,
        descripcion: data.descripcion,
        fecha_inicio: getFechaActual(),
      });

      addExperimentToList(response.data);
      reset();
      onClose();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Experimento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input type="text" {...register("nombre")} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Descripción</FormLabel>
              <Input type="text" {...register("descripcion")} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            Crear
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateExperimento;
