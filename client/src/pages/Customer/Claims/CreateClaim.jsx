import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

import DashboardLayout from "../../Layout/DashboardLayout";

import ClaimStepper from "../../../components/customer/CreateClaim/ClaimStepper/ClaimStepper";
import DocumentUploader from "../../../components/customer/CreateClaim/DocumentUploader/DocumentUploader";

import "./CreateClaim.css";

const CreateClaim = () => {

    const {

        register,

        handleSubmit,

        reset

    } = useForm();

    const onSubmit = async (data) => {

        try {

            const token = localStorage.getItem("token");

            await axios.post(

                "http://localhost:5000/api/claims/create",

                data,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            toast.success("Claim Created Successfully");

            reset();

        }

        catch(error){

            toast.error("Failed to create claim");

            console.error(error);

        }

    };

    return(

        <DashboardLayout>

            <div className="create-claim-page">

                <div className="claim-form-card">

                    <h2>Create Insurance Claim</h2>

                    <p>

                        Fill in the information below to submit your insurance claim.

                    </p>

                    <ClaimStepper currentStep={1}/>

                    <form

                        className="claim-form"

                        onSubmit={handleSubmit(onSubmit)}

                    >

                        <div className="form-group">

                            <label>

                                Claim Title

                            </label>

                            <input

                                type="text"

                                placeholder="Enter claim title"

                                {...register("title",{required:true})}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Claim Type

                            </label>

                            <select

                                {...register("claim_type",{required:true})}

                            >

                                <option value="">

                                    Select Type

                                </option>

                                <option>

                                    Health

                                </option>

                                <option>

                                    Vehicle

                                </option>

                                <option>

                                    Life

                                </option>

                                <option>

                                    Property

                                </option>

                                <option>

                                    Travel

                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Claim Amount

                            </label>

                            <input

                                type="number"

                                placeholder="Enter amount"

                                {...register("amount",{required:true})}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Incident Date

                            </label>

                            <input

                                type="date"

                            />

                        </div>

                        <div className="form-group full-width">

                            <label>

                                Description

                            </label>

                            <textarea

                                placeholder="Describe the incident"

                                {...register("description",{required:true})}

                            />

                        </div>

                        <div className="form-group full-width">

                            <DocumentUploader

                                register={register}

                            />

                        </div>

                        <button

                            className="submit-btn"

                            type="submit"

                        >

                            Submit Claim

                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default CreateClaim;