import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl font-bold">GetCrackers</h1>
          <div className="mt-4 md:mt-0">
            <p className="text-sm">123 Celebration Lane</p>
            <p className="text-sm">Festive City, Country</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: info@getcrackers.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
