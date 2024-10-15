"use client";

import React from "react";

const FeaturedVideo = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-center mb-4">Featured Video</h2>
      <div className="relative pb-9/16">
        <iframe
          width="800"
          height="400"
        //   className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/d9RY0tx6ERs?si=-i4jhav_zACkyPNv"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default FeaturedVideo;
