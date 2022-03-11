import { FiAlertTriangle, FiUserMinus } from 'react-icons/fi';

function ProfileDangerZone() {

    return(
        <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 col-span-12 h-full flex flex-col">
        <h3 className="text-md font-medium flex items-center mb-5 text-rose-500"><FiAlertTriangle /><span className="ml-1">Danger zone</span></h3>
        <div className="flex m-auto">
            <button type='button' className='px-5 py-3 bg-rose-700 text-slate-50 hover:bg-rose-600 rounded-md font-semibold ml-auto flex items-center text-sm'>
                <FiUserMinus />
                <span className='ml-1'>Delete my account</span>
            </button>
        </div>
    </div>
    )

}
export default ProfileDangerZone;