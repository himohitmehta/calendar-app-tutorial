import { Provider } from "react-redux";
import { persistor, store } from "redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import "styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default MyApp;
