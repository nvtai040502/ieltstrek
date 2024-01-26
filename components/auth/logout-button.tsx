"use client";

import { logout } from "@/actions/auth/logout";


interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const onClick = async () => {
    await logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};