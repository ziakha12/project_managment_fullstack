import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function BackgroundBeamsWithCollisionDemo({children}: {children: any}) {
  return (
    <BackgroundBeamsWithCollision>
      {children}
    </BackgroundBeamsWithCollision>
  );
}
