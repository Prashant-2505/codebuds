import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase'
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';


const GoogleAuth = () => {

    const auth = getAuth(app)
    const [userAuth, setUserAuth] = useAuth();
    const router = useRouter();

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
    console.log('5')
            const { displayName, email, uid, password } = result.user;
            try {
                const { data } = await axios.post('/api/auth/googleauth', { uid, email, password, name: displayName }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (data.success) {
                    alert(data.message + ' ' + displayName);
                    setUserAuth({
                        ...userAuth,
                        user: { name: displayName, email },

                    });
                    localStorage.setItem('userAuth', JSON.stringify({
                        user: { name: displayName, email },

                    }));
                    router.push('/');
                } else {
                    alert("Error while signing up with google");
                }

            } catch (error) {
                console.error('Register error:', error);
            }
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    }

    return (

        <p className=' flex justify-center items-center'
            onClick={signInWithGoogle}
        >
            <FaGoogle />
        </p>

    )
}

export default GoogleAuth
