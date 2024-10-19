import { Alert, Box, IconButton, Paper, Skeleton, Snackbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'
import CodeBlocks from './CodeBlocks';
import { db } from '../firebase';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


type propsType = {
    isDark : boolean;
    AuthState : User | null | undefined;
}

export type blockSch = {
    component: string;
    id : string;
    value : string;
}

export type codeSch = {
    onAwaken : [blockSch];
    onJoyStickFront : [blockSch];
    onJoyStickBack : [blockSch];
    onJoyStickRight : [blockSch];
    onJoyStickLeft : [blockSch];
    onMaruButton : [blockSch];
    onBatuButton : [blockSch];
    onSankakuButton : [blockSch];
    onShikakuButton : [blockSch];
    onL1Button : [blockSch];
    onL2Button : [blockSch];
    onR1Button :  [blockSch];
    onR2Button : [blockSch];
};

type dataSch = {

    createdBy : string;
    data? : codeSch;
}

const MainContents = (props: propsType) => {

    const [SnackOpen, setSnackOpen] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const [docData, setDocData] = useState<dataSch>({createdBy:'dummy'});
    
    useEffect(()=>{

      const fetchData = async ()=>{
        if(props.AuthState){

          const uName = props.AuthState.email? props.AuthState.email.replace("@example.com", ""): "";
          const docRef = doc(db, "userData", uName);
          const docSnap = await getDoc(docRef);

          if(docSnap.exists())
          {
            setDocData(docSnap.data() as dataSch);
            setIsLoaded(true);
          }
  
        }
  
      }

      fetchData();

    }, [props.AuthState])

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
                <Alert severity='info' sx={{mt:2}}>コードは2024年11月30日まで見ることができます。<br/>2024年12月1日以降は確認できませんのでご注意ください。</Alert>
            </Paper>
        
            <Paper sx={{display:'flex', flexDirection:'column', p: 3, flexShrink:0, flexGrow:1}}>
                <>
                    {isLoaded? <Typography sx={{fontSize: {xs: 18, sm: 20}}}>コード</Typography> : <Skeleton variant="text" sx={{width:"100px", height:"60px"}}/>}
                    
                    {isLoaded && docData.data?
                        <Paper elevation={0} sx={{mt:{xs:2, sm:3}, p: {xs:2, sm:3}, backgroundColor: props.isDark? "#404040" : "#E0E0E0"}}>
                            <CodeBlocks isDark={props.isDark} code={docData.data}/>
                            <Typography>{}</Typography>
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