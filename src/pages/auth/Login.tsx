import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, Text, Flex } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../../components/ui/FormField";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { loginSchema, LoginFormData } from "../../utils/validators";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues: LoginFormData = { username: "", password: "" };

  const handleLogin = async (values: LoginFormData) => {
    try {
      await login(values);
      toast.success("Login successful");
      navigate("/todos");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.response?.data?.non_field_errors?.[0] || "Invalid credentials"
      );
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<LoginFormData>({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: handleLogin,
    });

  return (
    <AuthLayout title="Sign In" subtitle="Access your todo list">
      <form onSubmit={handleSubmit}>
        <Stack gap={4} width="100%">
          <FormField
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Enter your username"
            error={errors.username}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />

          <Button
            colorScheme="blue"
            size="lg"
            type="submit"
            loading={isSubmitting}
            loadingText="Signing in"
            w="100%"
            mt={4}
          >
            Sign In
          </Button>
        </Stack>
      </form>

      <Flex justify="center" mt={4}>
        <Text mr={2}>Don't have an account?</Text>
        <Link to="/register" color="blue.500">
          Register
        </Link>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
