"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  toggleMobileOpen: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
  toggleCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
  toggleMobileOpen: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("docs-sidebar-collapsed");
    if (stored === "true") setCollapsed(true);
  }, []);

  const setCollapsedPersist = (v: boolean) => {
    setCollapsed(v);
    localStorage.setItem("docs-sidebar-collapsed", String(v));
  };

  const toggleCollapsed = () => setCollapsedPersist(!collapsed);
  const toggleMobileOpen = () => setMobileOpen((open) => !open);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed: setCollapsedPersist,
        toggleCollapsed,
        mobileOpen,
        setMobileOpen,
        toggleMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
