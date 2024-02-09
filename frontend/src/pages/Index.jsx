import { Link, useNavigate } from 'react-router-dom';

// first page the user sees, should be beautiful :)
const Index = ({ setToken, setUserId, setProfilePicture }) => {
  const navigate = useNavigate();

  //this makes a post resquest to api/users/login which gives the user a token
  const handleGuestLogin = async () => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'Visitor',
        password: 'visitor',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Save the token and user data in your application state
      setToken(data.token);
      setUserId(data.user._id);
      if (data.user.profilePicture) {
        setProfilePicture(data.user.profilePicture);
      } else {
        setProfilePicture(import.meta.env.VITE_DEFAULT_PROFILE_PICTURE);
      }
      navigate(`/api/users/${data.user._id}/posts`);
    } else {
      // Handle error
      console.error('Failed to log in as guest');
    }
  };

  return (
    <div className="landing">
      <div className="text-section">
        <h2 className="title">
          {Array.from('Friendify').map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.3}s` }}>
              {char}
            </span>
          ))}
        </h2>
        <h3 className="subtitle">
          Connect with friends and the world around you on Friendify.
        </h3>
      </div>

      <div className="link-section">
        <Link className="signup-link" to="/api/users/signup">
          Sign up{' '}
        </Link>
        <Link className="login-link" to="/api/users/login">
          {' '}
          Login
        </Link>
        <button className="guest-link" onClick={handleGuestLogin}>
          Continue as Visitor
        </button>
      </div>
    </div>
  );
};

export default Index;
