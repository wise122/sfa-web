import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  Button,
  useToast,
  HStack,
} from "@chakra-ui/react";

const BonusSettings = () => {
  const toast = useToast();

  const defaultBonusProducts = [
    { code: "SDJ001", name: "SANDJAYA", bonus: "1 pcs setiap beli 10" },
    { code: "SHZ001", name: "SHANZY MANGGA", bonus: "2 pcs setiap beli 20" },
    { code: "SHZ002", name: "SHANZY ANGGUR", bonus: "1 pcs setiap beli 15" },
  ];

  const [bonusProducts, setBonusProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bonusProducts");
    if (saved) {
      setBonusProducts(JSON.parse(saved));
    } else {
      setBonusProducts(defaultBonusProducts);
    }
  }, []);

  const handleBonusChange = (index, value) => {
    const updated = [...bonusProducts];
    updated[index].bonus = value;
    setBonusProducts(updated);
  };

  const handleSaveOne = (index) => {
    const updated = [...bonusProducts];
    localStorage.setItem("bonusProducts", JSON.stringify(updated));
    toast({
      title: "Disimpan",
      description: `Skema bonus untuk ${updated[index].name} berhasil disimpan.`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleSaveAll = () => {
    localStorage.setItem("bonusProducts", JSON.stringify(bonusProducts));
    toast({
      title: "Semua Disimpan",
      description: "Seluruh pengaturan bonus telah disimpan.",
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box mb="6">
      <Heading size="md" mb="4">Pengaturan Bonus Produk</Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Kode</Th>
            <Th>Nama Produk</Th>
            <Th>Skema Bonus</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bonusProducts.map((item, index) => (
            <Tr key={item.code}>
              <Td>{item.code}</Td>
              <Td>{item.name}</Td>
              <Td>
                <Input
                  value={item.bonus}
                  size="sm"
                  onChange={(e) => handleBonusChange(index, e.target.value)}
                />
              </Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleSaveOne(index)}
                >
                  Simpan
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <HStack justify="flex-end" mt="4">
        <Button colorScheme="green" size="sm" onClick={handleSaveAll}>
          Simpan Semua
        </Button>
      </HStack>
    </Box>
  );
};

export default BonusSettings;
