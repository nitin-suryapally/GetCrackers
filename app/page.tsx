import Banner from "@/components/Banner";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 md:space-y-8 lg:space-y-16">
      <Banner />
      <Products />
    </div>
  );
}
