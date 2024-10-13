import { IconButton, Paper, Skeleton, Snackbar, Stack, Typography } from '@mui/material'
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
    <Stack>
        <Stack sx={{p:{xs: 2, sm:5}}}>
            <Paper sx={{p: 3}}>
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
        </Stack>
        <Snackbar
            open={SnackOpen}
            autoHideDuration={5000}
            onClose={() => setSnackOpen(false)}
            message="ログインしました"
            action={action}
        />
    </Stack>
  )
}

export default MainContents