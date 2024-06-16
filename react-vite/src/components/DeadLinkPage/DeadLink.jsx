import "./DeadLink.css";
import { Link } from "react-router-dom";

function DeadLinkPage() {
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
                    <h1 className="signup-header">{`Looks like you're lost, friend...`}</h1>
                    <div className="login-redirect">
                        Click <Link to="/">here</Link> to join us at the fire.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeadLinkPage;