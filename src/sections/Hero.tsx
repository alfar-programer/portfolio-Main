// src/sections/Hero.tsx
import React, { useRef } from 'react';
import { words } from '../Constants';
import Buttons from '../components/Buttons';
import HeeroExperience from '../components/Heromodels/HeeroExperience';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedCounter from '../components/AnimatedCounter';
import CanvasAnimation from '../components/CanvasAnimation';

interface WordType {
  text: string;
  imgPath: string;
}

const Hero: React.FC = () => {
  const heroTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.hero-text h1', 
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: .3,
        duration: 1,
        ease: 'power2.inOut',
      }
    );
  }, { scope: heroTextRef }); // Scope the animation to the ref

  return (
    <section id="hero" className="relative overflow-hidden">
    
      <div className="absolute top-0 left-0 z-10">
        <img 
          src="/images/bg.png" 
          alt="background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:pc-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text" ref={heroTextRef}>
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word: WordType) => (
                      <span
                        key={word.text}
                        className="flex items-center md:gap-2 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I am Mazen, a developer from Egypt. I hope I satisfied you.
            </p>
            
            <Buttons 
              text="See my code" 
              className="md:w-80 md:h-16 w-60 h-12" 
              id="button" 
            />
          </div>
        </header>

        {/* Right: 3D model */}
        <figure>
          <div className="hero-3d-layout">
            <HeeroExperience />    
          </div>
        </figure>
      </div>
      <AnimatedCounter />
    </section>
  );
};

export default Hero;