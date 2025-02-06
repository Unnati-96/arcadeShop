import { FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import image from '../images/landingPage.jpg';


const Landing = () => {
    return (
        <section className="py-24 bg-white">
            <div className="px-12 mx-auto max-w-7xl">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                    <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                        <span>Gain the <span className="bg-gradient-to-r from-green-300 to-red-700 bg-clip-text text-transparent">Playtime</span> You’ve Always <span className="bg-gradient-to-r from-red-700 to-green-300 bg-clip-text text-transparent">Wanted</span></span>
                    </h1>
                    <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                        Ready to level up? Book your spot to play the latest PS5, PS4, VR, and more! Whether you're going solo or teaming up with friends, our platform offers the ultimate gaming experience.
                    </p>
                    <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                        <button className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-700 rounded-md sm:w-auto sm:mb-0"  onClick={()=>console.log("Get Started Clicked from Landing Page. Taking you to Signup page. ")}>
                            Get Started
                            <FaArrowRight className="w-4 h-4 ml-1" />
                        </button>
                        <button className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-md sm:w-auto sm:mb-0" onClick={()=>console.log("LearnMore Clicked from Landing Page. Taking you to About page. ")}>
                            Learn More
                            <FaQuestionCircle className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
                <div className="w-full mx-auto mt-20 text-center md:w-10/12">
                    <div className="relative z-0 w-full mt-8">
                        <div className="relative overflow-hidden shadow-2xl rounded-md sm:rounded-lg">
                            <img src={image} alt="dashboard" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Landing;
