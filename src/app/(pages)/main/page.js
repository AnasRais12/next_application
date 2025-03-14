// "use client";
// import { useState } from "react";

// export default function Page() {
//   const [trackingNumber, setTrackingNumber] = useState("");
//   const [courier, setCourier] = useState("tcs"); // Default courier
//   const [trackingData, setTrackingData] = useState(null);
//   const [error, setError] = useState("");

//   const handleTrack = async () => {
//     setError("");
//     setTrackingData(null);

//     if (!trackingNumber) {
//       setError("Please enter a tracking number.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/createtracking?trackingNumber=${trackingNumber}&courier=${courier}`);
//       const data = await response.json();

//       if (data.error) {
//         setError("Tracking number not found.");
//       } else {
//         setTrackingData(data);
//       }
//     } catch (err) {
//       setError("Something went wrong.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
//       <h1 className="text-xl font-bold mb-4">Track Your Parcel 📦</h1>

//       <input
//         type="text"
//         value={trackingNumber}
//         onChange={(e) => setTrackingNumber(e.target.value)}
//         placeholder="Enter Tracking Number"
//         className="border p-2 w-full rounded-md"
//       />

//       <select
//         value={courier}
//         onChange={(e) => setCourier(e.target.value)}
//         className="border p-2 w-full rounded-md mt-2"
//       >
//         <option value="tcs">TCS</option>
//         <option value="dhl">DHL</option>
//         <option value="fedex">FedEx</option>
//       </select>

//       <button
//         onClick={handleTrack}
//         className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md"
//       >
//         Track Now 🚀
//       </button>

//       {error && <p className="text-red-500 mt-2">{error}</p>}

//       {trackingData && (
//         <div className="mt-5 p-3 border rounded-md">
//           <h2 className="text-lg font-bold">Tracking Details</h2>
//           <p><strong>Status:</strong> {trackingData.data.status}</p>
//           <p><strong>Origin:</strong> {trackingData.data.origin}</p>
//           <p><strong>Destination:</strong> {trackingData.data.destination}</p>
//         </div>
//       )}
//     </div>
//   );
// }
