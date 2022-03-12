import { FiUser } from 'react-icons/fi';
import EditProfilePhoto from '../components/EditProfilePhoto';
import EditProfileInfos from '../components/EditProfileInfos';
import EditProfileEmail from '../components/EditProfileEmail';
import EditProfilePassword from '../components/EditProfilePassword';
import ProfileDangerZone from '../components/ProfileDangerZone';
import FilesContextProvider from '../../files/context/FilesContext';
import ModalsContextProvider from '../../common/context/ModalsContext';

function Account() {

    return(
        <FilesContextProvider>
            <ModalsContextProvider>
                <div className="container mx-auto px-2 md:px-0 pt-28 pb-14">
                    <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 mb-5">
                        <h2 className="text-lg font-medium flex text-slate-50 items-center"><FiUser /><span className="ml-1">Account</span></h2>
                    </div>
                    <div className="grid grid-cols-12 gap-4 md:gap-6">
                        <EditProfilePhoto></EditProfilePhoto>
                        <EditProfileInfos></EditProfileInfos>
                        <EditProfileEmail></EditProfileEmail>
                        <EditProfilePassword></EditProfilePassword>
                        <ProfileDangerZone></ProfileDangerZone>
                    </div>
                </div>
            </ModalsContextProvider>
        </FilesContextProvider>
    )

}
export default Account;