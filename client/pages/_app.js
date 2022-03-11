import '../styles/globals.css'
import '../public/css/styles.css'
import { Provider } from 'react-redux';
import { UserProvider } from '@auth0/nextjs-auth0';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store} >
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </Provider>
    );
}

export default MyApp
