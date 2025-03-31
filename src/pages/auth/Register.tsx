import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, Text, Flex } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../../components/ui/FormField";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { registerSchema, RegisterFormData } from "../../utils/validators";

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const initialValues: RegisterFormData = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  const handleRegister = async (values: RegisterFormData) => {
    try {
      await register(values);
      toast.success(
        "Registration successful! You can now sign in with your credentials"
      );
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const responseData = error.response?.data;
      if (responseData) {
        // Handle field-specific errors from Django backend
        if (responseData.username) {
          toast.error(`Username: ${responseData.username[0]}`);
        }
        if (responseData.email) {
          toast.error(`Email: ${responseData.email[0]}`);
        }
        if (responseData.password) {
          toast.error(`Password: ${responseData.password[0]}`);
        }
        if (responseData.password2) {
          toast.error(`Password Confirmation: ${responseData.password[0]}`);
        }
        if (responseData.non_field_errors) {
          toast.error(responseData.non_field_errors[0]);
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<RegisterFormData>({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: handleRegister,
    });

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to start using our todo list app"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap={4} width="100%">
          <FormField
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Choose a username"
            error={errors.username}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Create a password"
            error={errors.password}
          />

          <FormField
            label="Confirm Password"
            name="password2"
            type="password"
            value={values.password2}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.passwordConfirmation}
          />

          <Button
            colorScheme="blue"
            size="lg"
            type="submit"
            loading={isSubmitting}
            loadingText="Creating account"
            w="100%"
            mt={4}
          >
            Sign Up
          </Button>
        </Stack>
      </form>

      <Flex justify="center" mt={4}>
        <Text mr={2}>Already have an account?</Text>
        <Link to="/login" color="blue.500">
          Sign In
        </Link>
      </Flex>
    </AuthLayout>
  );
};

export default Register;
