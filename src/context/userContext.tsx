import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ActiveUserProps = {
    id: number,
    email: string,
    popularAccountsList: string[]
}
type ApiKeysProps = {
    consumerKey: string,
    consumerSecret: string,
    accessToken: string,
    accessTokenSecret: string
}

export type UserContextProps = {
    showLogin: boolean,
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>,
    showRegister: boolean,
    setShowRegister: React.Dispatch<React.SetStateAction<boolean>>,
    activeUser: ActiveUserProps,
    setActiveUser: React.Dispatch<React.SetStateAction<ActiveUserProps>>
    apiKeys: ApiKeysProps,
    setApiKeys: React.Dispatch<React.SetStateAction<ApiKeysProps>>,
    handleCloseLogin: () => void,
    handleShowLogin: () => void,
    handleCloseRegister: () => void,
    handleShowRegister: () => void,
    handleLogout: ()=>void
}

type ChildrenProps={
    children: React.ReactNode,

}

export const UserContext = createContext({} as UserContextProps);

const activeUserFromLocalStorage = JSON.parse(localStorage.getItem("activeUser")!);
console.log('activeUserFromLocalStorage :>> ', activeUserFromLocalStorage);

export default function UserContextProvider({ children }: ChildrenProps) {
    const navigate = useNavigate(); 

    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [activeUser, setActiveUser] = useState<ActiveUserProps>(activeUserFromLocalStorage as ActiveUserProps);
    const [apiKeys, setApiKeys] = useState<ApiKeysProps>({} as ApiKeysProps);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => { setShowLogin(true) };

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => { setShowRegister(true) };

    const handleLogout = () => {
        setActiveUser({id:0, email:"", popularAccountsList:[]})
        navigate("/");
    }

    const userVariables = {
        handleCloseLogin, handleShowLogin, showLogin, setShowLogin, activeUser, showRegister, setActiveUser, handleShowRegister, handleCloseRegister,
        apiKeys, setApiKeys, setShowRegister, handleLogout
    }

    
    useEffect(() => {
        if (activeUser?.id!=0) localStorage.setItem("activeUser", JSON.stringify(activeUser))
        else localStorage.clear();
    }, [activeUser]);

    return (
        <UserContext.Provider value={userVariables}>
            {children}
        </UserContext.Provider>
    )
} 