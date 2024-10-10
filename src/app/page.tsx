"use client";
import { auth } from "./firebase";
import Topbar from "./Components/Topbar";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginForm from "./Components/LoginForm";
import MainContents from "./Components/MainContents";


export default function Home() {

  // Firebase Auth
  //const [authState] = useAuthState(auth);
  const authState = true;
  //Light - Dark Mode
  const [Dark, setDark] = useState(false);

  const Theme = createTheme({
    palette:{
      mode: Dark? "dark": "light",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.5s ease, color 0.5s ease',
          },
        },
      },
    },
  });

  // ダークモード切り替え関数
  function SwitchDisplayMode(){
    setDark(!Dark);
  }
  

  return (
    <div>
      <ThemeProvider theme={Theme}>
        <CssBaseline/>
        <Topbar ToggleDark={SwitchDisplayMode} isDark={Dark}/>
        {
          authState? <MainContents isDark={Dark}/> : <LoginForm isDark={Dark}/>
        }
      </ThemeProvider>
    </div>
  );
}