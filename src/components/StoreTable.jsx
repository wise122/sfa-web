import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Heading, Image } from "@chakra-ui/react";

const StoreTable = () => {
  return (
    <Box mb="6">
      <Heading size="md" mb="4">Data Toko</Heading>
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Kode</Th>
            <Th>Nama</Th>
            <Th>Alamat</Th>
            <Th>No Telp</Th>
            <Th>Koordinat</Th>
            <Th>Foto</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>TK001</Td>
            <Td>Toko Jaya</Td>
            <Td>Jl. Sukarno</Td>
            <Td>0812xxxx</Td>
            <Td>-6.2, 106.8</Td>
            <Td><Image src="https://via.placeholder.com/60" alt="Foto Toko" /></Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default StoreTable;
