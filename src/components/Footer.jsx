/**
 * Footer component
 * 
 * A reusable footer component that is used throughout the application.
 * It renders the logo and simple text with copyright of current year.
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

import logo from "../assets/temp1.png";

function Footer() {
  // get current year to dynamically update copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-200 py-6 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-14 w-auto border-1" />
          <p className="ml-3 text-m font-medium text-gray-800 hidden sm:block">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
