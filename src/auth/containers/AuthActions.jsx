import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';
import VerifyEmail from '../components/VerifyEmail';

function AuthActions() {

    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);

    return(
        <div>
            {
                query.get('action') === 'verify-email' ?
                <VerifyEmail oobCode={query.get('oobCode')} />
                : null
            }
            {
                query.get('action') === 'reset-password' ?
                <ResetPassword oobCode={query.get('oobCode')} />
                : null
            }
        </div>
    );

}
export default AuthActions;