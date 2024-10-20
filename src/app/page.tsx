"use client";
import { auth } from "./firebase";
import Topbar from "./Components/Topbar";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginForm from "./Components/LoginForm";
import MainContents from "./Components/MainContents";
import Link from "next/link";


export default function Home() {

  // Firebase Auth
  const [authState] = useAuthState(auth);

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
          authState? <MainContents isDark={Dark} AuthState={authState}/> : <LoginForm isDark={Dark}/>
        }
        <footer>
          {authState?
          <div className="ml-3 mb-4">
            <Link href={"https://texnitis.miyakofes.yzuemx.com/OPENSOURCE_LICENSE.html"} className="text-gray-500 text-sm">
              オープンソースライセンス
            </Link>
          </div>:
          <Link href={"https://texnitis.miyakofes.yzuemx.com/OPENSOURCE_LICENSE.html"} className="text-gray-500 text-sm fixed bottom-3 left-3">
            オープンソースライセンス
          </Link>
          }
        </footer>
      </ThemeProvider>
    </div>
  );
}
