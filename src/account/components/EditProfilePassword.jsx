import { useContext, useState } from 'react';
import { FiKey, FiSave, FiAlertCircle } from 'react-icons/fi';
import { AuthContext } from '../../auth/context/AuthContext';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

function EditProfilePassword() {

    const authContext = useContext(AuthContext);

    const [profilePasswordFormValues, setProfilePasswordFormValues] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const profilePasswordFormSchema = Yup.object().shape({
        currentPassword: Yup.string().min(8, 'At least 8 characters').required('Required'),
        newPassword: Yup.string().min(8, 'At least 8 characters').notOneOf([Yup.ref('currentPassword'), null], 'Must be different of the current password').required('Required'),
        confirmNewPassword: Yup.string().min(8, 'At least 8 characters').oneOf([Yup.ref('newPassword'), null], 'Must match the new password').required('Required'),
    });

    const handleSubmit = async (values) => {
        setProfilePasswordFormValues({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmNewPassword: values.confirmNewPassword
        });
        authContext.updateCurrentUserPassword(values.currentPassword, values.newPassword)
        .then(() => {
            setProfilePasswordFormValues({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        })
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

    return(
        <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 col-span-12 md:col-span-6 h-full flex flex-col">
            <h3 className="text-md font-medium flex items-center mb-5"><FiKey /><span className="ml-1">Password</span></h3>
            <Formik
                initialValues={profilePasswordFormValues}
                validationSchema={profilePasswordFormSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({errors, touched}) => (
                    <Form className='flex flex-col h-full'>
                        <div className='flex flex-col relative mb-5 text-sm'>
                            <label htmlFor="editProfileCurrentPasswordInput" className="mb-1 ml-1 font-medium text-md">Current password <span className="text-rose-500">*</span></label>
                            <Field type="password" id="editProfileCurrentPasswordInput" name="currentPassword" className="border border-slate-900 rounded-md p-2 text-slate-50 bg-slate-800" placeholder="********" />
                            {touched.currentPassword && errors.currentPassword && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.currentPassword}</span><FiAlertCircle /></span>}
                        </div>
                        <div className='flex flex-col relative mb-5 text-sm'>
                            <label htmlFor="editProfileNewPasswordInput" className="mb-1 ml-1 font-medium text-md">New password <span className="text-rose-500">*</span></label>
                            <Field type="password" id="editProfileNewPasswordInput" name="newPassword" className="border border-slate-900 rounded-md p-2 text-slate-50 bg-slate-800" placeholder="********" />
                            {touched.newPassword && errors.newPassword && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.newPassword}</span><FiAlertCircle /></span>}
                        </div>
                        <div className='flex flex-col relative mb-5 text-sm'>
                            <label htmlFor="editProfileConfirmNewPasswordInput" className="mb-1 ml-1 font-medium text-md">Confirm new password <span className="text-rose-500">*</span></label>
                            <Field type="password" id="editProfileConfirmNewPasswordInput" name="confirmNewPassword" className="border border-slate-900 rounded-md p-2 text-slate-50 bg-slate-800" placeholder="********" />
                            {touched.confirmNewPassword && errors.confirmNewPassword && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.confirmNewPassword}</span><FiAlertCircle /></span>}
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
export default EditProfilePassword;