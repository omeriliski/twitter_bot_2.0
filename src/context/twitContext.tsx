import { createContext, useContext } from 'react';
import { UserContext } from './userContext';
import { UserContextProps } from './userContext';
import { fetchDataPrivate } from '../lib/index';
import axios from 'axios';
import Twit from "twit";

export type TwitContextProps={
    
    twitText:()=>void
}

type ChildrenProps={
    children:React.ReactNode,
}

export const TwitContext = createContext({} as TwitContextProps);


export default function TwitContextProvider({children}: ChildrenProps) {

    const { apiKeys } = useContext(UserContext) as UserContextProps;

    console.log('apiKeys :>> ', apiKeys);

    // if (apiKeys) {
    //     var T = new Twit({
    //         consumer_key: apiKeys.consumerKey,
    //         consumer_secret: apiKeys.consumerSecret,
    //         access_token: apiKeys?.accessToken,
    //         access_token_secret: apiKeys?.accessTokenSecret,
    //         timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    //         strictSSL: true,     // optional - requires SSL certificates to be valid.
    //     })
    //     console.log('T :>> ', T);
    // }

    


    const twitText = () => {
        console.log("test");
        // T.post('statuses/update', { status: 'test' }, function (err, data, response) {
        //     console.log(data)
        // })
    }

    const twitVariables = { twitText }

    return (
        <TwitContext.Provider value={twitVariables}>
            {children}
        </TwitContext.Provider>
    )
}