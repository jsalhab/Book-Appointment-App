import "../styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <a href="#" className="logo">
        Doctor’s Appointments
      </a>
      <div className="header-right">
        <a href="#" className="nav-link">
          Home
        </a>
      </div>
    </div>
  );
};

export default Header;
