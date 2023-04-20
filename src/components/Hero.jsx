import { useRive } from "rive-react";

function Hero() {
  const { rive, RiveComponent } = useRive({
    src: 'wonderdynamics.riv',
    autoplay: true
  });

  return <RiveComponent className="w-full h-full aspect-video sm:aspect-auto" />
}

export default Hero;
