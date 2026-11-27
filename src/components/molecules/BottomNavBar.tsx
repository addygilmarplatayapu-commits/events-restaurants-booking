"use client";

import { Home, Compass, Search, Bookmark } from "lucide-react";

export type NavTab = "home" | "explore" | "search" | "saved";

interface BottomNavBarProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
}

export function BottomNavBar({ activeTab, onChangeTab }: BottomNavBarProps) {
  const items: { id: NavTab; label: string; Icon: typeof Home }[] = [
    { id: "home", label: "Home", Icon: Home },
    { id: "explore", label: "Explore", Icon: Compass },
    { id: "search", label: "Search", Icon: Search },
    { id: "saved", label: "Saved", Icon: Bookmark },
  ];

  return (
    <nav className="grid grid-cols-4 py-2.5 px-2">
      {items.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChangeTab(id)}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium cursor-pointer ${
              active ? "text-[#3B147A]" : "text-gray-400"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}