import { FiKey, FiSave } from 'react-icons/fi';

function EditProfileAuth() {

    return(
        <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 col-span-6 h-full flex flex-col">
        <h3 className="text-md font-medium flex items-center mb-5"><FiKey /><span className="ml-1">Password</span></h3>
        <div className='flex flex-col relative mb-5 text-sm'>
            <label htmlFor="editProfileCurrentPasswordInput" className="mb-1 ml-1 font-medium text-md">Current password <span className="text-rose-500">*</span></label>
            <input type="password" id="editProfileCurrentPasswordInput" name="currentPassword" className="border border-slate-900 rounded-md p-2 text-slate-50 bg-slate-800" placeholder="********" />
        </div>
        <div className='flex flex-col relative mb-5 text-sm'>
            <label htmlFor="editProfileNewPasswordInput" className="mb-1 ml-1 font-medium text-md">New password <span className="text-rose-500">*</span></label>
            <input type="password" id="editProfileNewPasswordInput" name="newPassword" className="border border-slate-900 rounded-md p-2 text-slate-50 bg-slate-800" placeholder="********" />
        </div>
        <div className='flex flex-col relative mb-5 text-sm'>
            <label htmlFor="editProfileConfirmNewPasswordInput" className="mb-1 ml-1 font-medium text-md">Confirm new password <span className="text-rose-500">*</span></label>
            <input type="password" id="editProfileConfirmNewPasswordInput" name="confirmNewPassword" className="border border-slate-900 rounded-md p-2 text-slate-50 bg-slate-800" placeholder="********" />
        </div>
        <div className="flex mt-auto">
            <button type='button' className='px-5 py-3 bg-sky-500 text-slate-50 hover:bg-sky-400 rounded-md font-semibold ml-auto flex items-center text-sm'>
                <FiSave />
                <span className='ml-1'>Save</span>
            </button>
        </div>
    </div>
    );

}
export default EditProfileAuth;