import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
      navigate("/tasks");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.non_field_errors?.[0] ||
          error.message ||
          "Invalid credentials"
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
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
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

        <button
          type="submit"
          className={`
            w-full py-2 px-4 bg-blue-500 text-white rounded-md 
            hover:bg-blue-600 transition 
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
          `}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>

        <div className="flex justify-center mt-4">
          <span className="mr-2 text-gray-600">Don't have an account?</span>
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Register
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
