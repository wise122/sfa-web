import React, { useState, useEffect } from 'react';
import salesJson from '../data/sales.json';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Container,
  Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  Input, FormControl, FormLabel, VStack
} from '@chakra-ui/react';

const SalesPage = () => {
  // Saat pertama kali load, cek apakah sudah ada data di localStorage
  const initialSales = () => {
    const savedData = localStorage.getItem('salesData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return salesJson;
  };

  const [salesData, setSalesData] = useState(initialSales);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newSales, setNewSales] = useState({
    id: '', nama: '', nik: '', alamat: '', ttl: ''
  });

  // Setiap kali salesData berubah, simpan ke localStorage
  useEffect(() => {
    localStorage.setItem('salesData', JSON.stringify(salesData));
  }, [salesData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSales((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSales = () => {
    setSalesData([...salesData, newSales]);
    setNewSales({ id: '', nama: '', nik: '', alamat: '', ttl: '' });
    onClose();
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Data Karyawan - Sales</Heading>
        <Button colorScheme="blue" onClick={onOpen}>+ Tambah Sales</Button>
      </Flex>

      <Box overflowX="auto" border="1px" borderColor="gray.200" borderRadius="md">
        <Table size="md">
          <Thead bg="blue.500">
            <Tr>
              <Th color="white" textAlign="center">ID Karyawan</Th>
              <Th color="white" textAlign="center">Nama Sales</Th>
              <Th color="white" textAlign="center">NIK</Th>
              <Th color="white" textAlign="center">Alamat Sales</Th>
              <Th color="white" textAlign="center">TTL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {salesData.map((sales, index) => (
              <Tr key={index}>
                <Td textAlign="center">{sales.id}</Td>
                <Td textAlign="center">{sales.nama}</Td>
                <Td textAlign="center">{sales.nik}</Td>
                <Td textAlign="center">{sales.alamat}</Td>
                <Td textAlign="center">{sales.ttl}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal Tambah Sales */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Sales Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>ID Karyawan</FormLabel>
                <Input name="id" value={newSales.id} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nama Sales</FormLabel>
                <Input name="nama" value={newSales.nama} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>NIK</FormLabel>
                <Input name="nik" value={newSales.nik} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Alamat</FormLabel>
                <Input name="alamat" value={newSales.alamat} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>TTL</FormLabel>
                <Input name="ttl" value={newSales.ttl} onChange={handleInputChange} placeholder="YYYY-MM-DD" />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddSales}>
              Simpan
            </Button>
            <Button variant="ghost" onClick={onClose}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default SalesPage;
