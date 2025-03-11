import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"), { ssr: false });

const OrderTracking = () => {
  const order = {
    id: "123",
    status: "Shipped",
    location: { lat: 33.6844, lng: 73.0479 }, // Islamabad
  };

  const [status, setStatus] = useState(order.status);
  const [location, setLocation] = useState(order.location);

  useEffect(() => {
    if (!order?.id) return; // Prevent running if order is undefined

    const interval = setInterval(() => {
      fetch(`/api/order/${order.id}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data?.status || "Pending");
          setLocation(data?.location || order.location);
        })
        .catch((error) => console.error("Error fetching order:", error));
    }, 5000);

    return () => clearInterval(interval);
  }, [order?.id]);

  const statusColors = {
    Pending: "text-yellow-600",
    Shipped: "text-blue-600",
    Delivered: "text-green-600",
    Cancelled: "text-red-600",
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold">Order Tracking</h2>
      <p className={`mt-2 font-semibold ${statusColors[status] || "text-gray-600"}`}>
        Status: {status}
      </p>

      {location && (
        <div className="mt-4 h-64 w-full">
          <Map location={location} />
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
