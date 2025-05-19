import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, BufferGeometry, Float32BufferAttribute, PointsMaterial } from "three";

type Particle = {
  position: [number, number, number];
  speed: number;
};

type ParticlesProps = {
  count?: number;
};

const Particles = ({ count = 200 }: ParticlesProps) => {
  const mesh = useRef<Points<BufferGeometry>>(null);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        Math.random() * 10 + 5, // higher starting point
        (Math.random() - 0.5) * 10,
      ],
      speed: 0.005 + Math.random() * 0.001,
    }));
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= particles[i].speed;
      if (y < -2) y = Math.random() * 10 + 5;
      positions[i * 3 + 1] = y;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      array[i * 3] = p.position[0];
      array[i * 3 + 1] = p.position[1];
      array[i * 3 + 2] = p.position[2];
    });
    return array;
  }, [particles, count]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;