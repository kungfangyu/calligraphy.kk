import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, className = '', children, fullWidth = false }) => {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className={`${fullWidth ? 'w-full' : 'max-w-6xl mx-auto px-4 md:px-8'}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;