import React, { createContext, useState, useContext } from 'react';

const ArcadeContext = createContext();

const ArcadeProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [currentUser, setCurrentUser] = useState({
    //     _id: "",
    //     name: "",
    //     email: "",
    //     phoneNo:"",
    //     role:'',
    // });

    return (
        <ArcadeContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
            {children}
        </ArcadeContext.Provider>
    );
};

export { ArcadeProvider, ArcadeContext};
