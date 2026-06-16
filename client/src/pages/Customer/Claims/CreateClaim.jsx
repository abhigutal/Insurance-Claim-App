import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const CreateClaim = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/claims/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Claim Created");
    } catch (err) {
      toast.error("Failed to create claim");
    }
  };

  return (
    <div className="glass-card">
      <h2>Create Claim</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Title" {...register("title")} />
        <input placeholder="Type" {...register("claim_type")} />
        <input placeholder="Amount" {...register("amount")} />
        <textarea placeholder="Description" {...register("description")} />

        <button type="submit">Submit Claim</button>
      </form>
    </div>
  );
};

export default CreateClaim;