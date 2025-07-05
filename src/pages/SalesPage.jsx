import React, { useState, useEffect } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Container,
  Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  Input, FormControl, FormLabel, VStack, Select, useToast
} from '@chakra-ui/react';
import axios from 'axios';

const SalesPage = () => {
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newUser, setNewUser] = useState({
    user_id: '',
    name: '',
    segment: 'RETAIL',
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
      const res = await axios.get('http://localhost:5000/api/auth/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Gagal fetch users:', err);
      toast({
        title: 'Gagal fetch',
        description: 'Tidak dapat mengambil data users',
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
      await axios.post('http://localhost:5000/api/auth/users', {
        ...newUser,
        call: 0,
        totalSales: 0,
      });

      toast({
        title: 'User berhasil ditambahkan',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
      setNewUser({
        user_id: '',
        name: '',
        segment: 'RETAIL',
        nik: '',
        alamat: '',
        ttl: '',
        email: '',
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
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Data Karyawan</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          + Tambah Karyawan
        </Button>
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
              <Th color="white" textAlign="center">Alamat Sales</Th>
              <Th color="white" textAlign="center">TTL</Th>
              <Th color="white" textAlign="center">Call</Th>
              <Th color="white" textAlign="center">Total Sales</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users
              .filter(user =>
                ['RETAIL', 'WHOLESALER', 'AGEN'].includes((user.segment || '').toUpperCase())
              )
              .map((user, index) => (
                <Tr key={index}>
                  <Td textAlign="center">{user.user_id}</Td>
                  <Td textAlign="center">{user.name}</Td>
                  <Td textAlign="center">{user.segment}</Td>
                  <Td textAlign="center">{user.email}</Td>
                  <Td textAlign="center">{user.nik}</Td>
                  <Td textAlign="center">{user.alamat}</Td>
                  <Td textAlign="center">{user.ttl}</Td>
                  <Td textAlign="center">{user.call}</Td>
                  <Td textAlign="center">
                    Rp {user.totalSales?.toLocaleString('id-ID') ?? '0'}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Karyawan Baru</ModalHeader>
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
                  <option value="RETAIL">Sales Retail</option>
                  <option value="WHOLESALER">Sales Wholesaler</option>
                  <option value="AGEN">Sales Agen</option>
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
                <FormLabel>Alamat Sales</FormLabel>
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

export default SalesPage;
