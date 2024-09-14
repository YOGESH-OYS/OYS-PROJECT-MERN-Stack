import React, { useEffect } from 'react';

const LinkedInLogin = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://platform.linkedin.com/in.js?async=true";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.IN.init({
        api_key: '86v6ojo9do73hg',
        authorize: true,
        onLoad: function() {
          console.log('LinkedIn SDK loaded');
          if (window.IN) {
            console.log('LinkedIn SDK is available');
          } else {
            console.error('LinkedIn SDK is not available');
          }
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = () => {
    if (window.IN) {
      window.IN.User.authorize(() => {
        window.IN.API.Raw('/people/~:(id,firstName,lastName,emailAddress)')
          .result((profile) => {
            const data = {
              username: `${profile.firstName} ${profile.lastName}`,
              email: profile.emailAddress,
            };

            fetch('/api/auth/linkedin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then(response => response.json())
              .then(result => {
                localStorage.setItem('username', result.username);
                window.location.href = result.redirect;
              })
              .catch(error => {
                console.error('Error during LinkedIn sign-in:', error);
                alert('An error occurred. Please try again later.');
              });
          })
          .error((err) => {
            console.error('Error retrieving LinkedIn profile:', err);
            alert('Failed to retrieve LinkedIn profile.');
          });
      });
    } else {
      console.error('LinkedIn SDK not loaded.');
      alert('LinkedIn SDK is not loaded.');
    }
  };

  return (
    <div id="linkedInButton">
      <a className="social-icon" onClick={handleLogin}>
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
  );
};

export default LinkedInLogin;

// import React from 'react';

// const LinkedInLogin = () => {
//   const linkedInClientId = '86v6ojo9do73hg'; // Replace with your LinkedIn Client ID
//   const linkedInRedirectUri = 'http://localhost:5000/linkedin/callback';  // Same as server-side redirect URI
//   const state = 'AJH091HBD'; // You can generate a random state string for security
//   const scope = 'r_liteprofile r_emailaddress'; // Adjust scopes as needed

//   const handleLogin = () => {
//     // Build the LinkedIn authorization URL
//     const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=${state}&scope=${scope}&client_id=${linkedInClientId}&redirect_uri=${encodeURIComponent(linkedInRedirectUri)}`;

//     // Redirect to LinkedIn for authorization
//     window.location.href = linkedInAuthUrl;
//   };

//   return (
//     <div id="linkedInButton">
//       <a className="social-icon" onClick={handleLogin}>
//         <i className="fab fa-linkedin"></i>
//       </a>
//     </div>
//   );
// };

// export default LinkedInLogin;

