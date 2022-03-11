import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiAlertCircle } from 'react-icons/fi';

function Signin() {

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const SigninFormSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'At least 8 characters').required('Required')
    });

    const handleSubmit = async (values) => {
        authContext.signinUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
            navigate('/');
        }).catch(error => {
            if (error.code === 'auth/user-not-found') {
                return alert('Wrong email or password');
            }
            if (error.code === 'auth/wrong-password') {
                return alert('Wrong email or password');
            }
            console.error(error.code, error.message);
        });
    };

    return(
        <div className="h-screen bg-slate-800 text-slate-400">
            <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4 2xl:col-span-4 2xl:col-start-5 my-auto p-5 md:p-10 bg-slate-900 drop-shadow-xl rounded-xl">
                    <h1 className="text-3xl font-semibold text-center mb-10 text-slate-50">Sign in</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={SigninFormSchema}
                        onSubmit={handleSubmit}
                    >
                        {({errors, touched}) => (
                            <Form>
                                <div className="mb-5 flex flex-col relative">
                                    <label htmlFor="signinEmailInput" className="mb-1 ml-1 font-medium text-md">Email address <span className="text-rose-500">*</span></label>
                                    <Field type="email" id="signinEmailInput" name="email" className="border rounded-md p-2 text-slate-800" placeholder="example@example.com" />
                                    {touched.email && errors.email && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.email}</span><FiAlertCircle /></span>}
                                </div>
                                <div className="mb-5 flex flex-col relative">
                                    <label htmlFor="signinPasswordInput" className="mb-1 ml-1 font-medium text-md">Password <span className="text-rose-500">*</span></label>
                                    <Field type="password" id="signinPasswordInput" name="password" className="border rounded-md p-2 text-slate-800" placeholder="********" />
                                    {touched.password && errors.password && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.password}</span><FiAlertCircle /></span>}
                                </div>
                                <div className="flex mt-10">
                                    <button type="submit" id="signinSubmitButton" className="px-5 py-3 bg-sky-500 text-slate-50 hover:bg-sky-400 rounded-lg font-semibold mx-auto">Sign in</button>
                                </div>
                                <p className='text-center mt-5 text-slate-400'>
                                    <span>You don't have an account ?</span>
                                    <Link to='/signup' className='font-semibold ml-2 hover:text-slate-50'>Signup</Link>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )

}

export default Signin;