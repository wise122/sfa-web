import React, { useEffect, useState } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Input, Button, Heading, Flex,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, useDisclosure, FormControl, FormLabel, VStack, useColorModeValue
} from '@chakra-ui/react';

const defaultProducts = [
  {
    code: 'P001',
    name: 'SANDJAYA COKLAT',
    hpp: 5000,
    stokAwalTotal: 100,
    stokAwalSales: 30,
    hargaRetail: 8000,
    hargaWS: 7500,
    hargaAgen: 7000,
    stokAkhirSales: 20,
    totalStokAkhir: 90,
  },
  {
    code: 'P002',
    name: 'SHANZY MANGGA',
    hpp: 4500,
    stokAwalTotal: 120,
    stokAwalSales: 40,
    hargaRetail: 7800,
    hargaWS: 7400,
    hargaAgen: 6900,
    stokAkhirSales: 25,
    totalStokAkhir: 95,
  },
  // Data lainnya...
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headerBg = useColorModeValue('gray.100', 'gray.700');

  const [newProduct, setNewProduct] = useState({
    code: '', name: '', hpp: '', stokAwalTotal: '', stokAwalSales: '',
    hargaRetail: '', hargaWS: '', hargaAgen: '', stokAkhirSales: '', totalStokAkhir: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(defaultProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
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
    setProducts([...products, formattedProduct]);
    setNewProduct({
      code: '', name: '', hpp: '', stokAwalTotal: '', stokAwalSales: '',
      hargaRetail: '', hargaWS: '', hargaAgen: '', stokAkhirSales: '', totalStokAkhir: ''
    });
    onClose();
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
              <Th textAlign="center">HPP</Th>
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
                <Td textAlign="center">{product.hpp.toLocaleString()}</Td>
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

      {/* Modal Tambah Produk */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Produk Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              {Object.keys(newProduct).map((key) => (
                <FormControl key={key} isRequired>
                  <FormLabel>{key.toUpperCase()}</FormLabel>
                  <Input
                    name={key}
                    value={newProduct[key]}
                    onChange={handleInputChange}
                    type={['hpp','stokAwalTotal','stokAwalSales','hargaRetail','hargaWS','hargaAgen','stokAkhirSales','totalStokAkhir'].includes(key) ? 'number' : 'text'}
                  />
                </FormControl>
              ))}
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
