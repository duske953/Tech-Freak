import { useAnimation } from 'motion/react';
import { useEffect, useState } from 'react';

export default function useTransitionImage() {
  const [imgLoad, setImgLoad] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (imgLoad) controls.start({ opacity: 1 });
  }, [controls, imgLoad]);

  return { controls, setImgLoad };
}
