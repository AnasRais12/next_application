import { useFetchOrderlist } from '@/customHooks/useFetchOrderHisotry';
import { useState, useEffect } from 'react';
import useSession from '@/utils/UserExist/GetSession';
import Map from '@/components/Map';
import { RxCross2 } from 'react-icons/rx';
import { FiSearch, FiFilter, FiDownload, FiPrinter, FiPackage, FiShoppingBag, FiChevronDown, FiEye } from 'react-icons/fi';
import CustomSpinner from '@/components/Spinner';
import { OrderDetailsModal } from './OrderDetails';
import Link from 'next/link';

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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-20 mb-8 p-2 sm:p-6">
        <div className="w-full sm:px-4  mx-auto">
          <div className="flex sm:px-0 px-2  flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className=''>
              <h1 className="sm:text-4xl text-3xl font-bold  text-primary  mb-1">Your Orders</h1>
              <p className="text-gray-500 sm:text-lg text-sm">Track and manage your purchases</p>
            </div>
            <Link href="/home"
              className="px-5 py-2.5 cursor-pointer bg-primary text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <FiShoppingBag />
              Continue Shopping
            </Link>
          </div>
  
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="sm:p-6 p-2 py-6 border-b border-gray-100  ">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1  max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by order ID"
                    className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiFilter className="text-gray-400" />
                    </div>
                    <select
                      className="appearance-none pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-all duration-200"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      {[...new Set(orderHistoryDetail.map(item => item?.status))].map((status, idx) => (
                        <option key={idx} value={status}>{status}</option>
                      ))}
                    </select>
                    <div className="absolute sm:flex hidden inset-y-0 right-0 pr-2  items-center pointer-events-none">
                      <FiChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <FiPackage className="h-12 w-12 text-emerald-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">No orders match your criteria</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">Try adjusting your search or filter to find what you're looking for</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedStatus('All');
                  }}
                  className="px-5 py-2.5 border border-emerald-300 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="shadow-md border-t-2">
                    <tr>
                      {['Date', 'Order ID', 'Total', 'Transaction', 'Payment', 'Status', 'Actions'].map((header) => (
                        <th 
                          key={header}
                          className="px-6 py-3 border-r-2 text-left text-md font-semibold text-primary capitalize "
                        >
                          <div className="flex items-center gap-1">
                            {header}
                            {header !== 'Actions' && <FiChevronDown className="text-gray-400 text-xs opacity-0 hover:opacity-100" />}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredOrders.map((order) => (
                      <tr 
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 border-r-2 py-4 whitespace-nowrap">
                          <div className="text-md text-gray-900 font-medium">
                            {new Date(order?.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs  text-gray-500">
                            {new Date(order?.created_at).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r-2 whitespace-nowrap">
                          <div className="text-md font-medium text-gray-900">
                            #{order.order_id}
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r-2 whitespace-nowrap">
                          <div className="text-md font-semibold text-gray-900">
                            ${order.total_amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r-2 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.payment_method === 'Credit Card' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.payment_method}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-r-2 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                        <td className="px-6 py-4 border-r-2 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1 hover:underline focus:outline-none transition-colors duration-200"
                          >
                            <FiEye className="inline" /> Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
  
          {filteredOrders.length > 0 && (
            <div className="mt-4 px-4 flex justify-between items-center text-md text-gray-500">
              <div>
                Showing {filteredOrders.length} of {orderHistoryDetail.length} orders
              </div>

            </div>
          )}
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiPackage className="h-12 w-12 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Orders Yet</h2>
          <p className="text-gray-500 mb-6">
            You haven't placed any orders yet. Start shopping and track your orders here!
          </p>
          <button
            onClick={() => router.push('/home')}
            className="w-full max-w-xs mx-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiShoppingBag /> Start Shopping
          </button>
        </div>
      </div>
    )}
  </>
  );
};

export default OrderHistory;
