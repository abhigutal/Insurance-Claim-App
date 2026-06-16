import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const SubmitInspection = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/surveyor/submit",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Report Submitted");
    } catch (err) {
      toast.error("Submission Failed");
    }
  };

  return (
    <div className="glass-card">
      <h2>Submit Inspection</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Claim ID" {...register("claim_id")} />

        <textarea placeholder="Report" {...register("report")} />

        <select {...register("damage_level")}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select {...register("recommendation")}>
          <option value="approve">Approve</option>
          <option value="reject">Reject</option>
          <option value="review">Review</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitInspection;