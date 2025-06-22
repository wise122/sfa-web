import React, { useState, useEffect } from 'react';
import {
  Box, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure, Input, FormControl,
  FormLabel, VStack
} from '@chakra-ui/react';

const defaultAdminData = [
  {
    id: 'A001',
    nama: 'Rina Hapsari',
    nik: '5678901234567890',
    alamat: 'Jl. Melati No. 3',
    ttl: '1991-11-05',
  },
  {
    id: 'A002',
    nama: 'Dedi Saputra',
    nik: '6789012345678901',
    alamat: 'Jl. Flamboyan No. 20',
    ttl: '1989-04-17',
  },
];

const AdminPage = () => {
  const initialData = () => {
    const savedData = localStorage.getItem('adminData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return defaultAdminData;
  };

  const [adminData, setAdminData] = useState(initialData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newAdmin, setNewAdmin] = useState({
    id: '', nama: '', nik: '', alamat: '', ttl: ''
  });

  useEffect(() => {
    localStorage.setItem('adminData', JSON.stringify(adminData));
  }, [adminData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = () => {
    setAdminData([...adminData, newAdmin]);
    setNewAdmin({ id: '', nama: '', nik: '', alamat: '', ttl: '' });
    onClose();
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Data Karyawan - Admin</Heading>
        <Button colorScheme="blue" onClick={onOpen}>+ Tambah Admin</Button>
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
            {adminData.map((admin, index) => (
              <Tr key={index}>
                <Td textAlign="center">{admin.id}</Td>
                <Td textAlign="center">{admin.nama}</Td>
                <Td textAlign="center">{admin.nik}</Td>
                <Td textAlign="center">{admin.alamat}</Td>
                <Td textAlign="center">{admin.ttl}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal Tambah Admin */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Admin Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>ID Karyawan</FormLabel>
                <Input name="id" value={newAdmin.id} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nama</FormLabel>
                <Input name="nama" value={newAdmin.nama} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>NIK</FormLabel>
                <Input name="nik" value={newAdmin.nik} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Alamat</FormLabel>
                <Input name="alamat" value={newAdmin.alamat} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>TTL</FormLabel>
                <Input name="ttl" value={newAdmin.ttl} onChange={handleInputChange} placeholder="YYYY-MM-DD" />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddAdmin}>
              Simpan
            </Button>
            <Button variant="ghost" onClick={onClose}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AdminPage;
