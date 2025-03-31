import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import TodoList from "./pages/todos/TodoList";
// import TodoDetail from "./pages/todos/TodoDetail";
import NotFound from "./pages/NotFound";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
      </Route> */}

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
