import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig"

export const AuthContext = React.createContext()
export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)
    function signup(email, pass) {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return "Email not valid"
        }
        return auth.createUserWithEmailAndPassword(email, pass);
    }
    function signin(email, pass) {
        return auth.signInWithEmailAndPassword(email, pass)
    }
    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
        })
        return () => {
            unsub()
        }
    }, [])

    const store = {
        user,
        signup,
        signin,
        logout
    }

    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}