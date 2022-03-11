import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

function Signup() {

    const authContext = useContext(AuthContext);

    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (signupForm.password !== signupForm.confirmPassword) {
            return alert('Password fields must match');
        }
        authContext.signupUserWithEmailAndPassword(signupForm.email, signupForm.password)
        .then(() => {
            navigate('/');
        }).catch(console.error);
    }

    const handleChange = (event) => {
        const newSignupForm = {...signupForm};
        newSignupForm[event.target.name] = event.target.value;
        setSignupForm(newSignupForm);
    }

    return(
        <div className="h-screen bg-slate-800 text-slate-50">
            <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4 2xl:col-span-4 2xl:col-start-5 my-auto p-5 md:p-10 bg-slate-900 drop-shadow-xl rounded-xl">
                    <h1 className="text-3xl font-semibold text-center mb-10">Signup</h1>
                    <form>
                        <div className="mb-5 flex flex-col">
                            <label htmlFor="signupEmailInput" className="mb-1 ml-1 font-medium text-md">Email address <span className="text-rose-500">*</span></label>
                            <input type="email" id="signupEmailInput" className="border rounded-md p-2 text-slate-800" placeholder="example@example.com" />
                        </div>
                        <div className="mb-5 flex flex-col">
                            <label htmlFor="signupPasswordInput" className="mb-1 ml-1 font-medium text-md">Password <span className="text-rose-500">*</span></label>
                            <input type="email" id="signupPasswordInput" className="border rounded-md p-2 text-slate-800" placeholder="********" />
                        </div>
                        <div className="mb-5 flex flex-col">
                            <label htmlFor="signupConfirmPasswordInput" className="mb-1 ml-1 font-medium text-md">Confirm password <span className="text-rose-500">*</span></label>
                            <input type="email" id="signupConfirmPasswordInput" className="border rounded-md p-2 text-slate-800" placeholder="********" />
                        </div>
                        <div className="flex">
                            <input type="checkbox" name="termsCheck" id="signupTermsCheckbox" className='my-auto'/>
                            <label htmlFor="signupTermsCheckbox" className='ml-2 my-auto'>I have read and agree to <span className='font-semibold'>Terms and Conditions</span></label>
                        </div>
                        <div className="flex mt-10">
                            <button type="submit" id="signupSubmitButton" className="px-5 py-3 bg-sky-500 hover:bg-sky-400 rounded-lg font-semibold mx-auto">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Signup;