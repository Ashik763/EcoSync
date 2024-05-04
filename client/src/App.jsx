import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { useContext } from "react";
import { AuthContext } from "./Context/AuthProvider";
import Spinner from "./pages/Shared/Spinner/Spinner";

import { persistor, store } from "./Redux/store";

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className=" ">
       <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <RouterProvider router={router}></RouterProvider>
      </PersistGate>
      <Toaster />
    </Provider>

    </div>
  );
}

export default App;
