import { useEffect, useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function VerifyEmail({oobCode}) {

    const authContext = useAuthContext();
    const navigate = useNavigate();
    const [emailVerificationLoading, setEmailVerificationLoading] = useState(true);

    useEffect(() => {
        if (oobCode) {
            authContext.verifyEmail(oobCode)
            .then(() => {
                setEmailVerificationLoading(false);
              setTimeout(() => {
                navigate('/account');
              }, 3000);
            }).catch(error => {
              if (error.code === 'auth/invalid-action-code') {
                alert('Validation link is wrong or expired');
              }
              console.error(error);
            });
        }
    }, [oobCode, authContext, navigate]);

    return(
        <div className="container mx-auto flex h-screen">
            <div className="m-auto bg-slate-900 rounded-xl p-20 drop-shadow flex flex-col">
                {
                    emailVerificationLoading ?
                        <>
                            <FiLoader className='text-4xl mb-5 mx-auto text-sky-500 animate-spin-slow' />
                            <p className="text-center">Verification in progress...</p>
                        </>
                    : <>
                        <FiCheck className="text-6xl m-auto text-green-500 flex mb-5" />
                        <p className="text-center">Email verified successfully</p>
                        <p className="text-center">You will be redirected</p>
                    </>
                }               
            </div>
        </div>
    );

}
export default VerifyEmail;