import React, { useState, useEffect } from 'react';
import {
  Box, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure, Input, FormControl,
  FormLabel, VStack
} from '@chakra-ui/react';

const defaultManagementData = [
  {
    id: 'M001',
    nama: 'Andi Pratama',
    nik: '3210987654321098',
    alamat: 'Jl. Cempaka No. 8',
    ttl: '1985-03-12',
  },
  {
    id: 'M002',
    nama: 'Lina Kartika',
    nik: '4567890123456789',
    alamat: 'Jl. Anggrek No. 15',
    ttl: '1988-07-24',
  },
];

const ManagementPage = () => {
  const initialData = () => {
    const savedData = localStorage.getItem('managementData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return defaultManagementData;
  };

  const [managementData, setManagementData] = useState(initialData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newManager, setNewManager] = useState({
    id: '', nama: '', nik: '', alamat: '', ttl: ''
  });

  useEffect(() => {
    localStorage.setItem('managementData', JSON.stringify(managementData));
  }, [managementData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManager((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddManager = () => {
    setManagementData([...managementData, newManager]);
    setNewManager({ id: '', nama: '', nik: '', alamat: '', ttl: '' });
    onClose();
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Data Karyawan - Manajemen</Heading>
        <Button colorScheme="blue" onClick={onOpen}>+ Tambah Manajemen</Button>
      </Flex>

      <Box overflowX="auto" border="1px" borderColor="gray.200" borderRadius="md">
        <Table size="md">
          <Thead bg="blue.500">
            <Tr>
              <Th color="white" textAlign="center">ID Karyawan</Th>
              <Th color="white" textAlign="center">Nama</Th>
              <Th color="white" textAlign="center">NIK</Th>
              <Th color="white" textAlign="center">Alamat</Th>
              <Th color="white" textAlign="center">TTL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {managementData.map((item, index) => (
              <Tr key={index}>
                <Td textAlign="center">{item.id}</Td>
                <Td textAlign="center">{item.nama}</Td>
                <Td textAlign="center">{item.nik}</Td>
                <Td textAlign="center">{item.alamat}</Td>
                <Td textAlign="center">{item.ttl}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal Tambah Management */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Manajemen Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>ID Karyawan</FormLabel>
                <Input name="id" value={newManager.id} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nama</FormLabel>
                <Input name="nama" value={newManager.nama} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>NIK</FormLabel>
                <Input name="nik" value={newManager.nik} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Alamat</FormLabel>
                <Input name="alamat" value={newManager.alamat} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>TTL</FormLabel>
                <Input name="ttl" value={newManager.ttl} onChange={handleInputChange} placeholder="YYYY-MM-DD" />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddManager}>
              Simpan
            </Button>
            <Button variant="ghost" onClick={onClose}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ManagementPage;
