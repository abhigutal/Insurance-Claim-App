import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

export const dashboardStats = [

{
title:"Active Claims",
value:5,
icon:FaClipboardList,
color:"#2563eb",
bg:"#eff6ff"
},

{
title:"Pending Claims",
value:2,
icon:FaClock,
color:"#f59e0b",
bg:"#fffbeb"
},

{
title:"Approved",
value:12,
icon:FaCheckCircle,
color:"#16a34a",
bg:"#ecfdf5"
},

{
title:"Rejected",
value:1,
icon:FaTimesCircle,
color:"#dc2626",
bg:"#fef2f2"
}

];

export const recentClaims=[

{
id:"CLM-1001",
policy:"Health",
amount:"₹25,000",
status:"Approved",
date:"12 Jul 2026"
},

{
id:"CLM-1002",
policy:"Vehicle",
amount:"₹18,000",
status:"Pending",
date:"15 Jul 2026"
},

{
id:"CLM-1003",
policy:"Life",
amount:"₹50,000",
status:"Active",
date:"18 Jul 2026"
}

];

export const progressData=[
"Claim Submitted",
"Documents Verified",
"Survey Assigned",
"Claim Under Review",
"Payment Completed"
];