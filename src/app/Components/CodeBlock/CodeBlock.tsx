import { Box, Card, Stack, TextField, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

type propsType = {
    sx? : Object,
    Icon : ReactNode,
    value : string,
    Heading: string,
    AlterHeading: string,
}

const CodeBlock = (props: propsType) => {
  return (
    <Card elevation={1} sx={{p: 2, ...props.sx}}>
        <Stack direction='row' sx={{alignItems:"center"}}>
            {props.Icon}
            <Box sx={{ml:2, flexGrow:1}}>
                <Typography>{props.Heading}</Typography>
                <Typography sx={{color:"#909090", fontSize:"12px"}}>{props.AlterHeading}</Typography>
            </Box>
            <Box>

              <TextField
                id="read-only-userID"
                label="ユーザID"
                defaultValue="001"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                />
              </Box>
        </Stack>
    </Card>
  )
}

export default CodeBlock