import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextProps } from "../../context/userContext";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { postData } from "../../lib";

const Register = () => {
    const { showRegister, handleCloseRegister, setActiveUser } = useContext(UserContext) as UserContextProps;

    const onFinish = (values: { email: string; password1: string; }) => {
        const myValues={email:values.email, password: values.password1};
        postData(`${process.env.REACT_APP_PORT}/user/register`, myValues)
            .then((res:any) => {
                console.log('data :>> ', res.data);
                handleCloseRegister();
                // getCheckout();
            })
            .catch((err) => {
                console.log("err",err)
                // consumer.setsnackBarMessage("Wrong password or username", err);
                // consumer.snackBarHandleClick();
            });
    };
    const formik = useFormik({
        initialValues: {
            email: "",
            password1: "",
            password2: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email address').required('Required'),
            password1: Yup.string()
                .required('Required')
                .min(6, 'Must be 6 characters or more'),
            password2: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password1'), ""], 'Passwords must match')
                // .oneOf([Yup.ref('password1'), null], 'Passwords must match')
        }),
        onSubmit: () => {
            onFinish(formik.values);
            console.log("Success");
        },
    });

    return (
        <div>
            <Modal show={showRegister} onHide={handleCloseRegister}>
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
                                name="password1"
                                type="password" 
                                placeholder="Password" 
                                value={formik.values.password1}
                                onChange={formik.handleChange}
                                // error={formik.errors.password1}
                            />
                            <Form.Text  className="text-muted">
                                {formik.errors.password1}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                name="password2"
                                type="password" 
                                placeholder="Password" 
                                value={formik.values.password2}
                                onChange={formik.handleChange}
                                // error={formik.errors.password2}
                            />
                            <Form.Text  className="text-muted">
                                {formik.errors.password2}
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

export default Register;