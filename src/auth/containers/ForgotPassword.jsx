import { Field, Form, Formik } from "formik";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { useAuthContext } from "../context/AuthContext";
import * as Yup from 'yup';
import { useEffect, useState } from "react";

function ForgotPassword() {

    const authContext = useAuthContext();
    const [sendResetPasswordEmailCounter, setSendResetPasswordEmailCounter] = useState(0);
    const [sendingResetPasswordEmail, setSendingResetPasswordEmail] = useState(false);
    const [resetPasswordEmailCounterInterval, setResetPasswordEmailCounterInterval] = useState(0);

    const ForgotPasswordFormSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const handleSubmit = async (values) => {
        try {
            setSendingResetPasswordEmail(true);
            await authContext.sendUserPasswordResetEmail(values.email);
            setSendingResetPasswordEmail(false);
            setSendResetPasswordEmailCounter(60);
            const interval = setInterval(() => {
                setSendResetPasswordEmailCounter(count => count - 1);
            }, 1000)
            setResetPasswordEmailCounterInterval(interval);
        } catch (error) {
            if (error.code === 'auth/too-many-requests') {
                setSendResetPasswordEmailCounter(60);
                const interval = setInterval(() => {
                    setSendResetPasswordEmailCounter(count => count - 1);
                }, 1000)
                setResetPasswordEmailCounterInterval(interval);
                return;
              }
              console.error(error);
        }
    };

    useEffect(() => {
        if (sendResetPasswordEmailCounter === 0) {
            clearInterval(resetPasswordEmailCounterInterval);
            setResetPasswordEmailCounterInterval(0);
        }
    }, [sendResetPasswordEmailCounter, resetPasswordEmailCounterInterval]);

    return(
        <div className="h-screen bg-slate-800 text-slate-400">
        <div className="grid grid-cols-12 gap-4 h-full">
            <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4 2xl:col-span-4 2xl:col-start-5 my-auto p-5 md:p-10 bg-slate-900 drop-shadow-xl rounded-xl">
                <h1 className="text-3xl font-semibold text-center mb-10 text-slate-50">Forgot password</h1>
                {
                    sendingResetPasswordEmail ?
                        <div className="flex flex-col mt-10">
                            <FiLoader className='text-4xl mb-5 mx-auto text-sky-500 animate-spin-slow' />
                            <p className="text-center">Sending reset password email...</p>
                        </div>
                    : sendResetPasswordEmailCounter > 0 ?
                        <div className="mt-10">
                            <p className='text-slate-50 text-center'>A reset password email was sent to your email address.</p>
                            <p className='text-slate-50 text-center'>Wait <span className='font-bold text-lg'>{sendResetPasswordEmailCounter}s</span> before sending a new reset password email.</p>
                        </div>
                    :
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        validationSchema={ForgotPasswordFormSchema}
                        onSubmit={handleSubmit}
                    >
                        {({errors, touched}) => (
                            <Form>
                                <div className="mb-5 flex flex-col relative">
                                    <label htmlFor="forgotPasswordEmailInput" className="mb-1 ml-1 font-medium text-md">Email address <span className="text-rose-500">*</span></label>
                                    <Field type="email" id="forgotPasswordEmailInput" name="email" className="border rounded-md p-2 text-slate-800" placeholder="example@example.com" />
                                    {touched.email && errors.email && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.email}</span><FiAlertCircle /></span>}
                                </div>
                                <div className="flex mt-10">
                                    <button type="submit" id="forgotPasswordSubmitButton" className="px-5 py-3 bg-sky-500 text-slate-50 hover:bg-sky-400 rounded-lg font-semibold mx-auto">Send</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                }
            </div>
        </div>
    </div>
    );

}
export default ForgotPassword;