
/* ====== Transaction history ====== */
/* Organization names mirror the "Our Partners" directory (see partnerList.jsx)
   so transactions read consistently across the product. EINs are placeholder.
   `user` is the attributed giver: "You", or an FFG team member (ffg: true →
   rendered with an [FFG] badge). Most activity is attributed to You; the rest
   to [FFG] Mark.
   `flow` drives the amount sign and its hover explanation:
     "credit"  → +$amount  ("Account credit")
     "debit"   → -$amount  ("Account debit")
     "upload"  →  $amount  ("Donation upload") */
const TRANSACTIONS = [
{ amount: 50000, date: "04/20/26", org: "Jesse Tree", ein: "82-1043567", status: "Pending", user: "You", flow: "upload" },
{ amount: 50000, date: "03/18/26", org: "Bright Path Learning", ein: "47-2298104", status: "Completed", user: "You", flow: "upload" },
{ amount: 50000, date: "02/11/26", org: "Open Harvest", ein: "26-4471902", status: "Completed", user: "You", flow: "upload" },
{ amount: 12000, date: "01/27/26", org: "Riverstone Counsel", ein: "91-3380715", status: "Completed", user: "You", flow: "debit" },
{ amount: 75000, date: "12/15/25", org: "North Star Foundation", ein: "54-1827096", status: "Completed", user: "You", flow: "credit" },
{ amount: 25000, date: "12/02/25", org: "Jesse Tree", ein: "82-1043567", status: "Failed", user: "You", flow: "upload" },
{ amount: 15000, date: "11/19/25", org: "Open Harvest", ein: "26-4471902", status: "Completed", user: "Mark", ffg: true, flow: "credit" },
{ amount: 40000, date: "11/04/25", org: "Bright Path Learning", ein: "47-2298104", status: "Completed", user: "You", flow: "upload" },
{ amount: 8500, date: "10/22/25", org: "North Star Foundation", ein: "54-1827096", status: "Completed", user: "You", flow: "debit" },
{ amount: 60000, date: "10/08/25", org: "Riverstone Counsel", ein: "91-3380715", status: "Completed", user: "Mark", ffg: true, flow: "credit" },
{ amount: 30000, date: "09/25/25", org: "Open Harvest", ein: "26-4471902", status: "Completed", user: "You", flow: "upload" },
{ amount: 20000, date: "09/11/25", org: "Jesse Tree", ein: "82-1043567", status: "Completed", user: "You", flow: "credit" },
{ amount: 75000, date: "08/28/25", org: "Bright Path Learning", ein: "47-2298104", status: "Completed", user: "You", flow: "upload" },
{ amount: 18000, date: "08/14/25", org: "North Star Foundation", ein: "54-1827096", status: "Cancelled", user: "Mark", ffg: true, flow: "credit" },
{ amount: 6500, date: "07/30/25", org: "Riverstone Counsel", ein: "91-3380715", status: "Completed", user: "You", flow: "debit" },
{ amount: 22000, date: "07/16/25", org: "Open Harvest", ein: "26-4471902", status: "Completed", user: "You", flow: "upload" },
{ amount: 35000, date: "07/01/25", org: "Jesse Tree", ein: "82-1043567", status: "Completed", user: "You", flow: "credit" },
{ amount: 10000, date: "06/17/25", org: "Bright Path Learning", ein: "47-2298104", status: "Completed", user: "Mark", ffg: true, flow: "credit" },
{ amount: 55000, date: "06/03/25", org: "North Star Foundation", ein: "54-1827096", status: "Completed", user: "You", flow: "upload" },
{ amount: 9000, date: "05/20/25", org: "Riverstone Counsel", ein: "91-3380715", status: "Completed", user: "You", flow: "debit" },
{ amount: 16500, date: "05/06/25", org: "Open Harvest", ein: "26-4471902", status: "Reversed", user: "Mark", ffg: true, flow: "credit" },
{ amount: 42000, date: "04/22/25", org: "Jesse Tree", ein: "82-1043567", status: "Completed", user: "You", flow: "upload" },
{ amount: 38000, date: "04/08/25", org: "Bright Path Learning", ein: "47-2298104", status: "Completed", user: "You", flow: "credit" },
{ amount: 14000, date: "03/25/25", org: "North Star Foundation", ein: "54-1827096", status: "Completed", user: "You", flow: "upload" },
{ amount: 65000, date: "03/11/25", org: "Riverstone Counsel", ein: "91-3380715", status: "Completed", user: "Mark", ffg: true, flow: "credit" }];


export { TRANSACTIONS };
