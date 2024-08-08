import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./SplashPage.css";

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

export default function Splash({ user }) {
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  const handleOpenClick = () => {
    if (user) {
      navigate("/channels/@me");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="splash-container-top">
        <div className="splash-top-details-container">
          <div className="splash-top-details-text">
            <h1 className="splash-header">Imagine a place...</h1>
            <div className="splash-top-details-subtext">
              <span>
                Where you can belong to a school club, a gaming group, or a
                worldwide art community. Where just you and a handful of friends
                can spend time together. A place that makes it easy to talk
                every day and hang out more often.
              </span>
            </div>
          </div>
          <div className="splash-top-details-buttons">
            {!hidden && (
              <button
                onClick={handleOpenClick}
                className="open-discord-button"
              >
                Open Bonfire in your browser
              </button>
            )}
            <div className="form-popup" id="myForm">
              <form action="/" className="form-container">
                <div className="form-input">
                  <input
                    type="text"
                    placeholder="Enter a username"
                    name="username"
                    required
                  />
                </div>
                <div className="form-button">
                  <button type="submit" className="btn">
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="background-image-container-parent">
          <img src="https://i.pinimg.com/originals/6a/ad/41/6aad4128ff7d3c11406835667101ef82.gif" className="bg-image" alt="background" />
        </div>
      </div>
      <div className="developers-section">
        <h2>Meet the Developers</h2>
        <div className="developers">
          <div className="developer">
            <img src="../../../public/andrew.png" alt="Developer 1" />
            <h3>Andrew Garcia</h3>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/andrew-garcia-836487114/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com/garciaa38" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
          <div className="developer">
            <img src="../../../public/abdul.png" alt="Developer 2" />
            <h3>Abdul Waris</h3>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/abdul-waris-aa1234aw/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com/Waris-95" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
          <div className="developer">
            <img src="../../../public/charles.png" alt="Developer 3" />
            <h3>Charles Oller</h3>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/charles-oller-111698208/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com/charlesoller" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
