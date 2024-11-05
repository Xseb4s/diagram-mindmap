import { ExitToApp, Login } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReadLogin } from '@/services/admin.routes';

const Navbar = () => {

    const [loginValue, setLoginValue] = useState(null);

    const getUser = async () => {
        const response = await ReadLogin();
        const { data, error } = response;
        error ? console.log(error) : setLoginValue(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    const signout = () => {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const renderView = () => {
        if (loginValue) {
            return (
                <div className="flex flex-col bg-primary text-white">
                    <div className="text-lg">
                        <Link to="/" onClick={signout}>
                            <span className="flex justify-between items-center text-white">
                                <ExitToApp className="mr-5" /> Sign Out
                            </span>
                        </Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col bg-primary text-white">
                    <Link to="/login">
                        <span className="flex justify-between items-center text-white">
                            <Login className="mr-5" /> Log in
                        </span>
                    </Link>
                </div>
            );
        }
    };

    return (
        <>
            <div className="flex justify-end items-center text-white p-5 relative w-full" style={{background:'#004991'}} >
                {renderView()}
            </div>
        </>
    );
};

export default Navbar;