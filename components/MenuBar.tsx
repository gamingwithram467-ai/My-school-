import React from 'react';

const menuItems = [
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Contact', href: '#contact' },
  { name: 'Admissions', href: '#admission' },
];

const MenuBar: React.FC = () => {
  return (
    <nav className="bg-blue-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
            <div className="flex items-center h-12 overflow-x-auto whitespace-nowrap">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-blue-100 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
            </div>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;