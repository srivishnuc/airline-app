import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App'
import { BrowserRouter as Router } from 'react-router-dom'

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

//Webpack hot module replacement
if (module.hot) module.hot.accept()

root.render(
    <>
        <Router>
            <App />
        </Router>
    </>
);

