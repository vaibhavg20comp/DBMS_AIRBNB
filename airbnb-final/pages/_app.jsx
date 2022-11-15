import '../styles/globals.css'
import { ContextProvider } from '../utils/store'
// we can change this to animation later
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { createContext, useState } from 'react';

import { AppProps } from 'next/app';

import '../styles/reactDateRange.css';
import '../styles/carousel.css';

export const UserContext = createContext()

const progressBar = new ProgressBar({
  size: 4,
  color: '#FF385C',
  className: 'z-50',
  delay: 100,
});


Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState("Hello");
  return (
    <ContextProvider>
      <UserContext.Provider value={{user, setUser}}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ContextProvider>
  );
}

export default MyApp
