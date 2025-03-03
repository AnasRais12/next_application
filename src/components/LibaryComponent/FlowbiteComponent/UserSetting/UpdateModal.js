import CSpinner from "@/components/CSpinner";

const UpdateModal = ({ modalData, setModalData, closeModal, handleSave,loading }) => {
  return (
    modalData.isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg w-[95%] max-w-md p-3 md:p-6">
          {modalData.label === 'country' || modalData.label === 'city' ? (
            <>
              <label className="block text-sm mb-2 font-normal capitalize">{modalData.label}:</label>
              <select
                value={modalData.value}
                
                onChange={(e) => {
                  setModalData({ ...modalData, value: e.target.value });
                }}
                className="w-full focus:outline-2 mb-3 focus:outline-orange-400 border-2 border-[#ccc] rounded-[10px] p-2 "
              >
                {modalData.label === 'country' ? (
                  <>
                    <option value="">Select {modalData.label}</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </>

                ) : (
                  <>

                    <option value="">Select {modalData.label}</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Pindi">Pindi</option>
                  </>

                )}

              </select>
            </>
          ) : (
            <>
            <label className="block text-sm mb-2 font-normal capitalize">{modalData.label}:</label>
            <input
              type={modalData.type}
              value={modalData.value}
              onChange={(e) => {
                setModalData({ ...modalData, value: e.target.value });
              }}
              className="w-full p-2 border-2 focus:border-orange-600 border-[#ccc] rounded-md mb-2 sm:mb-4"
              placeholder={`Enter ${modalData.label}`}
            />
            </>
          )}
          <div className="flex sm:flex-row sm:gap-2 gap-2 flex-col justify-end">
            <button onClick={closeModal} className="bg-orange-600 px-3 text-white sm:py-2 py-1 rounded-lg hover:text-gray-700">
              Cancel
            </button>
            <button onClick={() => {
  handleSave(modalData.field,modalData?.value);
}} className="bg-blue-500 text-white sm:py-2 py-1 px-4 rounded-lg">
  {loading ? <CSpinner /> : 'Save'}
</button>
          </div>
        </div>
      </div>
    )
  );
};


export default UpdateModal