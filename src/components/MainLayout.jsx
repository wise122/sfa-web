// src/components/MainLayout.jsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
