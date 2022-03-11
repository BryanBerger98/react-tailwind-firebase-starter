import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signin() {

    const authContext = useContext(AuthContext);

    const [signinForm, setSigninForm] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        authContext.signinUserWithEmailAndPassword(signinForm.email, signinForm.password)
        .then(() => {
            navigate('/');
        }).catch(error => {
            if (error.code === 'auth/wrong-password') {
                return alert('Wrong password');
            }
            if (error.code === 'auth/user-not-found') {
                return alert('No user registered with this email address');
            }
            console.error(error);
        });
    }

    const handleChange = (event) => {
        const newSigninForm = {...signinForm};
        newSigninForm[event.target.name] = event.target.value;
        setSigninForm(newSigninForm);
    }

    return(
        <div className="h-screen bg-slate-800 text-slate-50">
            <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4 2xl:col-span-4 2xl:col-start-5 my-auto p-5 md:p-10 bg-slate-900 drop-shadow-xl rounded-xl">
                    <h1 className="text-3xl font-semibold text-center mb-10">Sign in</h1>
                    <form>
                        <div className="mb-5 flex flex-col">
                            <label htmlFor="signinEmailInput" className="mb-1 ml-1 font-medium text-md">Email address <span className="text-rose-500">*</span></label>
                            <input type="email" id="signinEmailInput" className="border rounded-md p-2 text-slate-800" placeholder="example@example.com" />
                        </div>
                        <div className="mb-5 flex flex-col">
                            <label htmlFor="signinPasswordInput" className="mb-1 ml-1 font-medium text-md">Password <span className="text-rose-500">*</span></label>
                            <input type="email" id="signinPasswordInput" className="border rounded-md p-2 text-slate-800" placeholder="********" />
                        </div>
                        <div className="flex mt-10">
                            <button type="submit" id="signinSubmitButton" className="px-5 py-3 bg-sky-500 hover:bg-sky-400 rounded-lg font-semibold mx-auto">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Signin;