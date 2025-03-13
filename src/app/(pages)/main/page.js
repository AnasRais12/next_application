"use client";
import React, { useState } from "react";
import axios from "axios";

function Page() {
  const [shipmentData, setShipmentData] = useState(null);
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  // ✅ Step 1: Create Address (POST request)
  const createAddress = async (isSender) => {
    try {
      const response = await axios.post(
        "https://api.goshippo.com/addresses/",
        {
          name: isSender ? "John Doe" : "Jane Doe",
          street1: "123 Main Street",
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
          country: "US",
          phone: "+1 555 555 5555",
          email: "test@example.com",
          is_residential: false,
        },
        {
          headers: {
            Authorization: `ShippoToken shippo_test_a97b9f8528a5ef7f01b17fe542157d5d780d0201`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`🏠 ${isSender ? "Sender" : "Receiver"} Address Created:`, response.data);

      if (isSender) {
        setSenderId(response.data.object_id);
      } else {
        setReceiverId(response.data.object_id);
      }

      return response.data.object_id;
    } catch (error) {
      console.error("❌ Error creating address:", error.response?.data || error);
    }
  };

  // ✅ Step 2: Create Shipment (POST request)
  const createShipment = async () => {
    if (!senderId || !receiverId) {
      console.error("❌ Sender or Receiver Address not found!");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.goshippo.com/shipments/",
        {
          address_from: senderId,
          address_to: receiverId,
          parcels: [
            {
              length: "10",
              width: "10",
              height: "10",
              distance_unit: "in",
              weight: "2",
              mass_unit: "lb",
            },
          ],
          async: false,
        },
        {
          headers: {
            Authorization: `ShippoToken shippo_test_a97b9f8528a5ef7f01b17fe542157d5d780d0201`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("🚀 Shipment Created:", response.data);
      setShipmentData(response.data);

      // ✅ Step 3: Fetch Shipment Details (GET request)
      fetchShipmentDetails(response.data.object_id);
    } catch (error) {
      console.error("❌ Error creating shipment:", error.response?.data || error);
    }
  };

  // ✅ Step 3: Get Shipment Details (GET request)
  const fetchShipmentDetails = async (shipmentId) => {
    try {
      const response = await axios.get(`https://api.goshippo.com/shipments/${shipmentId}`, {
        headers: {
          Authorization: `ShippoToken shippo_test_a97b9f8528a5ef7f01b17fe542157d5d780d0201`,
        },
      });

      console.log("📦 Shipment Details:", response.data);
      setShipmentDetails(response.data);
    } catch (error) {
      console.error("❌ Error fetching shipment details:", error.response?.data || error);
    }
  };

  // ✅ Step 0: Start Process (Create Addresses → Create Shipment)
  const startProcess = async () => {
    try {
      const sender = await createAddress(true);
      const receiver = await createAddress(false);
  
      if (sender && receiver) {
        console.log("✅ Addresses Created:", sender, receiver);
        setSenderId(sender);
        setReceiverId(receiver);
  
        // ✅ Address update hone ka wait karna
        setTimeout(() => {
          createShipment();
        }, 1000);
      } else {
        console.error("❌ Failed to create addresses!");
      }
    } catch (error) {
      console.error("❌ Error in startProcess:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">📦 Create Address → Shipment</h1>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={startProcess}
      >
        Start Process 🚀
      </button>

      {shipmentData && (
        <div className="mt-4 p-3 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold">✅ Shipment Created</h2>
          <p><strong>Shipment ID:</strong> {shipmentData.object_id}</p>
          <p><strong>Status:</strong> {shipmentData.is_complete ? "Complete" : "Pending"}</p>
        </div>
      )}

      {shipmentDetails && (
        <div className="mt-4 p-3 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold">📦 Shipment Details</h2>
          <p><strong>Object ID:</strong> {shipmentDetails.object_id}</p>
          <p><strong>Address From:</strong> {shipmentDetails.address_from}</p>
          <p><strong>Address To:</strong> {shipmentDetails.address_to}</p>
        </div>
      )}
    </div>
  );
}

export default Page;
