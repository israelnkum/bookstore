/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import 'react-app-polyfill/stable'
import React from 'react'
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistor, Store} from './utils/Store'
import {BrowserRouter as Router} from 'react-router-dom'
import PublicRoutes from "./commons/routes/public-routes";

require('./bootstrap')
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
if (document.getElementById('app-store')) {
    const root = createRoot(document.getElementById('app-store'));
    root.render(
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <PublicRoutes/>
                </Router>
            </PersistGate>
        </Provider>
    )
}
