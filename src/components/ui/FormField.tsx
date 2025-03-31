import React from "react";
import { Box, Input, InputProps, Text } from "@chakra-ui/react";

interface FormFieldProps extends InputProps {
  label: string;
  name: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  error,
  ...rest
}) => {
  return (
    <Box mb={4}>
      <label htmlFor={name}>{label}</label>
      <Input
        id={name}
        name={name}
        borderColor={error ? "red.300" : undefined}
        {...rest}
      />
      {error && (
        <Text color="red.500" fontSize="sm" mt={1}>
          {error}
        </Text>
      )}
    </Box>
  );
};
