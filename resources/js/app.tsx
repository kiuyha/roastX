import './bootstrap';
import ReactDOM from 'react-dom/client';
import Home from './main';
import Error from './error';

// for main page
const root = document.getElementById("app");
if (root){
    const lang = root.getAttribute('data-lang') ?? 'en';
    ReactDOM.createRoot(root).render(<Home lang={lang} />);
}

// for error page
const error = document.getElementById("error");
if (error){
    const lang = error.getAttribute('data-lang') ?? 'en';
    const errorCode = error.getAttribute('data-error-code') ?? '500';
    ReactDOM.createRoot(error).render(<Error lang={lang} errorCode={errorCode} />);
}