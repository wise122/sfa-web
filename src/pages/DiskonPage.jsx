import React, { useEffect, useState } from 'react';
import {
  Box, Button, Heading, VStack, Text, Spinner, Card, CardBody, Stack,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  ModalCloseButton, Input, useDisclosure, useToast, Switch, HStack, Select
} from '@chakra-ui/react';
import axios from 'axios';

const DiskonPage = () => {
  const [diskonList, setDiskonList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    segment: 'Retail',
    isActive: true,
    productId: '',
    id: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchDiskon();
    fetchProducts();
  }, []);

  const fetchDiskon = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://sal.notespad.xyz/api/diskon');
      setDiskonList(res.data);
    } catch (err) {
      console.error('Gagal load diskon:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://sal.notespad.xyz/api/products');
      setProductList(res.data);
    } catch (err) {
      console.error('Gagal load produk:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        title: formData.name,
        value: Number(formData.value),
        segment: formData.segment,
        isActive: formData.isActive,
        productId: formData.productId
      };

      if (isEdit) {
        await axios.put(`https://sal.notespad.xyz/api/diskon/${formData.id}`, payload);
        toast({ title: 'Diskon diperbarui', status: 'success', duration: 3000, isClosable: true });
      } else {
        await axios.post('https://sal.notespad.xyz/api/diskon', payload);
        toast({ title: 'Diskon ditambahkan', status: 'success', duration: 3000, isClosable: true });
      }
      onClose();
      fetchDiskon();
    } catch (err) {
      console.error('Error save diskon:', err);
      toast({ title: 'Gagal simpan diskon', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm('Yakin hapus diskon ini?')) return;
    try {
      await axios.delete(`https://sal.notespad.xyz/api/diskon/${_id}`);
      toast({ title: 'Diskon dihapus', status: 'success', duration: 3000, isClosable: true });
      fetchDiskon();
    } catch (err) {
      console.error('Error delete:', err);
      toast({ title: 'Gagal hapus diskon', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleSwitch = async (item) => {
    try {
      const payload = {
        title: item.title,
        value: Number(item.value),
        segment: item.segment,
        isActive: !item.isActive,
        productId: item.productId
      };
      await axios.put(`https://sal.notespad.xyz/api/diskon/${item._id}`, payload);
      fetchDiskon();
    } catch (err) {
      console.error('Error update status:', err);
    }
  };

  const openEdit = (item) => {
    setFormData({
      id: item._id,
      name: item.title,
      value: item.value,
      segment: item.segment,
      isActive: item.isActive,
      productId: item.productId || ''
    });
    setIsEdit(true);
    onOpen();
  };

  const openAdd = () => {
    setFormData({
      id: '',
      name: '',
      value: '',
      segment: 'Retail',
      isActive: true,
      productId: ''
    });
    setIsEdit(false);
    onOpen();
  };

  return (
    <Box p="4">
      <Heading mb="4">Diskon</Heading>
      <Button colorScheme="teal" mb="4" onClick={openAdd}>Tambah Diskon</Button>

      {loading ? (
        <Spinner />
      ) : (
        <VStack align="stretch" spacing="3">
          {diskonList.map((item) => (
            <Card key={item._id}>
              <CardBody>
                <Stack spacing="1">
                  <Text fontWeight="bold">{item.title} - {item.value}%</Text>
                  <Text fontSize="sm" color="gray.400">Segment: {item.segment}</Text>
                  <Text fontSize="sm" color="gray.400">Product ID: {item.productId}</Text>
                  <HStack justify="space-between" mt="2">
                    <Switch
                      isChecked={item.isActive}
                      onChange={() => handleSwitch(item)}
                      colorScheme="green"
                    >
                      Aktif
                    </Switch>
                    <HStack>
                      <Button size="sm" onClick={() => openEdit(item)}>Edit</Button>
                      <Button size="sm" colorScheme="red" onClick={() => handleDelete(item._id)}>Hapus</Button>
                    </HStack>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          ))}
          {diskonList.length === 0 && (
            <Text color="gray.500">Belum ada data diskon</Text>
          )}
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? 'Edit Diskon' : 'Tambah Diskon'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="3">
              <Input placeholder="Nama Diskon" name="name" value={formData.name} onChange={handleInputChange} />
              <Input placeholder="Nilai (%)" name="value" value={formData.value} onChange={handleInputChange} type="number" />
              <Select name="segment" value={formData.segment} onChange={handleInputChange}>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Agen">Agen</option>
              </Select>
              <Select placeholder="Pilih Produk" name="productId" value={formData.productId} onChange={handleInputChange}>
                {productList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
              <HStack w="full" justify="space-between">
                <Text>Aktif</Text>
                <Switch
                  isChecked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  colorScheme="green"
                />
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSave}>
              {isEdit ? 'Update' : 'Simpan'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DiskonPage;
