import { Box, Paper, Typography } from '@mui/material'
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

const TriggerIndex = [
    {
        Name: "ロボット起動時",
        AlternativeName: "ロボットをきどうしたとき",
      },
      {
        Name: "スティックを前に倒したとき",
        AlternativeName: "スティックをまえにたおしたとき",
      },
      {
        Name: "スティックを後ろに倒したとき",
        AlternativeName: "スティックをうしろにたおしたとき",
      },
      {
        Name: "スティックを右に倒したとき",
        AlternativeName: "スティックをみぎにたおしたとき",
      },
      {
        Name: "スティックを左に倒したとき",
        AlternativeName: "スティックをひだりにたおしたとき",
      },
      {
        Name: "◯ボタンを押したとき",
        AlternativeName: "◯ボタンをおしたとき",
      },
      {
        Name: "✕ボタンを押したとき",
        AlternativeName: "✕ボタンをおしたとき",
      },
      {
        Name: "△ボタンを押したとき",
        AlternativeName: "△ボタンをおしたとき",
      },
      {
        Name: "□ボタンを押したとき",
        AlternativeName: "□ボタンをおしたとき",
      },
      {
        Name: "L1ボタンを押したとき",
        AlternativeName: "L1ボタンをおしたとき",
      },
      {
        Name: "L2ボタンを押したとき",
        AlternativeName: "L2ボタンをおしたとき",
      },
      {
        Name: "R1ボタンを押したとき",
        AlternativeName: "R1ボタンをおしたとき",
      },
      {
        Name: "R2ボタンを押したとき",
        AlternativeName: "R2ボタンをおしたとき",
      },
];

type CompType = "move" | "rot" | "handud";

const TypeIndex: Record<CompType,{
    Heading : string;
    AlternativeHeading: string;
    color: string;
    Darkcolor: string;
    Icon: JSX.Element;
    value : {[key : string] : string;};
}> = {
    move: {
        Heading : "ロボットを動かす",
        AlternativeHeading : "ロボットをうごかす",
        color : "#FFE0E0",
        Darkcolor : "#902525",
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
        color : "#FFE0E0",
        Darkcolor : "#902525",
        Icon : <ControlCameraIcon/>,
        value : {
            '0' : "時計回り",
            '1' : "反時計回り",
        },
    },

    handud:{
        Heading : "ロボットを回転させる",
        AlternativeHeading : "ロボットをまわす",
        color : "#E0FFE0",
        Darkcolor: "#309030",
        Icon : <ControlCameraIcon/>,
        value : {
            '0' : "上げる",
            '1' : "下げる",
        },
    },
    
}

type propsType = {
  isDark : boolean,
}

const CodeBlocks = (props: propsType) => {
  return (
    <Box>
            {
                obj.map((trigger, index) => {
                    
                    //トリガーに何もブロックがない場合
                    if(!trigger.length) return <Box key={index}></Box>;

                    //トリガーにブロックがあるとき
                    return(
                        <Paper key={index} sx={{p:3, mb:2}}>
                            <Box sx={{mb:1}}>
                                <Typography sx={{fontSize:{xs:14, sm: 16}}}>{TriggerIndex[index].Name}</Typography>
                                <Typography sx={{fontSize:10, color:"#A0A0A0"}}>{TriggerIndex[index].AlternativeName}</Typography>    
                            </Box>
                                <Paper elevation={0} sx={{p:1, backgroundColor: props.isDark? "#404040" : "#E0E0E0"}}>
                                    
                                    {trigger.map(elem =>{
                                        const detail = TypeIndex[elem.component as CompType] || {};

                                        //トリガーにブロックがあるとき
                                        return(
                                            <CodeBlock key={elem.id} Heading={detail.Heading} AlterHeading={detail.AlternativeHeading} Icon={detail.Icon} value={detail.value[elem.value]} color={props.isDark? detail.Darkcolor : detail.color} isDark={props.isDark}/>
                                        )
                                    })}
                                
                                </Paper>
                        </Paper>
                    
                    )
                
                })
                
            }
    </Box>
  )
}

export default CodeBlocks