import React from "react";
import { Outlet } from "react-router-dom";
import styles from './RootLayout.module.css'

export default function RootLayout() {
    return (
        <Outlet />
    )
}