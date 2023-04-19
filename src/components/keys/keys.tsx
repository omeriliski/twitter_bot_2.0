import { useRef, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { updateDataPrivate, fetchDataPrivate } from "../../lib";

const Keys = () => {
    const { activeUser, apiKeys, setApiKeys } = useContext(UserContext);
    const [isEdited, setIsEdited] = useState(false);

    const consumerKey = useRef<HTMLInputElement>(null!);
    const consumerSecret = useRef<HTMLInputElement>(null!);
    const accessToken = useRef<HTMLInputElement>(null!);
    const accessTokenSecret = useRef<HTMLInputElement>(null!);

    const saveKeys = () => {
        const keyObject = {
            consumerKey: consumerKey.current.value,
            consumerSecret: consumerSecret.current.value,
            accessToken: accessToken.current.value,
            accessTokenSecret: accessTokenSecret.current.value
        }
        console.log('activeUser :>> ', activeUser);
        updateDataPrivate(`${process.env.REACT_APP_PORT}/user/updateUser/${activeUser.id}`, keyObject)
            .then((res: any) => {
                console.log('res.data :>> ', res.data);
                setApiKeys(keyObject);
                setIsEdited(false);
            })
            .catch(err => {
                console.log('err :>> ', err);
            })
    }

    const getKeys = () => {
        fetchDataPrivate(`${process.env.REACT_APP_PORT}/user/getkeys/${activeUser.email}`)
            .then((res: any) => setApiKeys(res.data))
            .catch(err => console.log('err :>> ', err));
    }

    const edit = () => {
        setIsEdited(true);
    }

    useEffect(() => {
        getKeys();
    }, []);

    return (
        <div className='col-md-6 pe-5'>
            <Form.Label htmlFor="consumerKey">Consumer Key</Form.Label>
            <Form.Control
                type="text"
                id="consumerKey"
                ref={consumerKey}
                defaultValue={apiKeys?.consumerKey}
                disabled={!isEdited}
            // aria-describedby="passwordHelpBlock"
            />
            <Form.Label htmlFor="consumerSecret">Consumer Secret</Form.Label>
            <Form.Control
                type="text"
                id="consumerSecret"
                ref={consumerSecret}
                defaultValue={apiKeys?.consumerSecret}
                disabled={!isEdited}
            // aria-describedby="passwordHelpBlock"
            />
            <Form.Label htmlFor="accessToken">Access Token</Form.Label>
            <Form.Control
                type="text"
                id="accessToken"
                ref={accessToken}
                defaultValue={apiKeys?.accessToken}
                disabled={!isEdited}
            // aria-describedby="passwordHelpBlock"
            />
            <Form.Label htmlFor="accessTokenSecret">Access Token Secret</Form.Label>
            <Form.Control
                type="text"
                id="accessTokenSecret"
                ref={accessTokenSecret}
                defaultValue={apiKeys?.accessTokenSecret}
                disabled={!isEdited}
            // aria-describedby="passwordHelpBlock"
            />
            <Button onClick={edit} className='mt-4' variant="success">Edit</Button>
            <Button onClick={saveKeys} className='mt-4' variant="success">Save</Button>
        </div>
    );
}

export default Keys;