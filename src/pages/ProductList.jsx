import React, { useEffect, useState } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Input, Button, Heading, Flex,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, useDisclosure, FormControl, FormLabel, VStack, useColorModeValue, useToast
} from '@chakra-ui/react';
import axios from 'axios';

// Contoh segment bisa dari props / context / localStorage
const userSegment = 'ADMIN'; // ganti misal 'SUPER ADMIN' atau yang lain

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const headerBg = useColorModeValue('gray.100', 'gray.700');

  const [newProduct, setNewProduct] = useState({
    code: '', name: '', hpp: '', stokAwalTotal: '', stokAwalSales: '',
    hargaRetail: '', hargaWS: '', hargaAgen: '', stokAkhirSales: '', totalStokAkhir: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://sal.notespad.xyz/api/products');
      setProducts(res.data || []);
    } catch (err) {
      console.error('Gagal fetch produk:', err);
      toast({
        title: 'Gagal ambil data',
        description: 'Tidak dapat memuat data produk',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    const formattedProduct = {
      ...newProduct,
      hpp: parseInt(newProduct.hpp),
      stokAwalTotal: parseInt(newProduct.stokAwalTotal),
      stokAwalSales: parseInt(newProduct.stokAwalSales),
      hargaRetail: parseInt(newProduct.hargaRetail),
      hargaWS: parseInt(newProduct.hargaWS),
      hargaAgen: parseInt(newProduct.hargaAgen),
      stokAkhirSales: parseInt(newProduct.stokAkhirSales),
      totalStokAkhir: parseInt(newProduct.totalStokAkhir),
    };

    try {
      await axios.post('https://sal.notespad.xyz/api/products', formattedProduct);
      toast({
        title: 'Produk berhasil ditambahkan',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setNewProduct({
        code: '', name: '', hpp: '', stokAwalTotal: '', stokAwalSales: '',
        hargaRetail: '', hargaWS: '', hargaAgen: '', stokAkhirSales: '', totalStokAkhir: ''
      });
      fetchProducts();
    } catch (err) {
      console.error('Gagal tambah produk:', err);
      toast({
        title: 'Gagal tambah produk',
        description: 'Terjadi kesalahan saat menambah data',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Daftar Produk</Heading>
        <Button colorScheme="blue" onClick={onOpen}>+ Tambah Produk</Button>
      </Flex>

      <Input
        placeholder="Cari nama produk..."
        mb={4}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="sm"
        maxW="300px"
      />

      <Box overflowX="auto">
        <Table size="sm" variant="striped" colorScheme="gray">
          <Thead bg={headerBg}>
            <Tr>
              <Th textAlign="center">Kode</Th>
              <Th textAlign="center">Nama Produk</Th>
              {userSegment === 'SUPER ADMIN' && <Th textAlign="center">HPP</Th>}
              <Th textAlign="center">Stok Awal Total</Th>
              <Th textAlign="center">Stok Awal Sales</Th>
              <Th textAlign="center">Harga Retail</Th>
              <Th textAlign="center">Harga WS</Th>
              <Th textAlign="center">Harga Agen</Th>
              <Th textAlign="center">Stok Akhir Sales</Th>
              <Th textAlign="center">Total Stok Akhir</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredProducts.map((product, index) => (
              <Tr key={index}>
                <Td textAlign="center">{product.code}</Td>
                <Td textAlign="center">{product.name}</Td>
                {userSegment === 'SUPER ADMIN' && (
                  <Td textAlign="center">{product.hpp.toLocaleString()}</Td>
                )}
                <Td textAlign="center">{product.stokAwalTotal}</Td>
                <Td textAlign="center">{product.stokAwalSales}</Td>
                <Td textAlign="center">{product.hargaRetail.toLocaleString()}</Td>
                <Td textAlign="center">{product.hargaWS.toLocaleString()}</Td>
                <Td textAlign="center">{product.hargaAgen.toLocaleString()}</Td>
                <Td textAlign="center">{product.stokAkhirSales}</Td>
                <Td textAlign="center">{product.totalStokAkhir}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Produk Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              {Object.keys(newProduct).map((key) => {
                if (key === 'hpp' && userSegment !== 'SUPER ADMIN') {
                  return null; // sembunyikan field HPP
                }
                return (
                  <FormControl key={key} isRequired>
                    <FormLabel>{key.toUpperCase()}</FormLabel>
                    <Input
                      name={key}
                      value={newProduct[key]}
                      onChange={handleInputChange}
                      type={
                        ['hpp', 'stokAwalTotal', 'stokAwalSales', 'hargaRetail',
                        'hargaWS', 'hargaAgen', 'stokAkhirSales', 'totalStokAkhir'].includes(key) 
                        ? 'number' : 'text'
                      }
                    />
                  </FormControl>
                );
              })}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddProduct}>
              Simpan
            </Button>
            <Button variant="ghost" onClick={onClose}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductList;
