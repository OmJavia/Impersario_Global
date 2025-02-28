import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const user = { email: "Apoliums@gmail.com" };
  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || !(event.target as HTMLElement).closest(".user-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          TRAVEL SHOP
        </Link>
        <div className="nav-links">
          <Link to="/buy">Buy</Link>
          <Link to="/curate">Curate</Link>
        </div>
      </div>

      <div className="nav-right">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Link to="/contact" className="contact-link">
          Contact Us
        </Link>

        {user && (
          <div className="relative user-dropdown">
            <div className="flex items-center space-x-2">
              <span className="user-icon">👤</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="dropdown-arrow focus:outline-none"
              >
                ▼
              </button>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md dropdown-menu">
                <p className="p-2 text-gray-700">{user.email}</p>
                <hr />
                <button
                  onClick={logout}
                  className="w-full p-2 text-left text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
