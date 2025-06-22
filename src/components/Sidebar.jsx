import React from 'react';
import { Box, VStack, Text, Icon, Link, Divider } from '@chakra-ui/react';
import {
  InfoIcon,
  StarIcon,
  AtSignIcon,
  CalendarIcon,
  ViewIcon,
  EditIcon,
  AddIcon,
  PhoneIcon,
  SettingsIcon,
  DownloadIcon,
} from '@chakra-ui/icons';

const Sidebar = () => {
  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w="240px"
      bg="gray.800"
      color="white"
      px="4"
      py="6"
      boxShadow="lg"
      overflowY="auto" // agar bisa discroll
    >
      <Text fontSize="2xl" fontWeight="bold" mb="6" textAlign="center">
        SF Web
      </Text>

      <VStack align="start" spacing={2}>
        {/* Produk */}
        <Section title="Data Produk">
          <NavItem icon={InfoIcon} label="List Produk" to="/produk" />
        </Section>

        {/* Karyawan */}
        <Section title="Data Karyawan">
          <NavItem icon={StarIcon} label="Sales" to="/sales" />
          <NavItem icon={AtSignIcon} label="Manajemen" to="/manajemen" />
          <NavItem icon={CalendarIcon} label="Admin" to="/admin" />
        </Section>

        {/* Toko */}
        <Section title="Data Toko">
          <NavItem icon={PhoneIcon} label="List Toko" to="/toko" />
        </Section>

        {/* Penjualan */}
        <Section title="Data Penjualan">
          <NavItem icon={DownloadIcon} label="Tarik Data" to="/penjualan" />
        </Section>

        {/* Setting */}
        <Section title="Program Berjalan">
          <NavItem icon={SettingsIcon} label="Setting Program" to="/setting-program" />
        </Section>
      </VStack>
    </Box>
  );
};

const Section = ({ title, children }) => (
  <>
    <Text fontSize="sm" mt="4" mb="1" color="gray.400" fontWeight="semibold">
      {title}
    </Text>
    <VStack align="start" spacing={1} w="full">
      {children}
    </VStack>
    <Divider borderColor="gray.600" my="3" />
  </>
);

const NavItem = ({ icon, label, to }) => (
  <Link
    href={to}
    display="flex"
    alignItems="center"
    px="3"
    py="2"
    w="full"
    borderRadius="md"
    _hover={{ bg: 'gray.700' }}
  >
    <Icon as={icon} boxSize="5" mr="3" />
    <Text>{label}</Text>
  </Link>
);

export default Sidebar;
