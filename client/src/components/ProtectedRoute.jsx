import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../Context/context";

const ProtectedRoute = ({ children }) => {
    const { isLogin, authLoading } = useContext(userContext);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
