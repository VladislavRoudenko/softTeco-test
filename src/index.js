import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthForm from "./views/pages/AuthForm";
import Table from "./views/pages/Table";
import AutocompleteInput from "./views/pages/AutocompleteInput";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <AuthForm/>
        <Table/>
        <AutocompleteInput/>
    </>
);
