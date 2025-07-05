import { getUserData, loginUser, setMetadataOfUser, signupUser, toggleUser } from "./ApiCalls";
import UserContext from "./UserContext";


import { useContext, useEffect, useState } from 'react'

export const AuthsparkAuthProvider = ({ children, apiKey }) => {
    const [user, setuser] = useState(null);
    const [userExits, setUserExits] = useState(false);




    useEffect(() => {
        const handleBeforeUnload = () => {
            toggleUser(apiKey, false);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserData(apiKey);
            if (data === 401) {
                setuser(null);
                localStorage.clear();
                return false;
            }
            if (data) {
                setuser(data.user);
            }
        }
        fetchUser()
    }, []);

    useEffect(() => {
        const markUserLive = async () => {
            const response = await toggleUser(apiKey, true);
        }
        markUserLive();
        if (user) setUserExits(true);
        else setUserExits(false);
    }, [user])

    const signup = async (email, password, apiKey) => {
        const data = await signupUser(email, password, apiKey);
        if (data) {
            if (userExits) {
                await toggleUser(apiKey, false);
            }
            setuser(data.user);
            localStorage.setItem('profile', data.token);
            return true;
        }
        else {
            return false;
        }

    }

    const login = async (email, password, apiKey) => {
        const data = await loginUser(email, password, apiKey);
        if (data) {
            if (userExits) {
                await toggleUser(apiKey, false);
            }
            setuser(data.user);
            localStorage.setItem('profile', data.token);
            return true;
        }
        else return false;
    }

    const signOut = async ({ refresh = false }) => {
        toggleUser(apiKey, false)
        localStorage.clear();
        setuser(null);
        if (refresh) {
            window.location.reload();
        }
    }

    const setMetadata = async (metadata) => {
        const response = await setMetadataOfUser(metadata, apiKey);
        if (response) {
            if (response === 401) {
                setuser(null);
                localStorage.clear();
                return false;
            }
            else {
                setuser(pre => ({ ...pre, metadata: metadata }));
            }
        }
    }




    return (
        <UserContext.Provider value={{ user, userExits, signup, login, signOut, setMetadata }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const { user, userExits, signOut, setMetadata, signup, login } = useContext(UserContext);
    return { user, userExits, signOut, setMetadata, signup, login };
}


