// import { useState, useEffect } from 'react';

// const Toast = ({ message }) => {
//     // console.log("Toast message: ", message)
//     const [showToast, setShowToast] = useState(true);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setShowToast(false);
//         }, 2000); // Hide toast after 2 seconds

//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         showToast && (
//             <div
//                 className="fixed top-5 left-1/2 transform -translate-x-1/2 p-4 bg-blue-200 text-white rounded-lg shadow-lg transition-opacity duration-500"
//                 style={{
//                     animation: "fadeIn 0.5s ease-in-out, fadeOut 0.5s ease-in-out 1.5s",
//                 }}
//             >
//                 {message} Toast.
//             </div>
//         )
//     );
// };

// export default Toast;


import { useState, useEffect } from 'react';

const Toast = ({ message }) => {
    const [showToast, setShowToast] = useState(true);

    // Determine the border color based on the message
    const borderColor = message.toLowerCase().includes("failed") || message.toLowerCase().includes("error")
        ? "border-red-500 text-red-500 bg-red-100"
        : "border-green-500 text-green-500 bg-green-100";

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToast(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        showToast && (
            <div
                className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg border-2 ${borderColor} transition-opacity duration-500`}
                style={{
                    animation: "fadeIn 0.5s ease-in-out, fadeOut 0.5s ease-in-out 1.5s",
                }}
            >
                {message}
            </div>
        )
    );
};

export default Toast;
