import React from "react";
import { Box, Heading, Table, Thead, Tr, Th, Tbody, Td, Input } from "@chakra-ui/react";

const DiscountSettings = () => {
  const discountProducts = [
    { code: "SDJ001", name: "SANDJAYA", discount: 10 },
    { code: "SHZ001", name: "SHANZY MANGGA", discount: 5 },
    { code: "SHZ002", name: "SHANZY ANGGUR", discount: 7 },
    { code: "SHZ003", name: "SHANZY THE", discount: 4 },
    { code: "BNK001", name: "BANGKITO", discount: 6 },
    { code: "GTR001", name: "GANTARI", discount: 8 },
  ];

  return (
    <Box mb="6">
      <Heading size="md" mb="4">Pengaturan Diskon Produk</Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Kode</Th>
            <Th>Nama Produk</Th>
            <Th>Diskon (%)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {discountProducts.map((item) => (
            <Tr key={item.code}>
              <Td>{item.code}</Td>
              <Td>{item.name}</Td>
              <Td>
                <Input
                  type="number"
                  defaultValue={item.discount}
                  size="sm"
                  width="80px"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DiscountSettings;
