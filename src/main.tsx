import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
/* Sanitization CSS */
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/assets.css'
import 'sanitize.css/typography.css'
import 'sanitize.css/system-ui.css'
/* Workspace and component CSS */
import './index.css'
import './styles/main.css'
/* Sub-component */
import Header from './Header.tsx'
import App from './App.tsx'
import AboutProduct from './AboutProduct.tsx'

const router = createBrowserRouter([
  { 
    path: '/',
    Component: Header,
    children: [
      { index: true, Component: App },
      { path: "/about", Component: AboutProduct },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <meta charSet="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
    <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700;900&display=swap" rel="stylesheet"></link>

    <RouterProvider router={router} />
  </StrictMode>,
)
