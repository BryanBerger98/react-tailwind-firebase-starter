import { FiCamera, FiLoader } from 'react-icons/fi';
import { useAuthContext } from '../../auth/context/AuthContext';
import { useFilesContext } from '../../files/context/FilesContext';

function EditProfilePhoto() {

    const filesContext = useFilesContext();
    const uploadingFile = filesContext.uploadingFile;

    const authContext = useAuthContext();
    const currentUser = authContext.currentUser;

    const handleFileInputChange = ($event) => {
        if ($event.target.files && $event.target.files.length !== 0) {
            if (currentUser && currentUser.photoURL && currentUser.photoURL !== '') {
                filesContext.deleteFile(currentUser.photoURL)
                .then(() => {
                    uploadPhotoAndUpdateCurrentUser($event.target.files[0]).catch(console.error);
                }).catch(console.error);
            } else {
                uploadPhotoAndUpdateCurrentUser($event.target.files[0]).catch(console.error);
            }
            
        }
    }

    const uploadPhotoAndUpdateCurrentUser = async (file) => {
        try {
            const status = await filesContext.uploadFile(file, 'images/users/');
            await authContext.updateCurrentUserProfilePhoto(status.downloadURL);
            return status;
        } catch (error) {
            throw error;
        }
    }

    return(
        <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 col-span-12 md:col-span-6 h-full">
            <h3 className="text-base font-medium flex items-center"><FiCamera /><span className="ml-1">Photo</span></h3>
            <div className="h-44 w-44 my-5 mx-auto bg-slate-800 drop-shadow-lg rounded-full flex items-center justify-center group relative text-2xl">
                {
                    (!currentUser) || (currentUser && !currentUser.photoURL) || (currentUser && currentUser.photoURL && currentUser.photoURL === '') ?
                    <FiCamera />
                    : null
                }
                {
                    currentUser && currentUser.photoURL && currentUser.photoURL !== '' ?
                    <img src={currentUser.photoURL} alt={currentUser.dislayName + ' profile photo'} className="w-full rounded-full" />
                    : null
                }
                <label htmlFor="editUserProfilePhoto" className="absolute inset-0 bg-slate-700/75 rounded-full hidden group-hover:flex group-hover:cursor-pointer group-hover:text-slate-50 hover:cursor-pointer items-center justify-center">
                    <FiCamera />
                </label>
                <input type="file" id="editUserProfilePhoto" hidden accept="image/png, image/jpeg, image/gif" onChange={handleFileInputChange} />
                {
                    uploadingFile.status === 'running' ?
                    <div className="absolute inset-0 bg-slate-800 flex rounded-full">
                        <FiLoader className='text-3xl m-auto animate-spin-slow' />
                    </div>
                    : null
                }
            </div>
        </div>
    );

}
export default EditProfilePhoto;