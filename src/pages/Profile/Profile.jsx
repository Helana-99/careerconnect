import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function Profile() {
  const { id } = useParams();  // Get user ID from URL
  const [userData, setUserData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    specialization: '',
    skills: '',
    profile_image: null,
  });

  const [basicInfoEditing, setBasicInfoEditing] = useState(false);
  const [basicInfoData, setBasicInfoData] = useState({
    phone_number: '',
    years_of_experience: '',
    email: '',
    age: '',
    gender: '',
  });

  const [experienceList, setExperienceList] = useState([]);
  const [experienceInput, setExperienceInput] = useState({
    job_title: '',
    company: '',
    duration: '',
    description: '',
  });

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken") || Cookies.get("authToken");
      const response = await axios.get(`http://127.0.0.1:8000/api/individual/profile/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUserData(response.data);
      setUpdatedData({
        specialization: response.data.specialization || '',
        skills: response.data.skills || '',
        profile_image: response.data.profile_image || null,
      });
      setBasicInfoData({
        phone_number: response.data.phone_number || '',
        years_of_experience: response.data.years_of_experience || '',
        email: response.data?.user?.email || '',
        age: response.data.age || '',
        gender: response.data.gender || '',
      });

      setExperienceList(response.data.experiences || []);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken") || Cookies.get("authToken");

    const experienceData = {
      job_title: experienceInput.job_title,
      company: experienceInput.company,
      duration: experienceInput.duration,
      description: experienceInput.description,
    };

    try {
      await axios.put(
        'http://127.0.0.1:8000/api/individual/update/',
        { experience: [...experienceList, experienceData] },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      fetchUserData();
      setExperienceInput({ job_title: '', company: '', duration: '', description: '' });
    } catch (error) {
      console.error('Error adding experience', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>; // Show loading state if userData is not yet available
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="card cards profile-sidebar shadow-sm mb-4">
            <div className="card-body text-center">
              <img
                src={userData.profile_image ? `http://127.0.0.1:8000${userData.profile_image}` : "/default-profile.png"}
                alt="Profile"
                className="profile-image rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <h4 className="mb-0">{userData?.user?.username || 'N/A'}</h4>
              <p className="text-muted">{userData.specialization}</p>
              <div className="skills mb-3">
                {userData.skills
                  ? userData.skills.split(',').map((skill, index) => (
                      <span key={index} className="badge bg-secondary p-2 rounded-5 m-1">
                        {skill}
                      </span>
                    ))
                  : <span className="text-muted">No skills added</span>}
              </div>
              <button onClick={() => setBasicInfoEditing(true)} className="btn btn-secondary">Edit Profile</button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card cards shadow-sm mb-4">
            <div className="card-body">
              <h6>Basic Information</h6>
              {basicInfoEditing ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    name="phone_number"
                    value={basicInfoData.phone_number}
                    onChange={(e) => setBasicInfoData({ ...basicInfoData, phone_number: e.target.value })}
                    className="form-control mb-2"
                    placeholder="Phone Number"
                  />
                  <input
                    type="text"
                    name="years_of_experience"
                    value={basicInfoData.years_of_experience}
                    onChange={(e) => setBasicInfoData({ ...basicInfoData, years_of_experience: e.target.value })}
                    className="form-control mb-2"
                    placeholder="Years of Experience"
                  />
                  <input
                    type="email"
                    name="email"
                    value={basicInfoData.email}
                    onChange={(e) => setBasicInfoData({ ...basicInfoData, email: e.target.value })}
                    className="form-control mb-2"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="age"
                    value={basicInfoData.age}
                    onChange={(e) => setBasicInfoData({ ...basicInfoData, age: e.target.value })}
                    className="form-control mb-2"
                    placeholder="Age"
                  />
                  <input
                    type="text"
                    name="gender"
                    value={basicInfoData.gender}
                    onChange={(e) => setBasicInfoData({ ...basicInfoData, gender: e.target.value })}
                    className="form-control mb-2"
                    placeholder="Gender"
                  />
                  <button type="submit" className="btn btn-success">Save</button>
                </form>
              ) : (
                <div>
                  <p><strong>Email:</strong> {userData?.user?.email || 'N/A'}</p>
                  <p><strong>Phone Number:</strong> {userData.phone_number || 'N/A'}</p>
                  <p><strong>Years of Experience:</strong> {userData.years_of_experience || 'N/A'}</p>
                  <p><strong>Age:</strong> {userData.age || 'N/A'}</p>
                  <p><strong>Gender:</strong> {userData.gender || 'N/A'}</p>
                </div>
              )}
            </div>
          </div>

          <div className="card cards shadow-sm mb-4">
            <div className="card-body">
              <h6>Experience</h6>
              <ul>
                {experienceList.length > 0 ? (
                  experienceList.map((experience, index) => (
                    <li key={index}>
                      <strong>{experience.job_title}</strong> - {experience.company} ({experience.duration})<br />
                      <small>{experience.description}</small>
                    </li>
                  ))
                ) : (
                  <p>No experience added yet.</p>
                )}
              </ul>

              <form onSubmit={handleAddExperience}>
                <input
                  type="text"
                  name="job_title"
                  value={experienceInput.job_title}
                  onChange={(e) => setExperienceInput({ ...experienceInput, job_title: e.target.value })}
                  className="form-control mb-2"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  name="company"
                  value={experienceInput.company}
                  onChange={(e) => setExperienceInput({ ...experienceInput, company: e.target.value })}
                  className="form-control mb-2"
                  placeholder="Company"
                />
                <input
                  type="text"
                  name="duration"
                  value={experienceInput.duration}
                  onChange={(e) => setExperienceInput({ ...experienceInput, duration: e.target.value })}
                  className="form-control mb-2"
                  placeholder="Duration"
                />
                <textarea
                  name="description"
                  value={experienceInput.description}
                  onChange={(e) => setExperienceInput({ ...experienceInput, description: e.target.value })}
                  className="form-control mb-2"
                  placeholder="Description"
                ></textarea>
                <button type="submit" className="btn btn-primary">Add Experience</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
