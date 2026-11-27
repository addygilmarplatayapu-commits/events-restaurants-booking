import React from "react";

interface MobileShellTemplateProps {
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
}

export function MobileShellTemplate({ children, bottomNav }: MobileShellTemplateProps) {
  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center">
      <div className="w-full max-w-[420px] min-h-screen bg-white text-gray-900 flex flex-col justify-between shadow-2xl relative overflow-x-hidden">
        <main className="flex-1 pb-20">{children}</main>
        {bottomNav && (
          <footer className="sticky bottom-0 z-30 bg-white border-t border-gray-100">
            {bottomNav}
          </footer>
        )}
      </div>
    </div>
  );
}