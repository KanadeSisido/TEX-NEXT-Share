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
    <>
        <Stack sx={{p: 5}}>
            <Paper sx={{p: 3}}>
                <>
                    {isLoaded? <Typography variant='h5'>コード</Typography> : <Skeleton variant="text" sx={{width:"100px", height:"60px"}}/>}
                    <Paper elevation={0} sx={{mt: 3, p: 3, backgroundColor: props.isDark? "#404040" : "#E0E0E0"}}>
                        {isLoaded? <CodeBlocks/> : <Skeleton sx={{height: 100}}/>}
                    </Paper>
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
    </>
  )
}

export default MainContents