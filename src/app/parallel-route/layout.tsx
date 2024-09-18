import React from "react";

export default function Layout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const role = "user" as string;
  return <>{role !== "admin" ? admin : user}</>;
}
