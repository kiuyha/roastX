import './bootstrap';
import ReactDOM from 'react-dom/client';
import Home from './main';

const root = document.getElementById("app");
if (root){
    const lang = root.getAttribute('data-lang') || 'en';
    ReactDOM.createRoot(root).render(<Home lang={lang} />);
}