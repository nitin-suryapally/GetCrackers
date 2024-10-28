import Banner from "@/components/Banner";
import CompanyPage from "@/components/CompanyPage";

const Comapny = () => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-8 lg:space-y-16">
      <Banner />
      <CompanyPage />
    </div>
  );
};

export default Comapny;
