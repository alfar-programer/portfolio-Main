// src/components/Buttons.tsx
import React from 'react';

interface ButtonsProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  className?: string;
  id?: string;
}

const Buttons: React.FC<ButtonsProps> = ({ text, className = '', id, href = '#', ...rest }) => {
  return (
    <a href={href} id={id} className={`cta-wrapper ${className}`} {...rest}>
      <div className="cta-button group">
        <div className="bg-circle"></div>
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Buttons;
