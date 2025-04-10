
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "Saved Jobs", path: "/saved-jobs" }
  ];
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-job-primary" />
            <span className="font-bold text-xl text-job-dark">JobHub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium hover:text-job-primary transition-colors ${
                    location.pathname === link.path ? "text-job-primary" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link to="/post-job">
              <Button className="bg-job-primary hover:bg-job-dark">
                Post a Job
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium px-2 py-2 rounded hover:bg-gray-100 ${
                    location.pathname === link.path ? "text-job-primary" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/post-job" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-job-primary text-white py-2 px-4 rounded text-center hover:bg-job-dark transition-colors"
              >
                Post a Job
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
