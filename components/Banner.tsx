import Image from "next/image";
import banner_image from "@/public/Diwali_Poster_20_percent_off.jpeg";

const Banner = () => {
  return (
    <div className="w-full h-[450px] relative flex justify-center items-center bg-orange-500 overflow-hidden  top-0">
      <Image
        src={banner_image} // or "/mnt/data/{4C30140C-06A5-48EC-B20E-E02B5B647E00}.png" if not moved to public
        alt="Diwali Sale Banner"
        layout="fill" // Fills the container entirely
        objectFit="cover" // Ensures the image covers the entire area without distortion
        className="rounded-lg shadow-lg"
        priority // Optimizes loading for performance, especially on mobile
      />
    </div>
  );
};

export default Banner;
