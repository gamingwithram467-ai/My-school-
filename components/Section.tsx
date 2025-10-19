import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">{title}</h2>
      {children}
    </section>
  );
};

export default Section;