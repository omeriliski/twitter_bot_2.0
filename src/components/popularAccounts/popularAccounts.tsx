import { useRef, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { UserContextProps } from '../../context/userContext';
import { TwitContext } from '../../context/twitContext';
import { TwitContextProps } from '../../context/twitContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { updateDataPrivate, fetchDataPrivate } from '../../lib';

const PopularAccounts = () => {
    const { activeUser, setActiveUser } = useContext(UserContext) as UserContextProps;
    // const { getUserDetails } = useContext(TwitContext) as TwitContextProps;

    const account = useRef<HTMLInputElement>(null!);

    const save = () => {
        const { popularAccountsList } = activeUser;
        const tempActiveUser = { ...activeUser };
        fetchDataPrivate(`${process.env.REACT_APP_PORT}/twit/getUserDetails/${account.current.value}`)
            .then((res:any) => {
                popularAccountsList.push(res.data);
                const obj = {
                    popularAccountsList
                }
                updateDataPrivate(`${process.env.VITE_PORT}/user/updateUser/${activeUser.id}`, obj)
                    .then(res => { 
                        console.log('res :>> ', res) 
                        tempActiveUser.popularAccountsList=popularAccountsList;
                        setActiveUser(tempActiveUser);
                    })
                    .catch(err => console.log('err :>> ', err))
            })
            .catch(err => console.log('err :>> ', err))
    }
    return (
        <div className='col-md-6 ps-5'>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    ref={account}
                />
                <Button onClick={save} variant="outline-secondary" id="button-addon2">Save</Button>
            </InputGroup>
        </div>
    );
}

export default PopularAccounts;