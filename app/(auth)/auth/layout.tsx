import React from "react";
import Squares from "@/components/Squares/Squares";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex justify-center items-center h-screen bg-[#15101f]">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal"
        borderColor="#37214c"
        hoverFillColor="#222"
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10">{children}</div>
    </main>
  );
};

export default AuthLayout;
