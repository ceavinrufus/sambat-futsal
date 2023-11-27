import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { children } = props;

  return (
    <div className="bg-primary text-white w-[500px] h-screen fixed top-0 right-0 overflow-y-auto z-50 px-8 py-6 rounded-l-2xl">
      {children}
    </div>
  );
};

export default Sidebar;
