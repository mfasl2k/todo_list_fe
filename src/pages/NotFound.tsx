import React from "react";
import { Heading, Text, Button, Center, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Center h="100vh">
      <VStack gap={6}>
        <Heading size="2xl">404</Heading>
        <Text fontSize="xl">Page not found</Text>
        <Text color="gray.600">The page you're looking for doesn't exist.</Text>
        <Button colorScheme="blue" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </VStack>
    </Center>
  );
};

export default NotFound;
