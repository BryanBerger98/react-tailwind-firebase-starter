import { FiAtSign, FiSave } from 'react-icons/fi';

function EditProfileEmail() {

    return(
        <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 col-span-6 h-full flex flex-col">
            <h3 className="text-md font-medium flex items-center mb-5"><FiAtSign /><span className="ml-1">Email address</span></h3>
            <div className='flex flex-col relative mb-5 text-sm'>
                <label htmlFor="editProfileEmailInput" className="mb-1 ml-1 font-medium text-md">Email <span className="text-rose-500">*</span></label>
                <input type="email" id="editProfileEmailInput" name="username" className="border border-slate-900 rounded-md p-2 text-slate-50 bg-slate-800" placeholder="example@example.com" />
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
export default EditProfileEmail;