import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SigninForm = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (!userType) {
      alert("Please select a user type");
      return;
    }
  
    const loginData = {
      username: username,
      password: password,
    };
  
    try {
      let url;
      switch (userType) {
        case "superuser":
          url = "https://gym-management-2.onrender.com/accounts/superlogin/";
          break;
        case "admin":
          url = "https://gym-management-2.onrender.com/accounts/admin_login";
          break;
        case "user":
          url = "https://gym-management-2.onrender.com/accounts/user_login";
          break;
        default:
          alert("Invalid user type");
          return;
      }
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
        
        if (userType === "user") {
          // Get the user ID from the login response
          const userId = data.user_id;
          
          // Make a GET request to fetch user details
          const userDetailsResponse = await fetch(`https://gym-management-2.onrender.com/accounts/user_register?id=${userId}`, {
            method: "GET",
            headers: {
              "Accept": "application/json",
            },
          });
  
          if (userDetailsResponse.ok) {
            const userDetails = await userDetailsResponse.json();
            console.log("User Details:", userDetails);  
            localStorage.setItem("userData", JSON.stringify({ ...userDetails, userType }));
            alert("Login successful!");
            navigate("/Home");
          } else {
            alert("Failed to fetch user details. Please try again.");
          }
        } else {
          localStorage.setItem("userData", JSON.stringify({ ...data, userType }));
          navigate("/Home");
        }
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      console.log("Forgot Password Email:", forgotPasswordEmail);
      const response = await fetch('https://gym-management-2.onrender.com/accounts/password-reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: forgotPasswordEmail })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Password reset instructions have been sent to your email.');
        setShowForgotPassword(false);
      } else {
        alert(`Password reset failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('An error occurred during password reset');
    }
  };
  

  return (
    <>
      <form action="#" className="sign-in-form">
        <h2 className="title">Sign In</h2>
        <div className="input-field">
          <i className="fas fa-user-tag"></i>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="user-type-select"
            required
          >
            <option value="">Select User Type</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superuser">Superuser</option>
          </select>
        </div>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" id="username" required />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" id="password" required />
        </div>
        <input type="submit" onClick={submit} value="Login" className="btn solid" />
        <p className="forgot-password"onClick={() => setShowForgotPassword(true)}>Forgot Password?</p>
        {showForgotPassword && (
        <div className="forgot-password-section">
          <h2>Reset Password</h2>
          <form >
            <input 
              type="email" 
              value={forgotPasswordEmail} 
              onChange={(e) => setForgotPasswordEmail(e.target.value)} 
              placeholder="Enter your email" 
              required 
            />
            <button type="submit" onClick={handleForgotPassword}>Reset Password</button>
          </form>
          <button onClick={() => setShowForgotPassword(false)}>Cancel</button>
        </div>
      )}
  
        <p className="social-text">Or Sign in with social platforms</p>
        <div className="social-media">
          <a href="#" className="social-icon">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-x-twitter"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </form>
    </>
  );
  
};
