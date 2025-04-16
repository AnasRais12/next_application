import { useFetchOrderlist } from '@/customHooks/useFetchOrderHisotry';
import { useState, useEffect } from 'react';
import useSession from '@/utils/UserExist/GetSession';
import Map from '@/components/Map';
import { RxCross2 } from 'react-icons/rx';
import { FiSearch, FiFilter, FiDownload, FiPrinter } from 'react-icons/fi';
import CustomSpinner from '@/components/Spinner';
import { OrderDetailsModal } from './OrderDetails';

const OrderHistory = () => {
  const session = useSession();
  const { orderHistoryDetail, orderHistoryLoading } = useFetchOrderlist(
    session?.user?.id
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter Orders //
  const filteredOrders = orderHistoryDetail.filter((order) => {
    const matchesSearch = order.order_id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // OrderHISTORY Loader//
  if (orderHistoryLoading) {
    return <CustomSpinner />;
  }
  return (
    <>
      {orderHistoryDetail.length > 0 ? (
    <div className="min-h-screen bg-gray-50 mt-20 mb-8 p-2 sm:p-4">
    <div className="w-[98%] mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Order History
      </h1>
  
      <div className="rounded-lg shadow-md border border-gray-200 bg-white p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-md w-full md:w-64 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                {[
                  ...new Set(
                    orderHistoryDetail.map((item) => item?.status)
                  ),
                ].map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
  
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider border-b border-gray-200">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider border-b border-gray-200">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider border-b border-gray-200">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider border-b border-gray-200">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider border-b border-gray-200">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider border-b border-gray-200">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-emerald-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                      {new Date(order?.created_at).toLocaleString(
                        'en-US',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        }
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      {order.order_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                      ${order.total_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.payment_method === 'Credit Card' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.payment_method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm border-r border-gray-200">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.payment_status === 'Unpaid'
                          ? 'bg-red-100 text-red-800'
                          : order.payment_status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : order.payment_status === 'Refunded'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-purple-100 text-purple-800'
                      }`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm border-r border-gray-200">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-all duration-200"
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
        setSelectedOrder={setSelectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    )}
  </div>
      ) : (
        <>
          <div className="w-full flex-col gap-3 h-screen flex justify-center items-center">
            <p>
              You haven’t placed any orders yet. Start shopping and track your
              orders here!
            </p>
            <button
              onClick={() => router.push('/home')}
              className="py-3 px-6 border-unique border-2 hover:border-gray-50 hover:bg-unique hover:text-white text-unique"
            >
              Shop Now
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default OrderHistory;
