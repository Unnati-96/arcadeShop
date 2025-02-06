const EditModal = ({ children, onClose }) => {

    return (
        <div className="min-w-full fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[60vw] relative">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                { children }
            </div>
        </div>
    );
};

export default EditModal;
