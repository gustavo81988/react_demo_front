import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import SignUp from './scenes/auth/SignUp';
import SignIn from './scenes/auth/SignIn';

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;