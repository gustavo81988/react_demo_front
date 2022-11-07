import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import SignUp from './scenes/auth/SignUp';
import SignIn from './scenes/auth/SignIn';

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  let isLoggedIn = false;

  return (
    <>
      {
        isLoggedIn? 
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                  </Routes>
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
        : 
          <SignIn/>
      }
    </>
    
  );
};

export default App;