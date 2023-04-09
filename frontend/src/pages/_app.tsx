import type { AppProps } from 'next/app'
import '../styles/main.scss'
import { Provider } from 'react-redux'
import store, { persistor } from '@/store/index';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from '@/components/Loader';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader/>} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
