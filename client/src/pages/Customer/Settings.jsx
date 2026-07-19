import React, { useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import "./Settings.css";

const Settings = () => {

    const [settings, setSettings] = useState({

        emailNotifications: true,

        smsNotifications: false,

        darkMode: false,

        twoFactorAuth: false

    });

    const handleToggle = (key) => {

        setSettings(prev => ({

            ...prev,

            [key]: !prev[key]

        }));

    };

    return (

        <DashboardLayout>

            <div className="settings-page">

                <div className="settings-card">

                    <h2>Settings</h2>

                    <p>

                        Manage your account preferences and security.

                    </p>

                    <div className="setting-item">

                        <div>

                            <h4>Email Notifications</h4>

                            <span>

                                Receive claim updates by email.

                            </span>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={() =>
                                    handleToggle("emailNotifications")
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    <div className="setting-item">

                        <div>

                            <h4>SMS Notifications</h4>

                            <span>

                                Receive SMS alerts.

                            </span>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={settings.smsNotifications}
                                onChange={() =>
                                    handleToggle("smsNotifications")
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    <div className="setting-item">

                        <div>

                            <h4>Dark Mode</h4>

                            <span>

                                Enable dark appearance.

                            </span>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={settings.darkMode}
                                onChange={() =>
                                    handleToggle("darkMode")
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    <div className="setting-item">

                        <div>

                            <h4>Two Factor Authentication</h4>

                            <span>

                                Add an extra layer of security.

                            </span>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={settings.twoFactorAuth}
                                onChange={() =>
                                    handleToggle("twoFactorAuth")
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    <button className="save-settings">

                        Save Settings

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default Settings;