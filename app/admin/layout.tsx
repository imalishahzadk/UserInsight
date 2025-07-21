"use client";

import LayoutWrapper from "@/components/admin/layout";
import AuthGuard from "@/components/shared/guards/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <LayoutWrapper>{children}</LayoutWrapper>
    </AuthGuard>
  );
}
