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
  const [profileImage, setProfileImage] = useState("")
  const [errors, setErrors] = useState({});
  const [emailErrors, setEmailErrors] = useState({});
  const [profileImageError, setProfileImageError] = useState({});

  const VALID_EXTENSIONS = ['jpg', 'png', 'jpeg']

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErrors({});
    setProfileImageError({});

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    if (!email.split("@")[1]?.split(".")[1]) {
      setEmailErrors({email: "Please include a valid email address."})
      return;
    }

    if (!VALID_EXTENSIONS.includes(profileImage.split('.')[profileImage.split(".").length - 1]) && profileImage.length > 0) {
      setProfileImageError({profileImage: "Profile Image URL must end in '.jpg', '.png', 'jpeg'"})
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        profileImage
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
        <source
          src="https://bonfire-movie.s3.us-east-2.amazonaws.com/Bonfire+Animation.mp4"
          type="video/mp4"
        />
      </video>
      <div className="content-overlay">
        <div className="signup-box">
          <h1 className="signup-header">Create an account</h1>
          {errors.server && <p className="error-message">{errors.server}</p>}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              {emailErrors.email && <p className="error-message">{emailErrors.email}</p>}
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>
            <div className="form-group">
              <label>{'Profile Image URL (Optional)'}</label>
              <input
                type="text"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />
              {profileImageError.profileImage && <p className="error-message">{profileImageError.profileImage}</p>}
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <div className="login-redirect">
            Already have an account? Click <Link to="/login">here</Link> to login.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;