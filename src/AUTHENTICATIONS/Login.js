import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

// The client ID for Google OAuth
const clientId = process.env.REACT_APP_CLIENTID;

const onSuccess = async (googleUser) => {
  const profile = googleUser.getBasicProfile();
  const data = {
    username: profile.getName(),
    email: profile.getEmail(),
  };

  try {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem('username', result.username); // Store the username
      window.location.href = result.redirect; // Redirect based on server response
    } else {
      alert('Google sign-in failed: ' + result.message);
    }
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    alert('An error occurred. Please try again later.');
  }
};



const onFailure = (res) => {
  console.log('Google authentication failed:', res);
};

function Login() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'profile email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(
      (googleUser) => onSuccess(googleUser),
      (error) => onFailure(error)
    );
  };

  return (
    <div id="signInButton">
      <a className="social-icon" onClick={handleLogin}>
        <i className="fab fa-google"></i>
      </a>
    </div>
  );
}

export default Login;
