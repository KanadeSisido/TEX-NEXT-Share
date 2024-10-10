import { Box } from '@mui/material'
import React from 'react'
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import CodeBlock from './CodeBlock/CodeBlock';

const obj = [
    [
        {
            "id": "8882c1c5-849f-4866-8a62-8a6e19ce797e",
            "value": "0",
            "component": "move"
        }
    ],
    [
        {
            "id": "ed6b34c1-9922-45dd-9fe2-6a17f1e8ee33",
            "value": "0",
            "component": "rot"
        }
    ],
    [
        {
            "id": "0897c0e9-549c-426d-8df3-8aa626ef903a",
            "value": "0",
            "component": "handud"
        }
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

type CompType = "move" | "rot" | "handud";

const TypeIndex: Record<CompType,{
    Heading : string;
    AlternativeHeading: string;
    color: string;
    Icon: JSX.Element;
    value : {[key : string] : string;};
}> = {
    move: {
        Heading : "ロボットを動かす",
        AlternativeHeading : "ロボットをうごかす",
        color : "#505050",
        Icon : <ControlCameraIcon/>,
        value : {
            '0' : "前",
            '1' : "後",
            '2' : "右",
            '3' : "左",
        },
    },

    rot:{
        Heading : "ロボットを回転させる",
        AlternativeHeading : "ロボットをまわす",
        color : "#505050",
        Icon : <ControlCameraIcon/>,
        value : {
            '0' : "時計回り",
            '1' : "反時計回り",
        },
    },

    handud:{
        Heading : "ロボットを回転させる",
        AlternativeHeading : "ロボットをまわす",
        color : "#505050",
        Icon : <ControlCameraIcon/>,
        value : {
            '0' : "上げる",
            '1' : "下げる",
        },
    },
    
}


const CodeBlocks = () => {
  return (
    <Box>
        <>
            {
                obj.map(trigger => {

                    return(
                        trigger.map(elem =>{
                            const detail = TypeIndex[elem.component as CompType] || {};

                            return(<CodeBlock Heading={detail.Heading} AlterHeading={detail.AlternativeHeading} Icon={detail.Icon} value={detail.value[elem.value]}/>)
                        })
                    
                    )
                
                })
                
            }
        </>
    </Box>
  )
}

export default CodeBlocks