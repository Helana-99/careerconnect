// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEnvelope, faLock, faPhone, faBriefcase, faFileAlt } from '@fortawesome/free-solid-svg-icons';

// const CompanyForm = () => {
//   const [formData, setFormData] = useState({
//     industry: "",
//     registration_id: "",
//     registration_documents: null,
//     phone_number: "",
//     location: "",
//     client_base: false,
//     logo: null,
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [formErrors, setFormErrors] = useState({}); // To track errors for each field

//   const validateForm = () => {
//     let errors = {};
//     if (formData.username.length < 3) {
//       errors.username = "Username must be at least 3 characters long.";
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email address is invalid.";
//     }
//     if (formData.password.length < 6) {
//       errors.password = "Password must be at least 6 characters long.";
//     }
//     if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match.";
//     }
//     if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone_number)) {
//       errors.phone_number = "Invalid phone number format.";
//     }
//     if (formData.registration_id.length !== 14) {
//       errors.registration_id = "Registration ID must be exactly 14 digits.";
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0; // Return true if no errors
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "registration_documents" || name === "logo") {
//       setFormData({
//         ...formData,
//         [name]: e.target.files[0],
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }

//     // Reset error for the field being changed
//     setFormErrors((prev) => ({
//       ...prev,
//       [name]: null,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return; // Only proceed if validation passes

//     // Prepare FormData object
//     const formDataObj = new FormData();
//     formDataObj.append("user.username", formData.username);
//     formDataObj.append("user.email", formData.email);
//     formDataObj.append("user.password", formData.password);
//     formDataObj.append("user.role", "company"); // Assuming role is always 'company'
//     formDataObj.append("industry", formData.industry);
//     formDataObj.append("registration_id", formData.registration_id);
//     formDataObj.append("registration_documents", formData.registration_documents);
//     formDataObj.append("phone_number", formData.phone_number);
//     formDataObj.append("location", formData.location);
//     formDataObj.append("logo", formData.logo);
//     formDataObj.append("client_base", formData.client_base);

//     fetch("http://127.0.0.1:8000/api/company/register/", {
//       method: "POST",
//       body: formDataObj,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.text().then((text) => {
//             throw new Error(text || "Registration Failed!");
//           });
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setSuccessMessage("Company registered successfully!");
//         setErrorMessage("");
//         setFormData({ // Reset form after successful registration
//           industry: "",
//           registration_id: "",
//           registration_documents: null,
//           phone_number: "",
//           location: "",
//           client_base: false,
//           logo: null,
//           username: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//         });
//         setFormErrors({}); // Clear errors
//       })
//       .catch((error) => {
//         setErrorMessage(error.message || "An error occurred during registration.");
//       });
//   };

//   return (
//     <div className="new-project-form">
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="form-header">
//           <h2>Company Registration</h2>
//         </div>

//         {/* Username */}
//         <div className="form-group">
//           <label><FontAwesomeIcon icon={faUser} /> Username</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
//             required
//           />
//           {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
//         </div>

//         {/* Email */}
//         <div className="form-group">
//           <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
//             required
//           />
//           {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
//         </div>

//         {/* Password */}
//         <div className="form-group">
//           <label><FontAwesomeIcon icon={faLock} /> Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
//             required
//           />
//           {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
//         </div>

//         {/* Confirm Password */}
//         <div className="form-group">
//           <label><FontAwesomeIcon icon={faLock} /> Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
//             required
//           />
//           {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
//         </div>

//         {/* Industry */}
//         <div className="form-group">
//           <label><FontAwesomeIcon icon={faBriefcase} /> Industry</label>
//           <input
//             type="text"
//             name="industry"
//             value={formData.industry}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         {/* Registration ID */}
//         <div className="form-group">
//           <label><FontAwesomeIcon icon={faFileAlt} /> Registration ID</label>
//           <input
//             type="text"
//             name="registration_id"
//             value={formData.registration_id}
//             onChange={handleChange}
//             className={`form-control ${formErrors.registration_id ? 'is-invalid' : ''}`}
//           />
//           {formErrors.registration_id && <div className="invalid-feedback">{formErrors.registration_id}</div>}
//         </div>

//         {/* Registration Documents */}
//         <div className="form-group">
//           <label><FontAwesomeIcon icon={faFileAlt} /> Registration Documents</label>
//           <input
//             type="file"
//             name="registration_documents"
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         {/* Phone Number */}
//         <div className="form-group">
//           <label><FontAwesomeIcon icon={faPhone} /> Phone Number</label>
//           <input
//             type="text"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleChange}
//             className={`form-control ${formErrors.phone_number ? 'is-invalid' : ''}`}
//             required
//           />
//           {formErrors.phone_number && <div className="invalid-feedback">{formErrors.phone_number}</div>}
//         </div>

