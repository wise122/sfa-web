import React, { useState, useEffect } from 'react';
import {
  Box, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure, Input, FormControl,
  FormLabel, VStack, Select, useToast
} from '@chakra-ui/react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newUser, setNewUser] = useState({
    user_id: '',
    name: '',
    segment: 'ADMIN',
    nik: '',
    alamat: '',
    ttl: '',
    email: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://sal.notespad.xyz/api/auth/users');
      const filtered = (res.data || []).filter(
        (u) => (u.segment || '').toUpperCase() === 'ADMIN' || (u.segment || '').toUpperCase() === 'SUPER ADMIN'
      );
      setUsers(filtered);
    } catch (err) {
      console.error('Gagal fetch users:', err);
      toast({
        title: 'Gagal ambil data',
        description: 'Tidak dapat memuat data admin',
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
        call: 0,
        totalSales: 0,
      });

      toast({
        title: 'Admin berhasil ditambahkan',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
      setNewUser({
        user_id: '',
        name: '',
        segment: 'ADMIN',
        nik: '',
        alamat: '',
        ttl: '',
        email: '',
      });
      fetchUsers();
    } catch (err) {
      console.error('Gagal tambah admin:', err);
      toast({
        title: 'Gagal tambah admin',
        description: 'Terjadi kesalahan saat menambah data',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
              <Th color="white" textAlign="center">User ID</Th>
              <Th color="white" textAlign="center">Nama</Th>
              <Th color="white" textAlign="center">Segment</Th>
              <Th color="white" textAlign="center">Email</Th>
              <Th color="white" textAlign="center">NIK</Th>
              <Th color="white" textAlign="center">Alamat</Th>
              <Th color="white" textAlign="center">TTL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={index}>
                <Td textAlign="center">{user.user_id}</Td>
                <Td textAlign="center">{user.name}</Td>
                <Td textAlign="center">{user.segment}</Td>
                <Td textAlign="center">{user.email}</Td>
                <Td textAlign="center">{user.nik}</Td>
                <Td textAlign="center">{user.alamat}</Td>
                <Td textAlign="center">{user.ttl}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal Tambah Admin */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Admin / Super Admin</ModalHeader>
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
              <FormControl isRequired>
                <FormLabel>Segment</FormLabel>
                <Select name="segment" value={newUser.segment} onChange={handleInputChange}>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER ADMIN">Super Admin</option>
                </Select>
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

export default AdminPage;
