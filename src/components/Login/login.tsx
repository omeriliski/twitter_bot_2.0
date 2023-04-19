import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextProps } from "../../context/userContext";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { postData } from "../../lib";

const Login = () => {
    const { showLogin, handleCloseLogin, setActiveUser } = useContext(UserContext) as UserContextProps;

    const onFinish = (values: { email: string; password: string; }) => {
        postData(`${process.env.REACT_APP_PORT}/user/login`, values)
            .then((res:any) => {
                console.log('data :>> ', res.data);
                handleCloseLogin();
                setActiveUser(res.data);
                // getCheckout();
            })
            .catch((err) => {
                console.log("Wrong password or username")
                // consumer.setsnackBarMessage("Wrong password or username", err);
                // consumer.snackBarHandleClick();
            });
    };
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('Required')
                .min(6, 'Must be 6 characters or more'),
        }),
        onSubmit: () => {
            onFinish(formik.values);
            console.log("Success");
        },
    });

    return (
        <div>
            <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                // error={formik.errors.email}
                            />
                            <Form.Text className="text-muted">
                                {formik.errors.email}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                name="password"
                                type="password" 
                                placeholder="Password" 
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                // error={formik.errors.password}
                            />
                            <Form.Text  className="text-muted">
                                {formik.errors.password}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Login;