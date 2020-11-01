import React, { useState, useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AnimatedSplash from "react-native-animated-splash-screen";

import { firebaseApp } from "./app/utils/firebase";
import Navigation from "./app/navigations/Navigation";
import store, { persistor } from "./app/store/";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    firebaseApp;
    setTimeout(() => {
      setIsLoaded(true);
    }, 4000);
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AnimatedSplash
          translucent={true}
          isLoaded={isLoaded}
          logoImage={require("./assets/img/splash.png")}
          backgroundColor={"#ff9933"}
          logoHeight={500}
          logoWidht={500}
        >
          <Navigation />
        </AnimatedSplash>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
