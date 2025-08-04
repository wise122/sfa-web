import React, { useState } from 'react';
import {
  Box, Button, Input, FormControl, FormLabel,
  Heading, VStack, useToast, Flex, Text, Image
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userId || !password) {
      toast({
        title: 'Input Error',
        description: 'User ID dan Password wajib diisi.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://sal.notespad.xyz/api/auth/login', {
        user_id: userId.trim(),
        password,
      });

      if (response.data?.user) {
        const { user_id, name, segment, photoUrl } = response.data.user;

        // Cek segment
        if (!['super admin', 'admin'].includes(segment.toLowerCase())) {
          toast({
            title: 'Akses Ditolak',
            description: 'Segment Anda tidak memiliki akses ke aplikasi ini.',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }

        login({ user_id, name, segment, photoUrl });

        toast({
          title: 'Login Berhasil',
          description: `Selamat datang ${name}!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        navigate('/');
      } else {
        toast({
          title: 'Login Gagal',
          description: 'Data user tidak ditemukan.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast({
          title: 'Login Gagal',
          description: 'User ID atau Password salah.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Gagal login, periksa koneksi atau coba lagi nanti.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Flex
      w="100vw"
      minH="100dvh"
      bgGradient="linear(to-br, teal.400, teal.600)"
      justify="center"
      align="center"
      p={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        w={{ base: '100%', sm: '400px' }}
        maxW="sm"
      >
        <VStack spacing={6}>
          <Image src="/logo.png" alt="SFA Sales" boxSize="80px" />
          <Heading size="lg" color="teal.500">
            SFA Sales Login
          </Heading>

          <FormControl id="user_id" isRequired>
            <FormLabel>User ID</FormLabel>
            <Input
              type="text"
              placeholder="Masukkan User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            width="full"
            isLoading={isLoading}
            loadingText="Logging in"
            onClick={handleLogin}
            borderRadius="full"
          >
            Login
          </Button>

          <Text fontSize="sm" color="gray.500">
            © 2025 SFA Sales App
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
