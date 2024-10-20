// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from '../../contexts/AuthContext'; 
// import Cookies from "js-cookie"; 
// import "./Login.css"; 

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
//   const { login, setIsAuthenticated } = useAuth(); 

//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/auth/login/",
//         {
//           username: email,  // Use the input email state for the username
//           password: password,  // Use the input password state
//         }
//       );
  
//       const { token, user } = response.data;  // Extract token and user info from the response
  
//       if (token) {
//         // Store the token in localStorage
//         localStorage.setItem("authToken", token);
  
//         // Extract user data and handle user session logic
//         const userType = user?.role;  // If user has a role field
//         const userId = user?.id;
  
//         // Call login to set user session (assuming this is coming from context or props)
//         login(userType, userId);  // Example login(userType, userId) to update session
  
//         setIsAuthenticated(true);  // Mark user as authenticated
  
//         // Store the token in cookies for persistence
//         Cookies.set("authToken", token, { expires: 7 });
  
//         // Set the token as a default header for future Axios requests
//         axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  
//         // Navigate to the home or dashboard page after login
//         navigate("/");
  
//       } else {
//         setErrorMessage("Failed to retrieve token. Please try again.");
//       }
//     } catch (error) {
//       if (error.response) {
//         // Handle login errors gracefully, such as incorrect credentials
//         setErrorMessage(error.response.data.message || "Login failed. Please try again.");
//       } else {
//         setErrorMessage("An error occurred. Please try again.");
//       }
//     }
//   };
  
//   return (
//     <div className="wrapper fadeInDown">
//       <div id="formContent">
//         <h2 className="active"> Sign In </h2>

//         {errorMessage && <div className="error-message">{errorMessage}</div>}

//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             id="login"
//             className="fadeIn second"
//             name="login"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             id="password"
//             className="fadeIn third"
//             name="login"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <input type="submit" className="fadeIn fourth" value="Log In" />
//         </form>

//         <div id="formFooter">
//           <Link className="underlineHover" to="/register">Sign up</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;























import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext'; 
import Cookies from "js-cookie"; 
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login, setIsAuthenticated } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          username: email, 
          password: password,  
        }
      );
  
      const { token, user } = response.data;  
  
      if (token) {
        localStorage.setItem("authToken", token);
        const userType = user?.role;  
        const userId = user?.id;

        login(userType, userId);  
        setIsAuthenticated(true);  
        Cookies.set("authToken", token, { expires: 7 });
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        navigate("/");
      } else {
        setErrorMessage("Failed to retrieve token. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };
  
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active"> Sign In </h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>

        <div id="formFooter">
          <Link className="underlineHover" to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

