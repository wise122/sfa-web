import React, { useState, useEffect } from 'react';
import {
  Box, Container, Heading, Table, Thead, Tbody, Tr, Th, Td,
  Image, Flex, Button, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Input, FormControl, FormLabel, VStack
} from '@chakra-ui/react';

const defaultTokoData = [
  {
    kode: 'T001',
    nama: 'Toko Sejahtera',
    alamat: 'Jl. Melati No. 5',
    telp: '081234567890',
    koordinat: '-6.200000, 106.816666',
    foto: 'https://via.placeholder.com/100',
  },
  {
    kode: 'T002',
    nama: 'Toko Sumber Rezeki',
    alamat: 'Jl. Anggrek No. 12',
    telp: '081987654321',
    koordinat: '-6.201000, 106.817000',
    foto: 'https://via.placeholder.com/100',
  },
];

const ListToko = () => {
  const initialData = () => {
    const savedData = localStorage.getItem('tokoData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return defaultTokoData;
  };

  const [tokoData, setTokoData] = useState(initialData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newToko, setNewToko] = useState({
    kode: '', nama: '', alamat: '', telp: '', koordinat: '', foto: ''
  });

  useEffect(() => {
    localStorage.setItem('tokoData', JSON.stringify(tokoData));
  }, [tokoData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewToko((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToko = () => {
    setTokoData([...tokoData, newToko]);
    setNewToko({ kode: '', nama: '', alamat: '', telp: '', koordinat: '', foto: '' });
    onClose();
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Data Toko</Heading>
        <Button colorScheme="blue" onClick={onOpen}>+ Tambah Toko</Button>
      </Flex>

      <Box overflowX="auto" border="1px" borderColor="gray.200" borderRadius="md">
        <Table variant="simple" size="md">
          <Thead bg="blue.500">
            <Tr>
              <Th color="white">Kode Toko</Th>
              <Th color="white">Nama Toko</Th>
              <Th color="white">Alamat</Th>
              <Th color="white">No Telepon</Th>
              <Th color="white">Koordinat</Th>
              <Th color="white">Foto Toko</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokoData.map((toko, index) => (
              <Tr key={index}>
                <Td>{toko.kode}</Td>
                <Td>{toko.nama}</Td>
                <Td>{toko.alamat}</Td>
                <Td>{toko.telp}</Td>
                <Td>{toko.koordinat}</Td>
                <Td>
                  <Image
                    src={toko.foto}
                    alt={toko.nama}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal Tambah Toko */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Toko Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Kode Toko</FormLabel>
                <Input name="kode" value={newToko.kode} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nama Toko</FormLabel>
                <Input name="nama" value={newToko.nama} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Alamat</FormLabel>
                <Input name="alamat" value={newToko.alamat} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>No Telepon</FormLabel>
                <Input name="telp" value={newToko.telp} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Koordinat</FormLabel>
                <Input name="koordinat" value={newToko.koordinat} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Foto Toko (URL)</FormLabel>
                <Input name="foto" value={newToko.foto} onChange={handleInputChange} />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddToko}>
              Simpan
            </Button>
            <Button variant="ghost" onClick={onClose}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ListToko;
