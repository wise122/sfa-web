import React, { useState } from 'react';
import {
  Box, Button, Input, FormControl, FormLabel,
  Heading, VStack, useToast, Flex, Text, Image
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
        
      toast({
        title: 'Input Error',
        description: 'Email dan Password wajib diisi.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'sales@example.com' && password === '123456') {
        login(); 
        toast({
          title: 'Login Berhasil',
          description: 'Selamat datang di SFA Sales!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
      } else {
        toast({
          title: 'Login Gagal',
          description: 'Email atau password salah.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }, 1500);
  };

  return (
    <Flex
      w="100vw"
      minH="100dvh"
      bgGradient="white"
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

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="md"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="md"
            />
          </FormControl>

          <Button
            colorScheme="teal"
            width="full"
            isLoading={isLoading}
            loadingText="Logging in"
            onClick={handleLogin}
            size="md"
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
