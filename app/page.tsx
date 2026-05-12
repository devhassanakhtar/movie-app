"use client";

import HeroSection from "@/components/HeroSection";
import { API_URL, IMAGE_PATH } from "@/constant";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${API_URL}/discover/movie`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMBD_API_KEY}`,
          },
        });

        const data = await response.json();
        console.log("data:", data);
        setMovies(data.results || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <HeroSection />
      <div className="flex flex-col m-10 mt-0">
        <div className="mb-10 ">
          <h2 className="text-3xl font-black text-alabaster mb-3">
            Popular Right Now
          </h2>
          <p className="text-lg text-santas-gray">
            Explore what everyone is watching
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="group">
            <div className="relative overflow-hidden cursor-pointer group rounded-xl">
              <Image className="group-hover:scale-110 duration-500 h-full w-full object-cover" src={movie.poster_path ? `${IMAGE_PATH}${movie.poster_path}` : "/placeholder-image.svg"}
              width={250} height={250} alt="movie.title"/>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
