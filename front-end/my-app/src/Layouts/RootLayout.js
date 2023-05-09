import React from "react";
import { Outlet } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import styles from './RootLayout.module.css';

export default function RootLayout() {
    return (
        <Outlet />
    )
}