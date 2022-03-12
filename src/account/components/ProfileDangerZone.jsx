import { useContext, useState } from 'react';
import { FiAlertTriangle, FiUserMinus, FiX, FiAlertCircle } from 'react-icons/fi';
import Modal from '../../common/components/Modal';
import { ModalsContext } from '../../common/context/ModalsContext';
import * as Yup from 'yup';
import { AuthContext } from '../../auth/context/AuthContext';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FilesContext } from '../../files/context/FilesContext';

function ProfileDangerZone() {

    const modalsContext = useContext(ModalsContext);
    const filesContext = useContext(FilesContext);
    const authContext = useContext(AuthContext);
    const currentUser = authContext.currentUser;
    const navigate = useNavigate();

    const onOpenModal = () => {
        modalsContext.openModal('deleteUserAccountModal');
    }

    const [deleteAccountFormValues, setDeleteAccountFormValues] = useState({
        password: ''
    });

    const deleteAccountFormSchema = Yup.object().shape({
        password: Yup.string().required('Required')
    });

    const handleSubmit = async (values) => {
        setDeleteAccountFormValues({
            password: values.password
        });
        modalsContext.dismissAll();
        try {
            if (currentUser && currentUser.photoURL && currentUser.photoURL !== '') {
                await filesContext.deleteFile(currentUser.photoURL);
            }
            await authContext.deleteCurrentUserAccount(values.password);
            setDeleteAccountFormValues({
                password: ''
            });
            navigate('/');
        } catch (error) {
            if (error.code && error.code === 'auth/wrong-password') {
                return alert('Wrong password');
            }
            console.error(error);
        }
    };

    return(
       <>
            <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 col-span-12 h-full flex flex-col">
                <h3 className="text-base font-medium flex items-center mb-5 text-rose-500"><FiAlertTriangle /><span className="ml-1">Danger zone</span></h3>
                <div className="flex m-auto">
                    <button type='button' onClick={onOpenModal} className='px-5 py-3 bg-rose-700 text-slate-50 hover:bg-rose-600 rounded-md font-semibold ml-auto flex items-center text-sm'>
                        <FiUserMinus />
                        <span className='ml-1'>Delete my account</span>
                    </button>
                </div>
            </div>
            <Modal modalName={'deleteUserAccountModal'}>
                <div className='p-5 border-b border-slate-700 flex items-center justify-between'>
                    <p className='text-rose-500 font-semibold text-xl'>Delete your account</p>
                    <button type='button' className='hover:cursor-pointer text-xl flex items-center p-1' data-dismiss="modal">
                        <FiX />
                    </button>
                </div>
                <Formik
                    initialValues={deleteAccountFormValues}
                    validationSchema={deleteAccountFormSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({errors, touched}) => (
                        <Form>
                            <div className='p-5'>
                                <p className='mb-3'>Type your password below to confirm your will to delete your account.</p>
                                <div className='flex flex-col relative text-sm'>
                                    <label htmlFor="deleteAccountPasswordInput" className="mb-1 ml-1 font-medium text-md">Password <span className="text-rose-500">*</span></label>
                                    <Field type="password" id="deleteAccountPasswordInput" name="password" className="border border-slate-800 rounded-md p-2 text-slate-50 bg-slate-700" placeholder="********" />
                                    {touched.password && errors.password && <span className='ml-2 flex items-center text-rose-500 absolute bottom-2 right-2'><span className='mr-1'>{errors.password}</span><FiAlertCircle /></span>}
                                </div>
                            </div>
                            <div className="p-5 border-t border-slate-700 flex justify-end gap-4">
                                <button type='button' className='px-5 py-3 bg-slate-500 text-slate-50 hover:bg-slate-400 rounded-md font-semibold flex items-center text-sm' data-dismiss="modal">Cancel</button>
                                <button type='submit' className='px-5 py-3 bg-rose-700 text-slate-50 hover:bg-rose-600 rounded-md font-semibold flex items-center text-sm'>Confirm</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
       </>
    )

}
export default ProfileDangerZone;