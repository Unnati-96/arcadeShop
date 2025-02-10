const Bill = ({ data }) => {
    const todayDate = new Date().toLocaleDateString();
    const user = JSON.parse(localStorage.getItem('user'));
    const billedBy = user ? user.name : '';


    return (
        <div className="p-8 w-[40vw] max-w-4xl mx-auto flex flex-col justify-start items-center space-y-8">
            {/* Heading */}
            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold">Arcade Shop</h1>
                <p className="text-gray-500">
                    <span>Date: </span>
                    <span>{todayDate}</span>
                </p>
            </div>
            <hr className="w-full mt-2 border-gray-300" />

            {/* Bill Section */}
            <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                    <p className="font-semibold">BillId: {data.billId}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p><span className="font-medium">Billed To: </span>{data.groupName}</p>
                    <p><span className="font-medium">System Id: </span>{data.systemId}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p><span className="font-medium">Paid To: </span>Arcade Shop</p>
                    <p><span className="font-medium">Billed By: </span>{billedBy}</p>
                </div>
                <hr className="w-full mt-2 border-gray-300" />
            </div>

            {/* User Details Section */}
            <div className="w-full overflow-x-auto">
                <table className="min-w-full border-collapse table-auto">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-5 text-left text-sm font-medium text-gray-600">Full Name</th>
                        <th className="py-3 px-5 text-left text-sm font-medium text-gray-600">Email</th>
                        <th className="py-3 px-5 text-left text-sm font-medium text-gray-600">Rate</th>
                        <th className="py-3 px-5 text-left text-sm font-medium text-gray-600">Duration</th>
                        <th className="py-3 px-5 text-left text-sm font-medium text-gray-600">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.users.map((u) => (
                        <tr key={u._id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-5 text-sm">{u.name}</td>
                            <td className="py-3 px-5 text-sm">{u.email}</td>
                            <td className="py-3 px-5 text-sm">{u.rate}</td>
                            <td className="py-3 px-5 text-sm">{(data.endTime - data.startTime) / 3600} hrs</td>
                            <td className="py-3 px-5 text-sm">{(u.rate * (data.endTime - data.startTime) / 3600).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Total Section */}
            <div className="w-full flex justify-between items-center">
                <p className="font-semibold">Total: </p>
                <p className="font-semibold text-lg">₹ {data.users.reduce((acc, u) => acc + (u.rate * (data.endTime - data.startTime) / 3600), 0).toFixed(2)}</p>
            </div>
            <hr className="w-full border-gray-300" />

            {/* Thanks Note */}
            <div className="w-full text-center mt-4">
                <p className="text-gray-600">Thank you for your business!</p>
            </div>

        </div>
    );
}

export default Bill;
