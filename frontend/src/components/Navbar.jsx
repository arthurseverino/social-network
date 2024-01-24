import { Link } from 'react-router-dom';

const Navbar = ({ logout, isLoggedIn, userId }) => {
  return (
    <header className="Navbar">
      <Link to={isLoggedIn ? `/api/users/${userId}/posts` : '/'}>
        <h1>My App</h1>
      </Link>
      {isLoggedIn && <button onClick={logout}>Logout</button>}
    </header>
  );
};

export default Navbar;