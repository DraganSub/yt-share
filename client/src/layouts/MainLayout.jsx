import React, { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { LandingPage, HomePage } from "../pages";

export default function MainLayout() {
    const navigate = useNavigate();

    const listener = (event) => {
        const key = localStorage.getItem("room_key");
        if (key && window.location.pathname === "/") {
            navigate(`/key`);
        }
    }

    useEffect(() => {
        const key = localStorage.getItem("room_key");
        if (key) {
            navigate(`/${key}`);
        }
        // window.addEventListener("storage", (event) => {
        //     const key = localStorage.getItem("room_key");
        //     if (key && window.location.pathname === "/") {
        //         navigate(`/key`);
        //     }
        // });
    }, [])


    return <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:room_id" element={<HomePage />} />
    </Routes>
}