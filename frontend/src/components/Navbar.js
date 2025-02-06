import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

const Navbar = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <nav className="flex flex-row items-center justify-around py-3 border-2">
            <div>
                <p className="hover: cursor-pointer text-3xl font-extrabold text-green-900" onClick={()=>console.log("Home page from Logo")}>Arcade</p>
            </div>
            <div>
                <ul className="flex flex-row items-center justify-around space-x-10 text-lg text-green-900">
                    <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=>console.log("Home Page")}>Home</li>
                    <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=>console.log("Pricing Page")}>Pricing</li>
                    <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=>console.log("Games Page")}>Games</li>
                    <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=>console.log("Contact Page")}>Contact</li>
                    <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=>console.log("About Page")}>About</li>
                </ul>
            </div>

            {/* When user is not authenticated*/}
            { isAuthenticated ?
                (<Link to="/login"
                       onClick={()=>setIsAuthenticated(false)}
                       className={`bg-green-700 border-2 border-green-700 px-3 py-1 rounded-md hover:text-green-700 hover:bg-white`} >
                    Logout
                </Link>)
                :
                (<div className="flex space-x-2 text-lg font-semibold text-white">
                    <Link to="/login"
                          className={`bg-green-700 border-2 border-green-700 px-3 py-1 rounded-md hover:text-green-700 hover:bg-white 
                            ${location.pathname === "/login" && "text-green-700 bg-white"}`} >Login</Link>
                    <div className="border"></div>
                    <Link to="/signup"
                          className={`bg-green-700 border-2 border-green-700 px-3 py-1 rounded-md hover:text-green-700 hover:bg-white 
                          ${location.pathname === "/signup" && "text-green-700 bg-white"}`}>Signup</Link>
                </div>)
            }
        </nav>
    )
}

export default Navbar;