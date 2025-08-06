"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[100px] bg-[#f0f0f0]"></div>
        <div className="w-[750px] h-[100px] bg-[#c24747]"></div>
        <div className="w-[375px] h-[100px] bg-[#c24747]"></div>
    </div>
  );
}
