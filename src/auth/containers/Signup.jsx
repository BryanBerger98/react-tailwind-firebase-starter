import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiAlertCircle } from 'react-icons/fi';

function Signup() {

    const authContext = useAuthContext();
    const navigate = useNavigate();

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'At least 8 characters').required('Required'),
        confirmPassword: Yup.string().min(8, 'At least 8 characters').oneOf([Yup.ref('password'), null], 'Must match the password').required('Required'),
        termsCheck: Yup.boolean().oneOf([true], 'Required')
    });


    const handleSubmit = async (values) => {
        authContext.signupUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
            navigate('/');
        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                return alert('A user is already registered with this email');
            }
            console.error(error.code, error.message);
        });
    };

    return(
        <div className="h-screen bg-slate-800 text-slate-400">
            <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4 2xl:col-span-4 2xl:col-start-5 my-auto p-5 md:p-10 bg-slate-900 drop-shadow-xl rounded-xl">
                    <h1 className="text-3xl font-semibold text-center mb-10 text-slate-50">Signup</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            confirmPassword: '',
                            termsCheck: false
                        }}
                        validationSchema={SignupFormSchema}
                        onSubmit={handleSubmit}
                    >
                        {({errors, touched}) => (
                            <Form>
                                <div className="mb-5 flex flex-col relative">
                                    <label htmlFor="signupEmailInput" className="mb-1 ml-1 font-medium text-md">Email address <span className="text-rose-500">*</span></label>
                                    <Field type="email" id="signupEmailInput" name="email" className="border rounded-md p-2 text-slate-800" placeholder="example@example.com" />
                                    {touched.email && errors.email && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.email}</span><FiAlertCircle /></span>}
                                </div>
                                <div className="mb-5 flex flex-col relative">
                                    <label htmlFor="signupPasswordInput" className="mb-1 ml-1 font-medium text-md">Password <span className="text-rose-500">*</span></label>
                                    <Field type="password" id="signupPasswordInput" name="password" className="border rounded-md p-2 text-slate-800" placeholder="********" />
                                    {touched.password && errors.password && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.password}</span><FiAlertCircle /></span>}
                                </div>
                                <div className="mb-5 flex flex-col relative">
                                    <label htmlFor="signupConfirmPasswordInput" className="mb-1 ml-1 font-medium text-md">Confirm password <span className="text-rose-500">*</span></label>
                                    <Field type="password" id="signupConfirmPasswordInput" name="confirmPassword" className="border rounded-md p-2 text-slate-800" placeholder="********" />
                                    {touched.confirmPassword && errors.confirmPassword && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.confirmPassword}</span><FiAlertCircle /></span>}
                                </div>
                                <div className="flex">
                                    <Field type="checkbox" name="termsCheck" id="signupTermsCheckbox" className='my-auto'/>
                                    <label htmlFor="signupTermsCheckbox" className='ml-2 my-auto'>I have read and agree to <span className='font-semibold'>Terms and Conditions</span>  <span className="text-rose-500">*</span></label>
                                    {touched.termsCheck && errors.termsCheck && <span className='ml-2 flex items-center text-rose-500'><span className='mr-1'>{errors.termsCheck}</span><FiAlertCircle /></span>}
                                </div>
                                <div className="flex mt-10">
                                    <button type="submit" id="signupSubmitButton" className="px-5 py-3 bg-sky-500 text-slate-50 hover:bg-sky-400 rounded-lg font-semibold mx-auto">Signup</button>
                                </div>
                                <p className='text-center mt-5 text-slate-400'>
                                    <span>You already have an account ?</span>
                                    <Link to='/signin' className='font-semibold ml-2 hover:text-slate-50'>Sign in</Link>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )

}
export default Signup;