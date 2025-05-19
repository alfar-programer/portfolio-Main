// src/components/Buttons.tsx
import React from 'react';

interface ButtonsProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  className?: string;
  id?: string;
}

const Buttons: React.FC<ButtonsProps> = ({ text, className = '', id, href = '#', ...rest }) => {
  return (
    <a 
    onClick={(e)=> {
      e.preventDefault();

      const target =document.getElementById('counter')
      if(target && id ){
        const offset = window.innerHeight *0.15;

        const top =target .getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({top, behavior:'smooth'})

      }
    }}
    href={href} id={id} className={`cta-wrapper ${className}`} {...rest}>
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
