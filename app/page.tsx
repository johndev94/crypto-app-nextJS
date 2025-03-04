"use client";

import { useTheme } from "next-themes";
import { Header } from "./Components/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState(theme === "dark" ? "bg-black" : "bg-slate-100");

  useEffect(() => {
    setBgColor(theme === "dark" ? "bg-black" : "bg-slate-100");
  }, [theme]);

  return (
    <div className={`poppins ${bgColor} p-2 min-h-screen transition-colors duration-300`}>
      <Header />
    </div>
  );
}
