import React, { ReactNode } from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <Container maxW="md" py={12}>
      <Box boxShadow="lg" p={8} rounded="md" bg="white">
        <VStack gap={6}>
          <Heading textAlign="center" size="xl">
            {title}
          </Heading>
          {subtitle && (
            <Text textAlign="center" color="gray.600">
              {subtitle}
            </Text>
          )}
          {children}
        </VStack>
      </Box>
    </Container>
  );
};
