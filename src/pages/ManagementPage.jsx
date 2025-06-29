import React, { useState, useEffect } from 'react';
import {
  Box, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure, Input, FormControl,
  FormLabel, VStack, useToast
} from '@chakra-ui/react';
import axios from 'axios';

const ManagementPage = () => {
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newUser, setNewUser] = useState({
    user_id: '',
    name: '',
    email: '',
    nik: '',
    alamat: '',
    ttl: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://sal.notespad.xyz/api/auth/users');
      const managementUsers = (res.data || []).filter(user => user.segment === 'MANAGEMENT');
      setUsers(managementUsers);
    } catch (err) {
      console.error('Gagal fetch users:', err);
      toast({
        title: 'Gagal fetch data',
        description: 'Tidak dapat mengambil data manajemen',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    if (!newUser.user_id || !newUser.name) {
      toast({
        title: 'Input tidak lengkap',
        description: 'User ID dan Nama wajib diisi',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post('https://sal.notespad.xyz/api/auth/users', {
        ...newUser,
        segment: 'MANAGEMENT',
        call: 0,
        totalSales: 0,
      });

      toast({
        title: 'User manajemen berhasil ditambahkan',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
      setNewUser({
        user_id: '',
        name: '',
        email: '',
        nik: '',
        alamat: '',
        ttl: '',
      });
      fetchUsers();
    } catch (err) {
      console.error('Gagal tambah user:', err);
      toast({
        title: 'Gagal tambah user',
        description: 'Terjadi kesalahan saat menambah user',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Data Karyawan - Manajemen</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          + Tambah Manajemen
        </Button>
      </Flex>

      <Box overflowX="auto" border="1px" borderColor="gray.200" borderRadius="md" shadow="sm">
        <Table size="md" variant="simple">
          <Thead bg="blue.500">
            <Tr>
              <Th color="white" textAlign="center">User ID</Th>
              <Th color="white" textAlign="center">Nama</Th>
              <Th color="white" textAlign="center">Email</Th>
              <Th color="white" textAlign="center">NIK</Th>
              <Th color="white" textAlign="center">Alamat</Th>
              <Th color="white" textAlign="center">TTL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, idx) => (
              <Tr key={idx}>
                <Td textAlign="center">{user.user_id}</Td>
                <Td textAlign="center">{user.name}</Td>
                <Td textAlign="center">{user.email}</Td>
                <Td textAlign="center">{user.nik}</Td>
                <Td textAlign="center">{user.alamat}</Td>
                <Td textAlign="center">{user.ttl}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Karyawan Manajemen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>User ID</FormLabel>
                <Input name="user_id" value={newUser.user_id} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nama</FormLabel>
                <Input name="name" value={newUser.name} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" value={newUser.email} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>NIK</FormLabel>
                <Input name="nik" value={newUser.nik} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Alamat</FormLabel>
                <Input name="alamat" value={newUser.alamat} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>TTL</FormLabel>
                <Input name="ttl" value={newUser.ttl} onChange={handleInputChange} placeholder="YYYY-MM-DD" />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddUser}>
              Simpan
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ManagementPage;
