import React from "react";
import { Box, Heading, Button, VStack } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

const DataExport = () => {
  return (
    <Box>
      <Heading size="md" mb="4">Tarik Data Penjualan & Toko</Heading>
      <VStack align="start" spacing="4">
        <Button leftIcon={<DownloadIcon />} colorScheme="blue" variant="solid">
          Download Data Penjualan
        </Button>
        <Button leftIcon={<DownloadIcon />} colorScheme="green" variant="solid">
          Download Data Toko
        </Button>
      </VStack>
    </Box>
  );
};

export default DataExport;
