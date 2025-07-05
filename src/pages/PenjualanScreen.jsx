import React, { useEffect, useState } from 'react';
import {
  Box, Text, Table, Thead, Tbody, Tr, Th, Td,
  Spinner, Alert, AlertIcon, Button, Divider
} from '@chakra-ui/react';
import axios from 'axios';

const PenjualanScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://sal.notespad.xyz/api/orders/');
      const data = response.data;
      if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setError('Gagal mengambil data penjualan');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Group by userName, product, outlet
  const getProductSummary = (userOrders) => {
    const productMap = {};
    userOrders.forEach((order) => {
      order.products.forEach((product) => {
        const key = `${product.name}-${order.outletId}`;
        if (!productMap[key]) {
          productMap[key] = {
            productName: product.name,
            outletId: order.outletId,
            qty: 0,
            harga: 0,
          };
        }
        productMap[key].qty += Number(product.qty);
        productMap[key].harga += Number(product.qty) * Number(product.harga);
      });
    });
    return productMap;
  };

  // CSV Export logic
  const exportCSV = () => {
    let csv = 'User,Outlet,Product,Total Qty,Total Harga\n';
    Object.entries(groupedByUser).forEach(([userName, userOrders]) => {
      const productSummary = getProductSummary(userOrders);
      Object.values(productSummary).forEach((item) => {
        csv += `"${userName}","${item.outletId}","${item.productName}",${item.qty},${item.harga}\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute('download', 'penjualan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const groupedByUser = orders.reduce((acc, order) => {
    if (!acc[order.userName]) {
      acc[order.userName] = [];
    }
    acc[order.userName].push(order);
    return acc;
  }, {});

  return (
    <Box p="6">
      <Text fontSize="2xl" mb="4" fontWeight="bold">
        Data Penjualan Per User (Summary + Export CSV)
      </Text>

      {loading && (
        <Spinner size="xl" thickness="4px" color="blue.500" />
      )}

      {error && (
        <Alert status="error" mb="4">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {!loading && !error && Object.keys(groupedByUser).length === 0 && (
        <Text>Tidak ada data penjualan.</Text>
      )}

      {!loading && !error && Object.entries(groupedByUser).map(([userName, userOrders]) => {
        const productSummary = getProductSummary(userOrders);
        return (
          <Box key={userName} mb="8">
            <Text fontSize="xl" fontWeight="bold" mb="2">
            Nama Sales: {userName}
            </Text>
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead>
                <Tr>
                  <Th>Outlet</Th>
                  <Th>Product</Th>
                  <Th isNumeric>Total Qty</Th>
                  <Th isNumeric>Total Harga</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.values(productSummary).map((item) => (
                  <Tr key={`${item.productName}-${item.outletId}`}>
                    <Td>{item.outletId}</Td>
                    <Td>{item.productName}</Td>
                    <Td isNumeric>{item.qty}</Td>
                    <Td isNumeric>{item.harga}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Divider my="4" />
          </Box>
        );
      })}

      <Button mt="4" colorScheme="blue" onClick={fetchOrders} mr="2">
        Refresh Data
      </Button>
      <Button mt="4" colorScheme="green" onClick={exportCSV}>
        Export to CSV
      </Button>
    </Box>
  );
};

export default PenjualanScreen;
