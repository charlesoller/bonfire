import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sessionUser) {
      navigate("/", { replace: true });
    }
  }, [sessionUser, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <video autoPlay muted loop className="background-video">
        <source
          src="https://bonfire-movie.s3.us-east-2.amazonaws.com/Bonfire+Animation.mp4"
          type="video/mp4"
        />
      </video>
      <div className="content-overlay">
        <div className="login-box">
          <h1 className="login-header">Welcome back!</h1>
          <p className="login-subheader">We're so excited to see you again!</p>
          {errors.length > 0 &&
            errors.map((message) => (
              <p key={message} className="error-message">
                {message}
              </p>
            ))}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
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
            <button type="submit" className="login-button">Log In</button>
          </form>
          <div className="login-redirect">
            Don&apos;t have an account? Click <Link to="/signup">here</Link> to sign up.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
