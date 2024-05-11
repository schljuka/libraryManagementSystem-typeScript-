import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import './ProfileLoanHistory.css';
import { RootState } from "../../../../redux/ReduxStore";
import { LoanRecord } from "../../../../models/LoanRecord";
import { ProfileLoanRecord } from "../ProfileLoanRecord/ProfileLoanRecord";

export const ProfileLoanHistory: React.FC = () => {
    const user = useSelector((state: RootState) => state.authentication.profileUser);

    const [records, setRecords] = useState<LoanRecord[]>([]);

    const fetchRecordsUser = async () => {
        if (user) {
            try {
                const res = await axios.post('http://localhost:8000/loan/query', {
                    property: "patron",
                    value: user._id
                })
                const r = res.data.records;
                setRecords(r);
            } catch (error) {
                throw new Error;
            }
        }
    }

    useEffect(() => {
        fetchRecordsUser();
    }, [user])

    return (
        <div className="profile-loan-history">
            <h3 className="profile-loan-header">{user?.firstName}'s Item Loan History:</h3>
            {
                records.map((record) => {
                    return (<ProfileLoanRecord key={record._id} record={record} />
                    )
                })
            }
        </div>
    )
}