import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";
import surveyorRoutes from "./routes/surveyorRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/*
=========================================
MIDDLEWARE
=========================================
*/

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);

app.use(helmet());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

/*
=========================================
HEALTH CHECK
=========================================
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Insurance Claim Management API Running"
  });
});

/*
=========================================
API ROUTES
=========================================
*/

app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/claims",
  claimRoutes
);
app.use(
  "/api/surveyors",
  surveyorRoutes
);
app.use(
  "/api/admin",
  adminRoutes
);
/*
=========================================
404 HANDLER
=========================================
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

/*
=========================================
GLOBAL ERROR HANDLER
=========================================
*/

app.use(
  (err, req, res, next) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error"
    });
  }
);

export default app;