import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        profile_image_url: profileImageUrl || undefined,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      // navigate("/");
      location.reload();
    }
  };

  return (
    <div className="signup-page">
      <video autoPlay muted loop className="background-video">
        <source src="https://bonfire-movie.s3.us-east-2.amazonaws.com/Bonfire+Animation.mp4" type="video/mp4" />
      </video>
      <div className="content-overlay">
        <h1 className="welcome-header">Welcome to Bonfire!</h1>
        <br />
        <h1 className="signup-header">Sign Up to Start the Conversation</h1>
        {errors.server && <p className="error">{errors.server}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <label className="signup-label">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signup-input"
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}
          <label className="signup-label">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="signup-input"
            />
          </label>
          {errors.username && <p className="error">{errors.username}</p>}
          <label className="signup-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="signup-input"
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}
          <label className="signup-label">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="signup-input"
            />
          </label>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          <label className="signup-label">
            Profile Image URL
            <input
              type="text"
              value={profileImageUrl}
              onChange={(e) => setProfileImageUrl(e.target.value)}
              className="signup-input"
            />
          </label>
          {errors.profileImageUrl && <p className="error">{errors.profileImageUrl}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="login-redirect">
          Already have an account? Click <Link to="/login">here</Link> to login.
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;