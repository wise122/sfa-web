import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Heading } from "@chakra-ui/react";

const EmployeeTable = () => {
  return (
    <Box mb="6">
      <Heading size="md" mb="4">Data Karyawan</Heading>
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nama Sales</Th>
            <Th>NIK</Th>
            <Th>Alamat</Th>
            <Th>TTL</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>SL001</Td>
            <Td>Budi</Td>
            <Td>3201xxxx</Td>
            <Td>Jl. Merdeka</Td>
            <Td>01-01-1990</Td>
            <Td>Sales</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default EmployeeTable;
