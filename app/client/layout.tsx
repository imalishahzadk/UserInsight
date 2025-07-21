"use client";

import LayoutWrapper from "@/components/client/layout";
import AuthGuard from "@/components/shared/guards/auth-guard";

export default function ClientLayout({
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
