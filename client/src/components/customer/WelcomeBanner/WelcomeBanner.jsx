import React from "react";
import "./WelcomeBanner.css";

const WelcomeBanner = () => {

  const hour = new Date().getHours();

  let greeting = "Welcome";

  if (hour < 12) greeting = "Good Morning";

  else if (hour < 17) greeting = "Good Afternoon";

  else greeting = "Good Evening";

  return (

    <div className="welcome-banner">

      <div className="banner-content">

        <span className="greeting">

          {greeting} 👋

        </span>

        <h1>

          Welcome Back

        </h1>

        <p>

          Manage your insurance claims quickly, securely and effortlessly.

        </p>

        <button>

          Create New Claim

        </button>

      </div>

      <div className="banner-image">

        <div className="circle one"></div>

        <div className="circle two"></div>

        <div className="shield">

🛡️

        </div>

      </div>

    </div>

  );

};

export default WelcomeBanner;