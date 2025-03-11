import { useFetchOrderlist } from "@/customHooks/useFetchOrderHisotry";
import { useState, useEffect } from "react";
import useSession from "@/utils/UserExist/GetSession";
import Map from "@/components/Map";
import { RxCross2 } from "react-icons/rx";
import { FiSearch, FiFilter, FiDownload, FiPrinter } from "react-icons/fi";
import CustomSpinner from "@/components/Spinner";
import { OrderDetailsModal } from "./OrderDetails";



const OrderHistory = () => {

  const session = useSession()
  const { orderHistoryDetail, orderHistoryLoading } = useFetchOrderlist(session?.user?.id)
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orderHistoryDetail
    .filter(order => {
      const matchesSearch = order.order_id
        .toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })

  // if (loading) {
  //   return (
  //     <div className="min-h-screen  p-4">
  //       <div className="max-w-7xl mx-auto">
  //         <div className="animate-pulse space-y-4">
  //           <div className="h-12 bg-gray-200 rounded w-1/4"></div>
  //           <div className="h-8 bg-gray-200 rounded w-full"></div>
  //           <div className="space-y-3">
  //             {[1, 2, 3].map((i) => (
  //               <div key={i} className="h-20 bg-gray-200 rounded"></div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
                        Payment
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
                            className={`${order.payment_status === 'Pending' ? 'text-yellow-800'
                              : order.status === 'completed' ? 'text-green-600'
                                : 'text-red-600'} px-6 py-4 capitalize whitespace-nowrap`}>
                            {order.payment_status}
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
