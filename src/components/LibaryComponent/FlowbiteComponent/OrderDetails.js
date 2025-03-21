import Map from "@/components/Map";
import { FiDownload, FiPrinter } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

export const OrderDetailsModal = ({ order, onClose }) => {
    const router = useRouter()
    if (!order) return null;
    console.log("ye rahaa orderrrrss ", order)
    const orderId =  order?.order_id?.replace("#", "")
    return (

        <div className="fixed inset-0 bg-black z-[9999]  bg-opacity-50 flex items-center justify-center p-4">
            <div className={`bg-white  rounded-lg  w-full max-w-2xl`}>
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
                                <p className="text-gray-600 capitalize">Payment_Status</p>
                                {order?.payment_status}
                            </div>
                            <div className="flex sm:flex-col sm:justify-start justify-between flex-row">
                                <p className="text-gray-600">Total</p>
                                <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="mt-6 pl-[-6px]">
                            <div className={` rounded-lg border-2   ${order?.items?.length == 1 ? 'h-fit' : 'h-36'}  mb-4 overflow-y-auto overflow-x-auto`}>
                                <table className="w-full ">
                                    <thead className="bg-gray-50 border-b-2">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm border-r-2 font-medium text-gray-500">Item</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium border-r-2  text-gray-500">Quantity</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y  text-center w-full  ">
                                        {order.items.map((item, index) => (
                                            <tr className="" key={index} >
                                                <td className="px-2 border-r-2 py-1 text-left w-full text-[12px]">{item.product_name}</td>
                                                <td className="px-2 py-2 border-r-2 ">{item.quantity}</td>
                                                <td className="px-2 py-2  ">${item.product_price.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {order?.status === "Completed" ? (
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
                    ) : (
                        <>
                            
                            <div className="sm:mt-6 custom:mt-6 xs:mt-2 custom:space-x-3 custom:flex-row flex sm:flex-row xs:flex-col justify-end items-center w-fill  sm:space-x-3 xs:space-y-2">
                            <button
                                    className="px-4 py-2 text-sm font-medium text-white xs:w-full bg-orange-600 rounded-md hover:bg-blue-700 "
                                    onClick={()=>router.push(`/ordertracking/${orderId}`)}
                                >
                                    Track Order
                                </button>
                                <button
                                    className="px-4 py-2 text-sm w-fit xs:w-full font-medium text-white bg-[red] rounded-md hover:bg-[red] "
                                >
                                    Cancel Order
                                </button>
                              

                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};