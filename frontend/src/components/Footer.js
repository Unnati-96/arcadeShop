import {BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube} from "react-icons/bi";

const Footer = () => {
    return (
        <div className="bg-white border-y-2 border-gray-200 py-5 flex flex-col justify-center items-center">
            <div className="flex flex-row items-center justify-around">
                <ul className="flex flex-row space-x-10 text-md">
                    <li className="hover:text-red-500 hover:cursor-pointer" onClick={()=>console.log("Home from Footer.")}>Home</li>
                    <li className="hover:text-red-500 hover:cursor-pointer" onClick={()=>console.log("About from Footer.")}>About</li>
                    <li className="hover:text-red-500 hover:cursor-pointer" onClick={()=>console.log("Pricing from Footer.")}>Pricing</li>
                    <li className="hover:text-red-500 hover:cursor-pointer" onClick={()=>console.log("Games from Footer.")}>Games</li>
                    <li className="hover:text-red-500 hover:cursor-pointer" onClick={()=>console.log("Contact from Footer.")}>Contact</li>
                </ul>
            </div>

            <div>
                <ul  className="flex flex-row items-center justify-center text-3xl space-x-8 py-5">
                    <li className="hover:cursor-pointer hover:text-pink-500" onClick={()=>console.log("Instagram clicked.")}><BiLogoInstagram /></li>
                    <li className="hover:cursor-pointer hover:text-blue-800" onClick={()=>console.log("Facebook clicked.")}><BiLogoFacebook /></li>
                    <li className="hover:cursor-pointer hover:text-blue-500" onClick={()=>console.log("Twitter clicked.")}><BiLogoTwitter /></li>
                    <li className="hover:cursor-pointer hover:text-red-500" onClick={()=>console.log("Youtube clicked.")}><BiLogoYoutube /></li>
                </ul>
            </div>
            <hr className="w-[80%]"/>
            <div className="py-5">
                <p>&#xA9; 2025 Arcade. All rights reserved</p>
            </div>
        </div>
    );
}
export default Footer;