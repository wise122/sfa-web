import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';

const ProgramSettingPage = () => {
  const [discounts, setDiscounts] = useState([
    { product: 'SANDJAYA', amount: 5000 },
    { product: 'SHNANZY MANGGA', amount: 3000 },
  ]);

  const [bonuses, setBonuses] = useState([
    'SHANZY MANGGA - 1 botol gratis setiap 10',
    'BANGKITO - beli 2 gratis 1',
  ]);

  const [newProduct, setNewProduct] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const [newBonus, setNewBonus] = useState('');

  const [editingDiscountIndex, setEditingDiscountIndex] = useState(null);
  const [editProduct, setEditProduct] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const [editingBonusIndex, setEditingBonusIndex] = useState(null);
  const [editBonusText, setEditBonusText] = useState('');

  const handleAddDiscount = () => {
    if (newProduct.trim() && newAmount.trim()) {
      setDiscounts([...discounts, {
        product: newProduct.trim(),
        amount: parseInt(newAmount),
      }]);
      setNewProduct('');
      setNewAmount('');
    }
  };

  const handleAddBonus = () => {
    if (newBonus.trim()) {
      setBonuses([...bonuses, newBonus.trim()]);
      setNewBonus('');
    }
  };

  const handleEditDiscount = (index) => {
    const item = discounts[index];
    setEditProduct(item.product);
    setEditAmount(item.amount.toString());
    setEditingDiscountIndex(index);
  };

  const handleSaveDiscount = () => {
    const updated = [...discounts];
    updated[editingDiscountIndex] = {
      product: editProduct.trim(),
      amount: parseInt(editAmount),
    };
    setDiscounts(updated);
    setEditingDiscountIndex(null);
    setEditProduct('');
    setEditAmount('');
  };

  const handleDeleteDiscount = (index) => {
    const updated = discounts.filter((_, i) => i !== index);
    setDiscounts(updated);
  };

  const handleEditBonus = (index) => {
    setEditBonusText(bonuses[index]);
    setEditingBonusIndex(index);
  };

  const handleSaveBonus = () => {
    const updated = [...bonuses];
    updated[editingBonusIndex] = editBonusText.trim();
    setBonuses(updated);
    setEditingBonusIndex(null);
    setEditBonusText('');
  };

  const handleDeleteBonus = (index) => {
    const updated = bonuses.filter((_, i) => i !== index);
    setBonuses(updated);
  };

  return (
    <Container maxW="container.md" py={6}>
      <Heading size="lg" mb={4}>Setting Program Berjalan</Heading>

      {/* Diskon Harga Section */}
      <Box mb={6}>
        <Heading size="md" mb={2}>1. Diskon Harga Barang</Heading>
        <VStack align="start" spacing={3} border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {discounts.map((item, index) => (
            <HStack key={index} w="full" justify="space-between">
              {editingDiscountIndex === index ? (
                <>
                  <Input
                    placeholder="Produk"
                    value={editProduct}
                    onChange={(e) => setEditProduct(e.target.value)}
                    size="sm"
                    flex="1"
                  />
                  <Input
                    placeholder="Rp"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    size="sm"
                    width="120px"
                    type="number"
                  />
                  <IconButton
                    aria-label="Simpan"
                    icon={<CheckIcon />}
                    size="sm"
                    onClick={handleSaveDiscount}
                  />
                </>
              ) : (
                <>
                  <Text>{item.product} - Diskon Rp{item.amount.toLocaleString()}</Text>
                  <HStack spacing={1}>
                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Edit"
                      size="sm"
                      onClick={() => handleEditDiscount(index)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Hapus"
                      size="sm"
                      onClick={() => handleDeleteDiscount(index)}
                    />
                  </HStack>
                </>
              )}
            </HStack>
          ))}
          <HStack w="full">
            <Input
              placeholder="Nama produk"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              size="sm"
              flex="1"
            />
            <Input
              placeholder="Diskon (Rp)"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              size="sm"
              width="150px"
              type="number"
            />
            <Button onClick={handleAddDiscount} size="sm" leftIcon={<AddIcon />}>
              Tambah
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Bonus Produk Section */}
      <Box>
        <Heading size="md" mb={2}>2. Bonus Produk</Heading>
        <VStack align="start" spacing={3} border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {bonuses.map((item, index) => (
            <HStack key={index} w="full" justify="space-between">
              {editingBonusIndex === index ? (
                <>
                  <Input
                    value={editBonusText}
                    onChange={(e) => setEditBonusText(e.target.value)}
                    size="sm"
                    flex="1"
                  />
                  <IconButton
                    aria-label="Simpan"
                    icon={<CheckIcon />}
                    size="sm"
                    onClick={handleSaveBonus}
                  />
                </>
              ) : (
                <>
                  <Text>{item}</Text>
                  <HStack spacing={1}>
                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Edit"
                      size="sm"
                      onClick={() => handleEditBonus(index)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Hapus"
                      size="sm"
                      onClick={() => handleDeleteBonus(index)}
                    />
                  </HStack>
                </>
              )}
            </HStack>
          ))}
          <HStack w="full">
            <Input
              placeholder="Tambah bonus produk..."
              value={newBonus}
              onChange={(e) => setNewBonus(e.target.value)}
              size="sm"
              flex="1"
            />
            <Button onClick={handleAddBonus} size="sm" leftIcon={<AddIcon />}>
              Tambah
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default ProgramSettingPage;
