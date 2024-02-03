import { Link } from 'react-router-dom';

const Navbar = ({ logout, userId }) => {
  return (
    <header className="Navbar">
      <Link to={userId ? `/api/users/${userId}/posts` : '/'}>
        <h1>Odinbook</h1>
      </Link>
      { userId && <button onClick={logout}>Logout</button>}
    </header>
  );
};

export default Navbar;
