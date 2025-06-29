import React from 'react';
import { Box, VStack, Text, Icon, Link, Divider, Button, Flex } from '@chakra-ui/react';
import {
  Download as DownloadIcon,
  LogOut as UnlockIcon,
  Settings as SettingsIcon,
  Store as StorefrontIcon,
  Users as UsersIcon,
  Briefcase as BriefcaseIcon,
  Shield as ShieldIcon,
  ShoppingBag as ShoppingBagIcon,
  Truck as TruckIcon,
  Handshake as HandshakeIcon,
  Box as BoxIcon,
  Percent as PercentIcon,
  Gift as GiftIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tokoOpen, setTokoOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex
      direction="column"
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
      overflowY="auto"
    >
      <Text fontSize="2xl" fontWeight="bold" mb="6" textAlign="center">
        SF Web
      </Text>

      <VStack align="start" spacing="2" flex="1">
        <Section title="Data Produk">
          <NavItem icon={BoxIcon} label="List Produk" to="/produk" />
        </Section>

        <Section title="Data Karyawan">
          <NavItem icon={UsersIcon} label="Sales" to="/sales" />
          <NavItem icon={BriefcaseIcon} label="Manajemen" to="/manajemen" />
          <NavItem icon={ShieldIcon} label="Admin" to="/admin" />
        </Section>

        <Section title="Data Toko">
          <Flex
            align="center"
            px="3"
            py="2"
            w="full"
            borderRadius="md"
            _hover={{ bg: 'gray.700', cursor: 'pointer' }}
            onClick={() => setTokoOpen(!tokoOpen)}
          >
            <Icon as={StorefrontIcon} boxSize="5" mr="3" />
            <Text flex="1">List Toko</Text>
            <Icon as={tokoOpen ? ChevronUp : ChevronDown} boxSize="4" />
          </Flex>
          {tokoOpen && (
            <VStack align="start" pl="6" spacing="1" w="full">
              <NavItem icon={ShoppingBagIcon} label="Retail" to="/toko/retail" small />
              <NavItem icon={TruckIcon} label="Wholesale" to="/toko/wholesale" small />
              <NavItem icon={HandshakeIcon} label="Agen" to="/toko/agen" small />
            </VStack>
          )}
        </Section>

        <Section title="Data Penjualan">
          <NavItem icon={DownloadIcon} label="Tarik Data" to="/penjualan" />
        </Section>

        <Section title="Program Berjalan">
          <NavItem icon={PercentIcon} label="Diskon" to="/program/diskon" />
          <NavItem icon={GiftIcon} label="Bonus" to="/program/bonus" />
        </Section>
      </VStack>

      <Button
        leftIcon={<Icon as={UnlockIcon} />}
        colorScheme="red"
        variant="ghost"
        width="full"
        mt="4"
        onClick={handleLogout}
        _hover={{ bg: 'gray.700' }}
      >
        Logout
      </Button>
    </Flex>
  );
};

const Section = ({ title, children }) => (
  <>
    <Text fontSize="sm" mt="4" mb="1" color="gray.400" fontWeight="semibold">
      {title}
    </Text>
    <VStack align="start" spacing="1" w="full">
      {children}
    </VStack>
    <Divider borderColor="gray.600" my="3" />
  </>
);

const NavItem = ({ icon, label, to, small = false }) => (
  <Link
    href={to}
    display="flex"
    alignItems="center"
    px={small ? '2' : '3'}
    py="2"
    w="full"
    borderRadius="md"
    _hover={{ bg: 'gray.700' }}
  >
    <Icon as={icon} boxSize={small ? '4' : '5'} mr="3" />
    <Text fontSize={small ? 'sm' : 'md'}>{label}</Text>
  </Link>
);

export default Sidebar;