//         {/* Location */}
//         <div className="form-group">
//           <label>Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         {/* Logo */}
//         <div className="form-group">
//           <label>Company Logo</label>
//           <input
//             type="file"
//             name="logo"
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         {/* Client Base */}
//         <div className="form-group">
//           <label>Client Based Company?</label>
//           <div className="form-check form-check-inline">
//             <input
//               type="radio"
//               name="client_base"
//               value={true}
//               onChange={handleChange}
//               className="form-check-input"
//               checked={formData.client_base === true}
//             />
//             <label className="form-check-label">Yes</label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               type="radio"
//               name="client_base"
//               value={false}
//               onChange={handleChange}
//               className="form-check-input"
//               checked={formData.client_base === false}
//             />
//             <label className="form-check-label">No</label>
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary">Register</button>

//         {/* Success/Error Messages */}
//         {successMessage && <div className="alert alert-success">{successMessage}</div>}
//         {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//       </form>
//     </div>
//   );
// };


// export default CompanyForm;












import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faBriefcase, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    industry: "",
    registration_id: "",
    registration_documents: null,
    phone_number: "",
    location: "",
    client_base: false,
    logo: null,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({}); // To track errors for each field

  const validateForm = () => {
    let errors = {};
    if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone_number)) {
      errors.phone_number = "Invalid phone number format.";
    }
    if (formData.registration_id.length !== 14) {
      errors.registration_id = "Registration ID must be exactly 14 digits.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else if (type === "radio") {
      setFormData({
        ...formData,
        [name]: value === "true", // Convert string to boolean
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Reset error for the field being changed
    setFormErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Only proceed if validation passes

    // Prepare FormData object
    const formDataObj = new FormData();
    formDataObj.append("user.username", formData.username);
    formDataObj.append("user.email", formData.email);
    formDataObj.append("user.password", formData.password);
    formDataObj.append("user.role", "company"); // Assuming role is always 'company'
    formDataObj.append("industry", formData.industry);
    formDataObj.append("registration_id", formData.registration_id);
    formDataObj.append("registration_documents", formData.registration_documents);
    formDataObj.append("phone_number", formData.phone_number);
    formDataObj.append("location", formData.location);
    formDataObj.append("logo", formData.logo);
    formDataObj.append("client_base", formData.client_base);

    fetch("http://127.0.0.1:8000/api/company/register/", {
      method: "POST",
      body: formDataObj,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Registration Failed!");
          });
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage("Company registered successfully!");
        setErrorMessage("");
        setFormData({ // Reset form after successful registration
          industry: "",
          registration_id: "",
          registration_documents: null,
          phone_number: "",
          location: "",
          client_base: false,
          logo: null,
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setFormErrors({}); // Clear errors
      })
      .catch((error) => {
        setErrorMessage(error.message || "An error occurred during registration.");
      });
  };

  return (
    <div className="new-project-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Company Registration</h2>
        </div>

        {/* Username */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
            required
          />
          {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
            required
          />
          {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faLock} /> Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
            required
          />
          {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faLock} /> Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
            required
          />
          {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
        </div>

        {/* Industry */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faBriefcase} /> Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Registration ID */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faFileAlt} /> Registration ID</label>
          <input
            type="text"
            name="registration_id"
            value={formData.registration_id}
            onChange={handleChange}
            className={`form-control ${formErrors.registration_id ? 'is-invalid' : ''}`}
          />
          {formErrors.registration_id && <div className="invalid-feedback">{formErrors.registration_id}</div>}
        </div>

        {/* Registration Documents */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faFileAlt} /> Registration Documents</label>
          <input
            type="file"
            name="registration_documents"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faPhone} /> Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className={`form-control ${formErrors.phone_number ? 'is-invalid' : ''}`}
            required
          />
          {formErrors.phone_number && <div className="invalid-feedback">{formErrors.phone_number}</div>}
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Logo */}
        <div className="form-group">
          <label>Company Logo</label>
          <input
            type="file"
            name="logo"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Client Base */}
        <div className="form-group">
          <label>Client Based Company?</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="client_base"
              value="true"
              checked={formData.client_base === true}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="client_base"
              value="false"
              checked={formData.client_base === false}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">No</label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Register</button>

        {/* Success/Error Messages */}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default CompanyForm;
