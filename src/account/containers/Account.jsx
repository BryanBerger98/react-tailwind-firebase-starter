import { FiUser } from 'react-icons/fi';
import EditProfilePhoto from '../components/EditProfilePhoto';
import EditProfileInfos from '../components/EditProfileInfos';
import EditProfileEmail from '../components/EditProfileEmail';
import EditProfileAuth from '../components/EditProfileAuth';
import ProfileDangerZone from '../components/ProfileDangerZone';

function Account() {

    return(
        <div className="container mx-auto py-28">
            {/* <h1 className="font-semibold text-slate-50 text-xl mb-5">Account</h1> */}
            <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 mb-5">
                <h2 className="text-lg font-medium flex text-slate-50 items-center"><FiUser /><span className="ml-1">Account</span></h2>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <EditProfilePhoto></EditProfilePhoto>
                <EditProfileInfos></EditProfileInfos>
                <EditProfileEmail></EditProfileEmail>
                <EditProfileAuth></EditProfileAuth>
                <ProfileDangerZone></ProfileDangerZone>
            </div>
        </div>
    )

}
export default Account;