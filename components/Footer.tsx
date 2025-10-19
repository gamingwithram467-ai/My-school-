
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center p-4 bg-blue-700 text-white mt-auto">
        &copy; {new Date().getFullYear()} Guru Nanak High School. All rights reserved.
    </footer>
  );
};

export default Footer;
