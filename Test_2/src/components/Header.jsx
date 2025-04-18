import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Brand */}
        <div className="brand">
          <Link to="/" className="brand-link">
            📊 SM Analytics
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Feed
          </Link>
          <Link
            to="/top-users"
            className={`nav-link ${
              location.pathname === "/top-users" ? "active" : ""
            }`}
          >
            Top Users
          </Link>
          <Link
            to="/trending-posts"
            className={`nav-link ${
              location.pathname === "/trending-posts" ? "active" : ""
            }`}
          >
            Trending Posts
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
