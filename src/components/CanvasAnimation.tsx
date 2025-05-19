// import React, { useEffect, useRef } from 'react';

// interface NodeProps {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
// }

// class Node {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;

//   constructor() {
//     this.x = 0;
//     this.y = 0;
//     this.vx = 0;
//     this.vy = 0;
//   }
// }

// interface WaveOptions {
//   phase?: number;
//   offset?: number;
//   frequency?: number;
//   amplitude?: number;
// }

// class Wave {
//   phase: number;
//   offset: number;
//   frequency: number;
//   amplitude: number;
//   private currentValue: number = 0;

//   constructor(options: WaveOptions = {}) {
//     this.init(options);
//   }

//   init(options: WaveOptions) {
//     this.phase = options.phase || 0;
//     this.offset = options.offset || 0;
//     this.frequency = options.frequency || 0.001;
//     this.amplitude = options.amplitude || 1;
//   }

//   update(): number {
//     this.phase += this.frequency;
//     this.currentValue = this.offset + Math.sin(this.phase) * this.amplitude;
//     return this.currentValue;
//   }

//   value(): number {
//     return this.currentValue;
//   }
// }

// interface LineOptions {
//   spring?: number;
// }

// interface EngineOptions {
//   debug?: boolean;
//   friction?: number;
//   trails?: number;
//   size?: number;
//   dampening?: number;
//   tension?: number;
// }

// const ENGINE_CONFIG: EngineOptions = {
//   debug: true,
//   friction: 0.5,
//   trails: 20,
//   size: 50,
//   dampening: 0.25,
//   tension: 0.98,
// };

// interface Position {
//   x: number;
//   y: number;
// }

// interface CanvasAnimationProps {
//   className?: string;
//   style?: React.CSSProperties;
// }

// const CanvasAnimation: React.FC<CanvasAnimationProps> = ({ className, style }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animationRef = useRef<number>();
//   const waveRef = useRef<Wave>();
//   const linesRef = useRef<Line[]>([]);
//   const positionRef = useRef<Position>({ x: 0, y: 0 });

//   class Line {
//     spring: number;
//     friction: number;
//     nodes: Node[];
  
//     constructor(options: LineOptions = {}) {
//       this.init(options);
//     }
  
//     init(options: LineOptions) {
//       this.spring = (options.spring || 0.4) + 0.1 * Math.random() - 0.02;
//       this.friction = (ENGINE_CONFIG.friction || 0.5) + 0.01 * Math.random() - 0.002;
//       this.nodes = [];
      
//       for (let n = 0; n < (ENGINE_CONFIG.size || 50); n++) {
//         const t = new Node();
//         t.x = positionRef.current.x;
//         t.y = positionRef.current.y;
//         this.nodes.push(t);
//       }
//     }
  
//     update() {
//       let springFactor = this.spring;
//       let node = this.nodes[0];
      
//       node.vx += (positionRef.current.x - node.x) * springFactor;
//       node.vy += (positionRef.current.y - node.y) * springFactor;
  
//       for (let i = 0; i < this.nodes.length; i++) {
//         node = this.nodes[i];
        
//         if (i > 0) {
//           const prevNode = this.nodes[i - 1];
//           node.vx += (prevNode.x - node.x) * springFactor;
//           node.vy += (prevNode.y - node.y) * springFactor;
//           node.vx += prevNode.vx * (ENGINE_CONFIG.dampening || 0.25);
//           node.vy += prevNode.vy * (ENGINE_CONFIG.dampening || 0.25);
//         }
  
//         node.vx *= this.friction;
//         node.vy *= this.friction;
//         node.x += node.vx;
//         node.y += node.vy;
//         springFactor *= ENGINE_CONFIG.tension || 0.98;
//       }
//     }
  
//     draw(ctx: CanvasRenderingContext2D) {
//       let node = this.nodes[0];
//       let nx = node.x;
//       let ny = node.y;
      
