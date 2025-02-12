import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {ArcadeContext} from "../context/ArcadeContext";
import {logout} from "../services/authService";

const Navbar = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(ArcadeContext);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="flex flex-row items-center justify-around py-3 border-2">
            <div>
                <p className="hover: cursor-pointer text-3xl font-extrabold text-green-900" onClick={()=>navigate('/')}>Arcade</p>
            </div>
            {/*<div>*/}
            {/*    <ul className="flex flex-row items-center justify-around space-x-10 text-lg text-green-900">*/}
            {/*        <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=>console.log("Home Page")}>Home</li>*/}
            {/*        <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=> {*/}
            {/*            console.log("Pricing Page")*/}
            {/*            if(currentUser) {*/}
            {/*                console.log(currentUser)*/}
            {/*                navigate('/users/pricing');*/}
            {/*            }else {*/}
            {/*                navigate('/pricing')*/}
            {/*            }*/}
            {/*        }}>Pricing</li>*/}
            {/*        <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=>console.log("Games Page")}>Games</li>*/}
            {/*        <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=>console.log("Contact Page")}>Contact</li>*/}
            {/*        <li className="hover:text-green-300 hover:cursor-pointer" onClick={()=>console.log("About Page")}>About</li>*/}
            {/*    </ul>*/}
            {/*</div>*/}

            {/* When user is not authenticated*/}
            { isLoggedIn ?
                (<button
                       onClick={ async ()=>{
                           const signout = await logout();
                           if(signout) {
                               setCurrentUser({});
                               setIsLoggedIn(false);
                               navigate('/login');
                           }
                       }}
                       className={`bg-green-700 border-2 border-green-700 px-3 py-1 rounded-md hover:text-green-700 hover:bg-white`} >
                    Logout
                </button>)
                :
                (<div className="flex space-x-2 text-lg font-semibold text-white">
                    <button
                        onClick={()=> {
                            navigate('/login');
                        }}
                          className={`bg-green-700 border-2 border-green-700 px-3 py-1 rounded-md hover:text-green-700 hover:bg-white 
                            ${location.pathname === "/login" && "text-green-700 bg-white"}`} >Login</button>
                    <div className="border"></div>
                    <buttton
                        onClick={()=> {
                            navigate('/signup');
                        }}
                          className={`bg-green-700 border-2 border-green-700 px-3 py-1 rounded-md hover:text-green-700 hover:bg-white 
                          ${location.pathname === "/signup" && "text-green-700 bg-white"}`}>Signup</buttton>
                </div>)
            }
        </nav>
    )
}

export default Navbar;