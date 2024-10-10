import { DarkMode, LightMode } from '@mui/icons-material';
import { AppBar, Backdrop, Box, Button, IconButton, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { signOut } from 'firebase/auth'
import { auth } from "../firebase";
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

type propType = {

    ToggleDark : ()=>void,
    isDark : boolean,

};


const Topbar = (props : propType) => {

    //Firebase Auth
    const [user] = useAuthState(auth);

    //ログアウトしますか？の表示
    const [LogoutDialog, SetLogoutDialog] = useState(false);


  return (
    <>
        <AppBar position="sticky" color="default">
            <Toolbar sx={{display: 'flex', justifyContent: "space-between", alignItems:"center"}}>
                <img src={props.isDark? "/whitelogo.png": "/logo.png"} alt='TEXNITIS Logo' className='h-6 ml-1 md:ml-0'/>
                <Box>
                    
                    {/* ログアウトボタン */}
                    {user? <Button variant='outlined' sx={{margin: "0 10px"}} onClick={()=>{SetLogoutDialog(true)}}>ログアウト</Button> : <></>}
                    
                    {/* ダークモード切り替え */}
                    <IconButton onClick={()=>props.ToggleDark()}>
                        {props.isDark? <LightMode/> : <DarkMode/>}
                    </IconButton>

                </Box>
            </Toolbar>
        </AppBar>

        {/* ログアウトしますか？　ウインドウ */}
        <Backdrop sx={{color:"white", zIndex: (theme)=> theme.zIndex.drawer + 1}} open={LogoutDialog} onClick={()=>SetLogoutDialog(false)}>
            <Paper sx={{padding:"30px", display:"flex", justifyContent:"center"}}>
                
                <Stack>
                    <Typography sx={{marginBottom:"20px"}}>
                        ログアウトしますか
                    </Typography>
                    <Button onClick={()=>signOut(auth)} variant='outlined' sx={{margin:"0px 10px", padding: "10px"}}>
                        ログアウト
                    </Button>
                </Stack>
            
            </Paper>
        </Backdrop>
    </>
  )
}

export default Topbar