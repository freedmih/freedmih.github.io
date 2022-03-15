import { useEffect, useState } from 'react';
import jwt from "jwt-decode";

export default initialValue => {
    const [isAuth, setAuth] = useState(initialValue);

    useEffect(() => {
        try {
            const token = jwt(localStorage.getItem('jwt'));
            if (token.id) setAuth(true);
        }
        catch (e) {
            setAuth(false);
        }
    });

    return [isAuth, setAuth];
};