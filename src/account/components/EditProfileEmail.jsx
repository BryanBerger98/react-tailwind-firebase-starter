import { useContext, useEffect, useState } from 'react';
import { FiAtSign, FiSave, FiAlertCircle } from 'react-icons/fi';
import { AuthContext } from '../../auth/context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function EditProfileEmail() {

    const authContext = useContext(AuthContext);
    const currentUser = authContext.currentUser;

    const [profileEmailFormValues, setProfileEmailFormValues] = useState({
        email: currentUser ? currentUser.email : '',
        password: ''
    });

    const profileEmailFormSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'At least 8 characters').required('Required')
    });

    const handleSubmit = async (values) => {
        authContext.updateCurrentUserEmail(values.email, values.password)
        .catch(error => {
            if (error.code === 'auth/wrong-password') {
                return alert('Wrong password');
            }
            if (error.code === 'auth/email-already-in-use') {
                return alert('A user is already registered with this email');
            }
            console.error(error.code, error.message);
        });
    };

    useEffect(() => {
        setProfileEmailFormValues({
            email: currentUser && currentUser.email ? currentUser.email : '',
            password: ''
        });
    }, [currentUser]);

    return(
        <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 col-span-12 md:col-span-6 h-full flex flex-col">
            <h3 className="text-md font-medium flex items-center mb-5"><FiAtSign /><span className="ml-1">Email address</span></h3>
            <Formik
                initialValues={profileEmailFormValues}
                validationSchema={profileEmailFormSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({errors, touched}) => (
                    <Form className='flex flex-col h-full'>
                        <div className='flex flex-col relative mb-5 text-sm'>
                            <label htmlFor="editProfileEmailInput" className="mb-1 ml-1 font-medium text-md">Email <span className="text-rose-500">*</span></label>
                            <Field type="email" id="editProfileEmailInput" name="email" className="border border-slate-900 rounded-md p-2 text-slate-50 bg-slate-800" placeholder="example@example.com" />
                            {touched.email && errors.email && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.email}</span><FiAlertCircle /></span>}
                        </div>
                        <div className='flex flex-col relative mb-5 text-sm'>
                            <label htmlFor="editProfileEmailPasswordInput" className="mb-1 ml-1 font-medium text-md">Password <span className="text-rose-500">*</span></label>
                            <Field type="password" id="editProfileEmailPasswordInput" name="password" className="border border-slate-900 rounded-md p-2 text-slate-50 bg-slate-800" placeholder="********" />
                            {touched.password && errors.password && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.password}</span><FiAlertCircle /></span>}
                        </div>
                        <div className="flex mt-auto">
                            <button type='submit' className='px-5 py-3 bg-sky-500 text-slate-50 hover:bg-sky-400 rounded-md font-semibold ml-auto flex items-center text-sm'>
                                <FiSave />
                                <span className='ml-1'>Save</span>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );

}
export default EditProfileEmail;