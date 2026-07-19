import React, { useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import "./Profile.css";

const Profile = () => {

    const [user, setUser] = useState({

        fullName: "Abhi User",

        email: "abhi@example.com",

        mobile: "9876543210",

        aadhaar: "XXXX-XXXX-1234",

        dob: "2002-01-15",

        gender: "Male",

        address: "Pune, Maharashtra"

    });

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        alert("Profile Updated Successfully");

    };

    return (

        <DashboardLayout>

            <div className="profile-page">

                <div className="profile-card">

                    <div className="profile-header">

                        <div className="profile-avatar">

                            {user.fullName.charAt(0)}

                        </div>

                        <div>

                            <h2>{user.fullName}</h2>

                            <p>{user.email}</p>

                        </div>

                    </div>

                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                name="fullName"
                                value={user.fullName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Mobile</label>

                            <input
                                type="text"
                                name="mobile"
                                value={user.mobile}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Aadhaar</label>

                            <input
                                type="text"
                                name="aadhaar"
                                value={user.aadhaar}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Date of Birth</label>

                            <input
                                type="date"
                                name="dob"
                                value={user.dob}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Gender</label>

                            <select
                                name="gender"
                                value={user.gender}
                                onChange={handleChange}
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>

                        </div>

                        <div className="form-group full-width">

                            <label>Address</label>

                            <textarea
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            className="save-btn"
                            type="submit"
                        >
                            Save Changes
                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default Profile;