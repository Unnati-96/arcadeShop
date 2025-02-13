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
import Billing from "./pages/Billing";
import History from "./pages/History";
import {ArcadeContext, ArcadeProvider} from "./context/ArcadeContext";
import {useContext, useEffect, useState} from "react";
import NoAccess from "./components/NoAccess";
// import Pricing from "./pages/Pricing";

function App() {
    return (

    <ArcadeProvider>
        <BrowserRouter>
            <LocationAwareApp />
        </BrowserRouter>

    </ArcadeProvider>
    );
}

function LocationAwareApp() {
    const location = useLocation();
    const {isLoggedIn, setIsLoggedIn} = useContext(ArcadeContext);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetch = () => {
            const userInfo = localStorage.getItem('user');
            if(userInfo){
                setCurrentUser(userInfo);
            }
        }
    }, [currentUser]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/no-access' element={<NoAccess />} />
            </Routes>

            {/* Show Sidebar for paths other than "/" and "/login" or "/signup" */}
            {
                (isLoggedIn)
                // !(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup")
                && (
                <div className="flex w-full">
                    <Sidebar />
                    <Routes>
                        {/*<Route path='/users/pricing' element={<Pricing />} />*/}
                        <Route path="/user/add" element={<AddUser />} />
                        <Route path="/user/view" element={<ViewUsers />} />
                        <Route path="/device/add" element={<AddDevice />} />
                        <Route path="/device/view" element={<ViewDevices />} />
                        <Route path="/inventory/billing" element={<Billing />} />
                        <Route path="/inventory/issue-device" element={<IssueDevice />} />
                        <Route path="/inventory/history" element={<History />} />
                    </Routes>
                </div>
            )}
            <Footer />
        </>
    );
}

export default App;
