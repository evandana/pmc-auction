import React from 'react';
import googleLoginImg from 'static/images/google_signin/btn_google_signin_light_normal_web.png';
import './styles.css';

const LoginModal = (props) => {
    const { loginGoogleRequest, showLoginSpinner } = props;
    
    return (
        <div>
            { showLoginSpinner ? (
                <div className="loader">
                    <div className="loader-spinner" />
                </div>
            ) : (
                <div>
                Please sign in.
                
                    <div className="loginModal-menu">
                        <img 
                            className='loginModal-btn' 
                            onClick={loginGoogleRequest} 
                            src={googleLoginImg} 
                            alt="" 
                            />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginModal;