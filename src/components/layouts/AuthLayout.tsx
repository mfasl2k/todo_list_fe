import React, { ReactNode } from "react";

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
    <div className="container mx-auto max-w-md py-12 px-4">
      <div className="bg-white shadow-lg rounded-md p-8">
        <div className="space-y-6">
          <h1 className="text-center text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-center text-gray-600">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};
