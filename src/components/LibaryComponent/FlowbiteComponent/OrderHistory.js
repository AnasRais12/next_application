import { useFetchOrderlist } from "@/customHooks/useFetchOrderHisotry";
import { useState, useEffect } from "react";
import useSession from "@/utils/UserExist/GetSession";
import { RxCross2 } from "react-icons/rx";
import { FiSearch, FiFilter, FiDownload, FiPrinter } from "react-icons/fi";
import CustomSpinner from "@/components/Spinner";

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

  const session = useSession()
  const { orderHistoryDetail, orderHistoryLoading } = useFetchOrderlist(session?.user?.id)
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

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



  const filteredOrders = orderHistoryDetail
    .filter(order => {
      const matchesSearch = order.order_id
        .toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })

  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;
    console.log("ye rahaa orderrrrss ", order)
    return (

      <div className="fixed inset-0 bg-black z-[9999]  bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg  w-full max-w-2xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-700"
              >
                <RxCross2 className="text-[22px]" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex sm:flex-col sm:justify-start justify-between flex-row">
                  <p className="text-gray-600 sm:w-fit w-[60%]">Order Number</p>
                  <p className="font-medium  sm:text-start text-end">{order.order_id}</p>
                </div>
                <div className="flex sm:flex-col sm:justify-start justify-between flex-row">
                  <p className="text-gray-600">Date</p>
                  <p className="sm:w-fit w-[70%] sm:text-[16px] text-[14px] text-end">
                    {new Date(order?.created_at).toLocaleString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
                <div className="flex sm:flex-col  sm:justify-start justify-between flex-row">
                  <p className="text-gray-600 capitalize">Status</p>
                  {order.status}
                </div>
                <div className="flex sm:flex-col sm:justify-start justify-between flex-row">
                  <p className="text-gray-600">Total</p>
                  <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6 pl-[-6px]">
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Item</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-center w-full  bg-gray-100">
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-2 border-r-2 py-1 text-left w-full text-[12px]">{item.product_name}</td>
                          <td className="px-2 py-2 border-r-2 ">{item.quantity}</td>
                          <td className="px-2 py-2 border-r-2 ">${item.product_price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="sm:mt-6 custom:mt-6 xs:mt-2 custom:space-x-3 custom:flex-row flex sm:flex-row xs:flex-col justify-end sm:space-x-3 xs:space-y-2">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-md hover:bg-gray-200 flex items-center"
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
      <div className="min-h-screen  p-4">
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

  if (orderHistoryLoading) {
    return <CustomSpinner />
  }
  console.log(orderHistoryDetail, "OrderHistoryDetail")
  return (
    <>
      {orderHistoryDetail.length > 0 ? (
        <div className="min-h-screen bg-white my-20 p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-5">Order History</h1>

            <div className="bg-gray-50 rounded-lg shadow-lg border-t-2 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border focus:outline-2 focus:outline-orange-400 shadow-md rounded-md w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative  shadow-md">
                    <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      className="pl-10 pr-4 py-2 border rounded-md appearance-none bg-white"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      {[...new Set(orderHistoryDetail.map(item => item?.status))].map((status, idx) => (
                        <option key={idx} value={status}>{status}</option>
                      ))}
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

                        >
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"

                        >
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-200">
                      {filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-[14px] whitespace-nowrap">
                            {new Date(order?.created_at).toLocaleString('en-US', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.order_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${order.total_amount.toFixed(2)}
                          </td>
                          <td className={`${order.payment_method == 'Credit Card' ? ' text-green-400' : 'text-blue-600'} px-6 py-4 capitalize whitespace-nowrap`}>
                            {order.payment_method}
                          </td>
                          <td
                            className={`${order.status === 'Pending' ? 'text-yellow-800'
                              : order.status === 'completed' ? 'text-green-600'
                                : 'text-red-600'} px-6 py-4 capitalize whitespace-nowrap`}>
                            {order.status}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-gray-500 hover:text-orange-800 font-medium"
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
      ) : (
        <>
          <div className='w-full flex-col gap-3 h-screen flex justify-center items-center'>
            <p>You haven’t placed any orders yet. Start shopping and track your orders here!</p>
            <button onClick={() => router.push('/home')} className='py-3 px-6 border-unique border-2 hover:border-gray-50 hover:bg-unique hover:text-white text-unique'>Shop Now</button>

          </div>
        </>
      )}
    </>

  );
};

export default OrderHistory;
