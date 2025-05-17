import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { 
  LayoutDashboard, 
  LogOut, 
  User, 
  ChevronDown, 
  BookOpen, 
  Users, 
  Upload, 
  FileVideo,
  Menu,
  X 
} from "lucide-react";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { role, logout } = useAuth();
  const [name, setName] = useState("");
  
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setName(username);
    }
  }, []);

  // Close mobile sidebar when window is resized to larger viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLink = ({ to, icon, children, onClick }) => (
    <Link 
      to={to} 
      onClick={(e) => {
        if (onClick) onClick(e);
        setIsMobileMenuOpen(false);
      }}
      className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );

  return (
    <div className="font-nunito">
      {/* Mobile menu toggle button - shown only on small screens */}
      <button 
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 md:hidden bg-white p-2 rounded-lg shadow-md z-50 text-gray-700 hover:text-blue-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile - shown when menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
      
      {/* Sidebar - responsive with transform */}
      <div 
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-lg flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0 w-96' : '-translate-x-full md:translate-x-0 md:w-64'
        }`}
      >
        {/* Logo Area */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-start space-x-2">
            <BookOpen size={24} className="text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">EduPortal</h1>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          {role === "admin" ? (
            <nav className="space-y-1 px-2">
              <NavLink to="/admin-dashboard" icon={<LayoutDashboard size={20} className="text-gray-500" />}>
                Dashboard
              </NavLink>
              <NavLink to="/admin" icon={<Users size={20} className="text-gray-500" />}>
                Create Faculty
              </NavLink>
              <NavLink to="/admin/faculty-data" icon={<Users size={20} className="text-gray-500" />}>
                Faculty Data
              </NavLink>
              <NavLink to="/admin/student-data" icon={<Users size={20} className="text-gray-500" />}>
                Student Data
              </NavLink>
            </nav>
          ) : role === "faculty" ? (
            <nav className="space-y-1 px-2">
              <NavLink to="/faculty-dashboard" icon={<LayoutDashboard size={20} className="text-gray-500" />}>
                Dashboard
              </NavLink>
              
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen size={20} className="text-gray-500" />
                    <span className="font-medium">Branches</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="pl-10 py-1 space-y-1">
                    <Link 
                      to="#" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                    >
                      CSE
                    </Link>
                    <Link 
                      to="#" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                    >
                      AIML
                    </Link>
                  </div>
                )}
              </div>
              
              <NavLink to="/upload-video" icon={<Upload size={20} className="text-gray-500" />}>
                Upload Video
              </NavLink>
              <NavLink to="/uploaded-content" icon={<FileVideo size={20} className="text-gray-500" />}>
                Uploaded Content
              </NavLink>
            </nav>
          ) : (
            <nav className="space-y-1 px-2">
              <NavLink to="/student-dashboard" icon={<LayoutDashboard size={20} className="text-gray-500" />}>
                Dashboard
              </NavLink>
            </nav>
          )}
        </div>
        
        {/* User Profile & Logout Area */}
        <div className="border-t border-gray-100">
          <div className="p-4 flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-2 rounded-full">
                <User size={20} className="text-blue-600" />
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-700 truncate">{name.toUpperCase() || "User"}</p>
              <p className="text-xs text-gray-500 capitalize">{role || "Student"}</p>
            </div>
          </div>
          
          <NavLink 
            to="/" 
            icon={<LogOut size={20} className="text-gray-500" />}
            onClick={logout}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;