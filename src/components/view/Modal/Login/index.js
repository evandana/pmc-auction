import React from 'react';
import googleLoginImg from 'static/images/google_signin/btn_google_signin_light_normal_web.png';
import './styles.css';

const LoginModal = (props) => {
    const { loginGoogleRequest } = props;
    
    const googleLoginProps = {
        className: "loginModal-btn",
        onClick: loginGoogleRequest,
        src: googleLoginImg,
    }
    
    return (<div>
        You must sign in to access the auctions.
        
        <div className="loginModal-menu">
            <img {...googleLoginProps} alt="" />
        </div>
    </div>);
};

export default LoginModal;