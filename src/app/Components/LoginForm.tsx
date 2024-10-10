import { Box, Button, FormControl, FormControlLabel, FormGroup, Paper, Stack, Switch, TextField, Typography } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';

type propsType ={
    isDark: boolean,
}

const LoginForm = (props: propsType) => {

  const [UserID, setUserID] = useState("");
  const [InvalidPass, setInvalidPass] = useState(false);
  const [Password, setPassword] = useState("");
  const [PasswordVisibliy, setPasswordVisiblity] = useState(false);

  const TryLogin = () =>{
    
    signInWithEmailAndPassword(auth, (UserID + "@example.com") , Password).then().catch(()=>{
              
      setInvalidPass(true);

    })
  }

  return (
    <div className='flex justify-center'>
        <Paper elevation={2} sx={{flexGrow: 1, maxWidth: "500px", m: 5, p: 5}}>

            <Stack sx={{alignItems: "start"}}>
                <img className='w-24' src={props.isDark? "/whitelogo.png" : "/logo.png"}/>
                <Typography variant='h4' sx={{mt: 3, fontSize:"30px"}}>ログイン</Typography>
                <Typography variant='body1' sx={{mt: 1, fontSize:"13px", color: "#A0A0A0"}}>ACCESS IDとパスワードを入力してください</Typography>
                <FormControl>
                  <Box sx={{mt:3}}>

                    {/* 入力フォーム */}
                    <TextField required fullWidth
                      id="Access-ID" sx={{margin: "10px 0"}}
                      label="ACCESS ID"
                      value={UserID}
                      onChange={e => setUserID(e.target.value)}
                      error={InvalidPass}
                    />
                    <TextField required fullWidth
                      id="password"
                      sx={{margin: "10px 0"}}
                      label="パスワード"
                      autoComplete='current-password'
                      value={Password}
                      onChange={e => {setInvalidPass(false); setPassword(e.target.value)}}
                      helperText={InvalidPass? "ACCESS ID または パスワードが間違っています": ""}
                      error={InvalidPass}
                      type={PasswordVisibliy? "text" : "password"}
                    />

                    {/* パスワードを表示 */}
                    <FormGroup>
                      <FormControlLabel control={<Switch onChange={()=>setPasswordVisiblity(!PasswordVisibliy)}/>} label="パスワードを表示"/>
                    </FormGroup>
                    
                    <Box sx={{display:'flex', justifyContent: 'end', mt:3}}>
                      <Button variant='contained' size='large' onClick={TryLogin}>ログイン</Button>
                    </Box>
                  </Box>
                </FormControl>
            </Stack>
        
        </Paper>
    </div>
  )
}

export default LoginForm