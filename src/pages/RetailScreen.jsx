import React, { useEffect, useState } from 'react';
import {
  Box, Button, Heading, VStack, Text, Spinner, Card, CardBody, Stack, Input,
  IconButton, HStack, useDisclosure, useToast, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Link
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, SearchIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

const RetailScreen = () => {
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    owner: '',
    address: '',
    latitude: '',
    longitude: '',
    photoPath: '',
    ktpPhotoPath: '',
    segment: 'Retail'
  });

  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://sal.notespad.xyz/api/outlets?segment=Retail`);
      setOutlets(res.data);
    } catch (err) {
      console.error('Gagal load outlet:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://sal.notespad.xyz/api/outlets', formData);
      toast({ title: 'Outlet berhasil ditambahkan', status: 'success', duration: 3000, isClosable: true });
      onClose();
      fetchOutlets();
    } catch (err) {
      console.error('Gagal tambah outlet:', err);
      toast({
        title: 'Gagal tambah outlet',
        description: err.response?.data?.message || 'Terjadi kesalahan',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      toast({ title: 'Menghapus outlet...', status: 'loading', duration: 2000 });
      await axios.delete(`https://sal.notespad.xyz/api/outlets/${deleteTarget.id}`);
      toast({ title: 'Outlet berhasil dihapus', status: 'success', duration: 3000, isClosable: true });
      onDeleteClose();
      fetchOutlets();
    } catch (err) {
      console.error('Gagal hapus outlet:', err);
      toast({
        title: 'Gagal hapus outlet',
        description: err.response?.data?.message || 'Terjadi kesalahan',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const filteredOutlets = outlets.filter(outlet =>
    outlet.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedOutlets = filteredOutlets.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredOutlets.length / pageSize);

  return (
    <Box p="4" bg="gray.50" minH="100vh">
      <HStack justify="space-between" mb="4">
        <Heading size="lg">List Retail</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Tambah Outlet
        </Button>
      </HStack>

      <HStack mb="4">
        <Input
          placeholder="Cari outlet..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton icon={<SearchIcon />} aria-label="Cari" />
      </HStack>

      {loading ? (
        <Spinner />
      ) : (
        <VStack align="stretch" spacing="3">
          <AnimatePresence>
            {paginatedOutlets.map((outlet) => (
              <motion.div
                key={outlet._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
              >
                <Card
                  _hover={{ shadow: 'lg', transform: 'scale(1.02)' }}
                  transition="all 0.2s"
                  borderRadius="lg"
                  shadow="sm"
                  borderWidth="1px"
                  borderColor="gray.200"
                >
                  <CardBody>
                    <Stack spacing="2">
                      <HStack justify="space-between">
                        <Box>
                          <Text fontSize="lg" fontWeight="bold">{outlet.name}</Text>
                          <Text fontSize="sm" color="gray.600">Owner: {outlet.owner}</Text>
                          <Text fontSize="sm" color="gray.600">Alamat: {outlet.address}</Text>
                          <Text fontSize="sm" color="gray.600">Outstanding: Rp {outlet.outstanding?.toLocaleString() || '0'}</Text>
                          
                          <HStack spacing="1">
                            <Text fontSize="sm" color="gray.600">Koordinat:</Text>
                            <Link
                              href={`https://www.google.com/maps/search/?api=1&query=${outlet.latitude},${outlet.longitude}`}
                              isExternal
                              color="teal.500"
                              fontSize="sm"
                            >
                              {Number(outlet.latitude).toFixed(6)}, {Number(outlet.longitude).toFixed(6)} <ExternalLinkIcon mx="1px" />
                            </Link>
                          </HStack>
                          
                          <Text fontSize="xs" color="gray.500">Segment: {outlet.segment}</Text>
                        </Box>
                        <Stack direction="row" spacing="1">
                          <IconButton
                            icon={<EditIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            aria-label="Edit"
                            onClick={() => {
                              setFormData(outlet);
                              onOpen();
                            }}
                          />
                          <IconButton
                            icon={<DeleteIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            aria-label="Delete"
                            onClick={() => {
                              setDeleteTarget(outlet);
                              onDeleteOpen();
                            }}
                          />
                        </Stack>
                      </HStack>
                    </Stack>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {paginatedOutlets.length === 0 && (
            <Text color="gray.500">Tidak ada outlet ditemukan</Text>
          )}
        </VStack>
      )}

      {totalPages > 1 && (
        <HStack mt="4" justify="center">
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            isDisabled={currentPage === 1}
          >
            Prev
          </Button>
          <Text fontSize="sm">
            Halaman {currentPage} dari {totalPages}
          </Text>
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </HStack>
      )}

      {/* Modal tambah/edit */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{formData._id ? 'Edit Outlet' : 'Tambah Outlet'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="3">
              <Input placeholder="ID" name="id" value={formData.id} onChange={handleInputChange} />
              <Input placeholder="Nama Outlet" name="name" value={formData.name} onChange={handleInputChange} />
              <Input placeholder="Owner" name="owner" value={formData.owner} onChange={handleInputChange} />
              <Input placeholder="Alamat" name="address" value={formData.address} onChange={handleInputChange} />
              <Input placeholder="Latitude" name="latitude" value={formData.latitude} onChange={handleInputChange} />
              <Input placeholder="Longitude" name="longitude" value={formData.longitude} onChange={handleInputChange} />
              <Input placeholder="Photo URL" name="photoPath" value={formData.photoPath} onChange={handleInputChange} />
              <Input placeholder="KTP Photo URL" name="ktpPhotoPath" value={formData.ktpPhotoPath} onChange={handleInputChange} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal konfirmasi hapus */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Yakin ingin menghapus <strong>{deleteTarget?.name}</strong>?</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onDeleteClose} mr="2">Batal</Button>
            <Button colorScheme="red" onClick={handleDelete}>Hapus</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RetailScreen;
