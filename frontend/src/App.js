import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import IssueDevice from "./pages/IssueDevice";
import AddUser from "./pages/AddUser";
import AddDevice from "./pages/AddDevice";
import ViewDevices from "./pages/ViewDevices";
import ViewUsers from "./pages/ViewUsers";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import EditUser from "./pages/EditUser";
import EditDevice from "./pages/EditDevice";

function App() {
    return (
        <BrowserRouter>
            <LocationAwareApp />
        </BrowserRouter>
    );
}

function LocationAwareApp() {
    const location = useLocation();  // useLocation can now be used here safely

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>

            {/* Show Sidebar for paths other than "/" and "/login" or "/signup" */}
            {!(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") && (
                <div className="flex w-full">
                    <Sidebar />
                    <Routes>
                        <Route path="/user/add" element={<AddUser />} />
                        <Route path="/user/view" element={<ViewUsers />} />
                        {/*<Route path="/user/update" element={<EditUser />} />*/}
                        <Route path="/device/add" element={<AddDevice />} />
                        <Route path="/device/view" element={<ViewDevices />} />
                        {/*<Route path="/device/update" element={<EditDevice />} />*/}
                        <Route path="/inventory/booking" element={<IssueDevice />} />
                        <Route path="/inventory/history" element={<ViewUsers />} />
                    </Routes>
                </div>
            )}
            <Footer />
        </>
    );
}

export default App;