//       ctx.beginPath();
//       ctx.moveTo(nx, ny);
      
//       for (let a = 1; a < this.nodes.length - 2; a++) {
//         node = this.nodes[a];
//         const nextNode = this.nodes[a + 1];
//         nx = 0.5 * (node.x + nextNode.x);
//         ny = 0.5 * (node.y + nextNode.y);
//         ctx.quadraticCurveTo(node.x, node.y, nx, ny);
//       }
      
//       node = this.nodes[this.nodes.length - 2];
//       const lastNode = this.nodes[this.nodes.length - 1];
//       ctx.quadraticCurveTo(node.x, node.y, lastNode.x, lastNode.y);
//       ctx.stroke();
//       ctx.closePath();
//     }
//   }

//   const handleMove = (e: MouseEvent | TouchEvent) => {
//     if ('touches' in e) {
//       positionRef.current.x = e.touches[0].pageX;
//       positionRef.current.y = e.touches[0].pageY;
//     } else {
//       positionRef.current.x = e.clientX;
//       positionRef.current.y = e.clientY;
//     }
//     e.preventDefault();
//   };

//   const handleTouchStart = (e: TouchEvent) => {
//     if (e.touches.length === 1) {
//       positionRef.current.x = e.touches[0].pageX;
//       positionRef.current.y = e.touches[0].pageY;
//     }
//   };

//   const initLines = () => {
//     linesRef.current = [];
//     for (let e = 0; e < (ENGINE_CONFIG.trails || 20); e++) {
//       linesRef.current.push(new Line({ spring: 0.4 + (e / (ENGINE_CONFIG.trails || 20)) * 0.025 }));
//     }
//   };

//   const render = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.globalCompositeOperation = 'source-over';
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.globalCompositeOperation = 'lighter';
//     ctx.strokeStyle = `hsla(${Math.round(waveRef.current?.update() || 0)},50%,20%,0.8)`;
//     ctx.lineWidth = 3;
    
//     for (let t = 0; t < (ENGINE_CONFIG.trails || 20); t++) {
//       const line = linesRef.current[t];
//       line.update();
//       line.draw(ctx);
//     }
    
//     animationRef.current = window.requestAnimationFrame(render);
//   };

//   const resizeCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     canvas.width = window.innerWidth - 20;
//     canvas.height = window.innerHeight;
//   };

//   const handleMouseMove = (e: MouseEvent | TouchEvent) => {
//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('touchstart', handleMouseMove);
//     document.addEventListener('mousemove', handleMove);
//     document.addEventListener('touchmove', handleMove);
//     document.addEventListener('touchstart', handleTouchStart);
    
//     handleMove(e);
//     initLines();
//     render();
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     waveRef.current = new Wave({
//       phase: Math.random() * 2 * Math.PI,
//       amplitude: 85,
//       frequency: 0.0015,
//       offset: 285,
//     });

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('touchstart', handleMouseMove);
//     window.addEventListener('resize', resizeCanvas);
//     window.addEventListener('focus', () => {
//       if (animationRef.current === undefined) {
//         render();
//       }
//     });
//     window.addEventListener('blur', () => {
//       if (animationRef.current !== undefined) {
//         window.cancelAnimationFrame(animationRef.current);
//         animationRef.current = undefined;
//       }
//     });

//     resizeCanvas();

//     return () => {
//       if (animationRef.current !== undefined) {
//         window.cancelAnimationFrame(animationRef.current);
//       }
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('touchstart', handleMouseMove);
//       document.removeEventListener('mousemove', handleMove);
//       document.removeEventListener('touchmove', handleMove);
//       document.removeEventListener('touchstart', handleTouchStart);
//       window.removeEventListener('resize', resizeCanvas);
//       window.removeEventListener('focus', () => {});
//       window.removeEventListener('blur', () => {});
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className={className}
//       style={style}
//     />
//   );
// };

// export default CanvasAnimation;