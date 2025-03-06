import { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiDownload, FiPrinter } from "react-icons/fi";

const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    date: new Date(2024, 0, 15),
    total: 299.99,
    status: "Delivered",
    items: [
      { name: "Premium Headphones", quantity: 1, price: 199.99 },
      { name: "Wireless Charger", quantity: 2, price: 50.00 }
    ]
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    date: new Date(2024, 0, 10),
    total: 459.97,
    status: "Processing",
    items: [
      { name: "Smart Watch", quantity: 1, price: 399.99 },
      { name: "Screen Protector", quantity: 3, price: 19.99 }
    ]
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    date: new Date(2024, 0, 5),
    total: 799.99,
    status: "Shipped",
    items: [
      { name: "Laptop", quantity: 1, price: 799.99 }
    ]
  }
];

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc"
    }));
  };

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc" 
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime();
      }
      if (sortConfig.key === "total") {
        return sortConfig.direction === "asc" ? a.total - b.total : b.total - a.total;
      }
      return 0;
    });

  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "Delivered":
          return "bg-green-100 text-green-800";
        case "Processing":
          return "bg-yellow-100 text-yellow-800";
        case "Shipped":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  };

  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Order Number</p>
                  <p className="font-medium">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <StatusBadge status={order.status} />
                </div>
                <div>
                  <p className="text-gray-600">Total</p>
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-medium mb-2">Items</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Item</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center"
                onClick={() => window.print()}
              >
                <FiPrinter className="mr-2" /> Print
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
                onClick={() => alert("Download started")}
              >
                <FiDownload className="mr-2" /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 my-20 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Order History</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="pl-10 pr-4 py-2 border rounded-md appearance-none bg-white"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </div>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("total")}
                    >
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderHistory;
