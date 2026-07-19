import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import DashboardLayout from "../../Layout/DashboardLayout";

import ClaimSearch from "../../../components/customer/ClaimSearch/ClaimSearch";
import ClaimFilter from "../../../components/customer/ClaimFilter/ClaimFilter";
import ClaimTable from "../../../components/customer/ClaimTable/ClaimTable";
import ClaimPagination from "../../../components/customer/ClaimPagination/ClaimPagination";
import ClaimDetailsModal from "../../../components/customer/ClaimDetailsModal/ClaimDetailsModal";

import "./MyClaims.css";

const MyClaims = () => {

    const [claims, setClaims] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [activeFilter, setActiveFilter] = useState("All");

    const [selectedClaim, setSelectedClaim] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;

    useEffect(() => {

        const fetchClaims = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await axios.get(

                    "http://localhost:5000/api/claims/my",

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

                setClaims(res.data.claims || []);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchClaims();

    }, []);

    const filteredClaims = useMemo(() => {

        let data = [...claims];

        if (activeFilter !== "All") {

            data = data.filter(

                claim => claim.status === activeFilter

            );

        }

        if (searchTerm.trim()) {

            const value = searchTerm.toLowerCase();

            data = data.filter(claim => {

                return (

                    (claim.claimId || "").toLowerCase().includes(value) ||

                    (claim.policyNo || "").toLowerCase().includes(value) ||

                    (claim.policyType || "").toLowerCase().includes(value) ||

                    (claim.title || "").toLowerCase().includes(value)

                );

            });

        }

        return data;

    }, [

        claims,

        activeFilter,

        searchTerm

    ]);

    const totalPages = Math.ceil(

        filteredClaims.length / pageSize

    );

    const currentClaims = filteredClaims.slice(

        (currentPage - 1) * pageSize,

        currentPage * pageSize

    );
        return (

        <DashboardLayout>

            <div className="my-claims-page">

                <div className="page-header">

                    <div>

                        <h2>My Claims</h2>

                        <p>

                            View and track all your insurance claims.

                        </p>

                    </div>

                </div>

                <ClaimSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <ClaimFilter
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />

                {loading ? (

                    <div className="loading-container">

                        <h3>Loading Claims...</h3>

                    </div>

                ) : (

                    <>

                        <ClaimTable
                            claims={currentClaims}
                            onView={setSelectedClaim}
                        />

                        {filteredClaims.length > pageSize && (

                            <ClaimPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />

                        )}

                    </>

                )}

                <ClaimDetailsModal
                    claim={selectedClaim}
                    onClose={() => setSelectedClaim(null)}
                />

            </div>

        </DashboardLayout>

    );

};

export default MyClaims;