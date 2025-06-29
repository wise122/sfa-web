import React, { useEffect, useState } from 'react';
import {
  Box, Button, Heading, VStack, Text, Spinner, Card, CardBody, Stack,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  ModalCloseButton, Input, useDisclosure, useToast, Switch, HStack, Select
} from '@chakra-ui/react';
import axios from 'axios';

const BonusPage = () => {
  const [bonusList, setBonusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    segment: 'Retail',
    isActive: true
  });
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchBonus();
  }, []);

  const fetchBonus = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://sal.notespad.xyz/api/bonus');
      setBonusList(res.data);
    } catch (err) {
      console.error('Gagal load bonus:', err);
      toast({ title: 'Gagal load bonus', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        description: formData.description.trim(),
        name: formData.name.trim()
      };

      if (isEdit) {
        await axios.put(`https://sal.notespad.xyz/api/bonus/${formData.id}`, payload);
        toast({ title: 'Bonus diupdate', status: 'success', duration: 3000, isClosable: true });
      } else {
        await axios.post('https://sal.notespad.xyz/api/bonus', payload);
        toast({ title: 'Bonus ditambahkan', status: 'success', duration: 3000, isClosable: true });
      }

      onClose();
      fetchBonus();
    } catch (err) {
      console.error('Error save bonus:', err);
      toast({ title: 'Gagal simpan bonus', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus bonus ini?')) return;
    try {
      await axios.delete(`https://sal.notespad.xyz/api/bonus/${id}`);
      toast({ title: 'Bonus dihapus', status: 'success', duration: 3000, isClosable: true });
      fetchBonus();
    } catch (err) {
      console.error('Error delete:', err);
      toast({ title: 'Gagal hapus bonus', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleSwitch = async (item) => {
    try {
      const payload = {
        title: item.title,
        value: item.value,
        segment: item.segment,
        isActive: !item.isActive
      };
  
      await axios.put(`https://sal.notespad.xyz/api/bonus/${item._id}`, payload);
      fetchBonus();
      toast({ title: 'Status bonus diupdate', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      console.error('Error update status:', err);
      toast({ title: 'Gagal update status', status: 'error', duration: 3000, isClosable: true });
    }
  };
  
  

  const openEdit = (item) => {
    setFormData(item);
    setIsEdit(true);
    onOpen();
  };

  const openAdd = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      segment: 'Retail',
      isActive: true
    });
    setIsEdit(false);
    onOpen();
  };

  return (
    <Box p="4">
      <Heading mb="4">Bonus</Heading>
      <Button colorScheme="teal" mb="4" onClick={openAdd}>Tambah Bonus</Button>

      {loading ? (
        <Spinner />
      ) : (
        <VStack align="stretch" spacing="3">
          {bonusList.map((item) => (
            <Card key={item.id}>
              <CardBody>
                <Stack spacing="1">
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text fontSize="sm" color="gray.400">Segment: {item.segment}</Text>
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
                      <Button size="sm" colorScheme="red" onClick={() => handleDelete(item.id)}>Hapus</Button>
                    </HStack>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          ))}
          {bonusList.length === 0 && (
            <Text color="gray.500">Belum ada data bonus</Text>
          )}
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? 'Edit Bonus' : 'Tambah Bonus'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="3">
              <Input
                placeholder="ID Bonus"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                isDisabled={isEdit}
              />
              <Input
                placeholder="Nama Bonus"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Deskripsi (cth: Beli 1 Gratis 1)"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <Select
                name="segment"
                value={formData.segment}
                onChange={handleInputChange}
              >
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Agen">Agen</option>
              </Select>
              <HStack w="full" justify="space-between">
                <Text>Aktif</Text>
                <Switch
                  isChecked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.checked
                    }))
                  }
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

export default BonusPage;
