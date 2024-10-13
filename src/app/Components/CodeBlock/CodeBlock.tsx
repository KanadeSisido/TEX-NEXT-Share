import { Box, Card, Stack, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

type propsType = {
    color? : string,
    Icon : ReactNode,
    value : string,
    Heading: string,
    AlterHeading: string,
    isDark : boolean,
}

const CodeBlock = (props: propsType) => {
  return (
    <Card elevation={1} sx={{p: 2, maxWidth: 600, backgroundColor: props.color}}>
        <Box sx={{display:'flex', alignItems:{xs:"top",sm:"center"}}}>
            <Box sx={{mt:0.5}}>{props.Icon}</Box>

            <Stack direction={{xs:'column', sm:'row'}} sx={{ml:2, width:"100%", justifyContent:"space-between"}}>  
              <Box sx={{display:'flex'}}>
                <Box sx={{display:'flex', flexDirection:"column"}}>
                    <Typography sx={{fontSize:{xs:12, sm:16}}}>{props.Heading}</Typography>
                    <Typography sx={{color: props.isDark? "#C0C0C0" :"#909090", fontSize:{xs:9, sm:12}}}>{props.AlterHeading}</Typography>
                </Box>
              </Box>

              <Box sx={{display:'flex', border:"solid 1px #A0A0A0", borderRadius:"4px", px:1.5, py:0.5, maxWidth:{xs:100, sm:500}, minWidth:{xs:50, sm:100}, mt:{xs:1, sm:0}}}>
                  <Typography sx={{display:"flex", fontSize: {xs:13, sm:16}, alignItems:'center'}}>
                    右
                  </Typography>
              </Box>
            

              </Stack>
        </Box>
    </Card>
  )
}

export default CodeBlock