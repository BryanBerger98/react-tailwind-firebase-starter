import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiAlertCircle, FiCheck, FiLoader } from 'react-icons/fi';
import { useEffect, useState } from "react";

function ResetPassword({oobCode}) {

    const authContext = useAuthContext();
    const navigate = useNavigate();
    const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

    const ResetPasswordFormSchema = Yup.object().shape({
        password: Yup.string().min(8, 'At least 8 characters').required('Required'),
        confirmPassword: Yup.string().min(8, 'At least 8 characters').oneOf([Yup.ref('password'), null], 'Must match the password').required('Required')
    });


    const handleSubmit = async (values) => {
        if (oobCode) {
            setResetPasswordLoading(true);
            authContext.resetPassword(oobCode, values.password)
            .then(() => {
                setResetPasswordSuccess(true);
                setTimeout(() => {
                    navigate('/signin');
                }, 3000);
            }).catch(error => {
                console.error(error.code, error.message);
            });
        } else {
            setResetPasswordLoading(false);
            alert('Invalid reset password link');
        }
    };

    useEffect(() => {
        if (!oobCode) {
            alert('Invalid reset password link');
        }
    }, [oobCode]);

    return(
        <div className="h-screen bg-slate-800 text-slate-400">
            <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4 2xl:col-span-4 2xl:col-start-5 my-auto p-5 md:p-10 bg-slate-900 drop-shadow-xl rounded-xl">
                    <h1 className="text-3xl font-semibold text-center mb-10 text-slate-50">Reset password</h1>
                    {   
                        resetPasswordSuccess ?
                            <div className="flex flex-col mt-10">
                                <FiCheck className='text-4xl mx-auto text-green-500 mb-3' />
                                <p className="text-center">Your password was successfully updated. You will be redirected.</p>
                            </div>
                        : resetPasswordLoading ?
                            <div className="flex mt-10">
                                <FiLoader className='text-4xl mx-auto text-sky-500 animate-spin-slow' />
                            </div>
                        :
                        <Formik
                            initialValues={{
                                password: '',
                                confirmPassword: ''
                            }}
                            validationSchema={ResetPasswordFormSchema}
                            onSubmit={handleSubmit}
                        >
                            {({errors, touched}) => (
                                <Form>
                                    <div className="mb-5 flex flex-col relative">
                                        <label htmlFor="ForgotPasswordNewPasswordInput" className="mb-1 ml-1 font-medium text-md">Password <span className="text-rose-500">*</span></label>
                                        <Field type="password" id="ForgotPasswordNewPasswordInput" name="password" className="border rounded-md p-2 text-slate-800" placeholder="********" />
                                        {touched.password && errors.password && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.password}</span><FiAlertCircle /></span>}
                                    </div>
                                    <div className="mb-5 flex flex-col relative">
                                        <label htmlFor="forgoPasswordNewConfirmPasswordInput" className="mb-1 ml-1 font-medium text-md">Confirm password <span className="text-rose-500">*</span></label>
                                        <Field type="password" id="forgoPasswordNewConfirmPasswordInput" name="confirmPassword" className="border rounded-md p-2 text-slate-800" placeholder="********" />
                                        {touched.confirmPassword && errors.confirmPassword && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.confirmPassword}</span><FiAlertCircle /></span>}
                                    </div>
                                    <div className="flex mt-10">
                                        <button type="submit" id="signupSubmitButton" className="px-5 py-3 bg-sky-500 text-slate-50 hover:bg-sky-400 rounded-lg font-semibold mx-auto">Submit</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    }
                </div>
            </div>
        </div>
    )

}
export default ResetPassword;