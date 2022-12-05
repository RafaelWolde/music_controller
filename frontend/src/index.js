import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import App from "./components/App";


const rootDiv = document.getElementById("app")
const root = createRoot(rootDiv);
root.render(<App name="Tim" />);