import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Heading } from "@chakra-ui/react";

const ProductTable = () => {
  return (
    <Box mb="6">
      <Heading size="md" mb="4">Data Produk</Heading>
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Kode Produk</Th>
            <Th>Nama Produk</Th>
            <Th>HPP</Th>
            <Th>Stok Awal (SAT)</Th>
            <Th>Stok Awal (SAS)</Th>
            <Th>Harga Retail</Th>
            <Th>Harga WS</Th>
            <Th>Harga Agen</Th>
            <Th>Stok Akhir (SAS)</Th>
            <Th>Total Stok Akhir</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Map data di sini */}
          <Tr>
            <Td>SHZ001</Td>
            <Td>SHANZY MANGGA</Td>
            <Td>5000</Td>
            <Td>100</Td>
            <Td>50</Td>
            <Td>6000</Td>
            <Td>5800</Td>
            <Td>5600</Td>
            <Td>30</Td>
            <Td>80</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductTable;
