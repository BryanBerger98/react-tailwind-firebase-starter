import { FiCamera, FiLoader } from 'react-icons/fi';

function EditProfilePhoto() {

    return(
        <div className="bg-slate-900 drop-shadow-xl rounded-xl p-5 col-span-6 h-full">
            <h3 className="text-md font-medium flex items-center"><FiCamera /><span className="ml-1">Photo</span></h3>
            <div className="h-44 w-44 my-5 mx-auto bg-slate-800 drop-shadow-lg rounded-full flex items-center justify-center hover:cursor-pointer group relative text-2xl">
                <FiCamera />
                {/* <img *ngIf="!photoUploading && currentUser.photoURL && currentUser.photoURL !== ''" [src]="currentUser.photoURL" [alt]="currentUser.displayName + 'profile photo'" class="w-full rounded-full"> */}
                <label for="editUserProfilePhoto" class="absolute inset-0 bg-slate-700 rounded-full hidden group-hover:flex group-hover:text-slate-50 hover:cursor-pointer items-center justify-center">
                    <FiCamera />
                </label>
                <input type="file" id="editUserProfilePhoto" hidden accept="image/png, image/jpeg, image/gif" />
                {/* <div class="absolute inset-0 bg-slate-50 flex rounded-full">
                    <FiLoader />
                </div> */}
            </div>
        </div>
    );

}
export default EditProfilePhoto;