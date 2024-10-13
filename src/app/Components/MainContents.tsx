import { Alert, Box, IconButton, Paper, Skeleton, Snackbar, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import CodeBlocks from './CodeBlocks';


type propsType = {
    isDark : boolean;
}

const MainContents = (props: propsType) => {

    const [SnackOpen, setSnackOpen] = useState(true);
    const [isLoaded, setIsLoaded] = useState(true);
    
    const action = (
        <React.Fragment>
            <IconButton
                color='inherit'
                area-label="Close"
                onClick={()=>setSnackOpen(false)}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

  return (
    <>
        <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, p:{xs: 2, md:5}}}>
            
            <Paper sx={{display:'flex', flexDirection:'column', p: 3, mb:3, mr:{xs:0, md:2}, height:'fit-content', flexGrow:0}}>
                <Typography variant='h5'>TEXNITIS コードビューア</Typography>
                <Typography variant='body1' sx={{fontSize: 13, mt:2}}>このたびは、TEXNITIS みやこ祭特別展示「ロボットプログラミングをやってみよう」にご参加いただき、ありがとうございました！<br/>このサイトでは、作成したコードを見返すことができます。</Typography>
                <Alert severity='info' sx={{mt:2}}>コードは2024年11月30日まで見ることができます。<br/>12月1日以降は確認できませんのでご注意ください。</Alert>
            </Paper>
        
            <Paper sx={{display:'flex', flexDirection:'column', p: 3, flexShrink:0, flexGrow:1}}>
                <>
                    {isLoaded? <Typography sx={{fontSize: {xs: 18, sm: 20}}}>コード</Typography> : <Skeleton variant="text" sx={{width:"100px", height:"60px"}}/>}
                    
                    {isLoaded? 
                        <Paper elevation={0} sx={{mt:{xs:2, sm:3}, p: {xs:2, sm:3}, backgroundColor: props.isDark? "#404040" : "#E0E0E0"}}>
                            <CodeBlocks isDark={props.isDark}/>
                        </Paper>
                        : <Skeleton sx={{height: 100}}/>
                    }
                </>
            </Paper>
        </Box>
        <Snackbar
            open={SnackOpen}
            autoHideDuration={5000}
            onClose={() => setSnackOpen(false)}
            message="ログインしました"
            action={action}
        />
    </>
  )
}

export default MainContents