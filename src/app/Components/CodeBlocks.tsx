import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

import CodeBlock from './CodeBlock/CodeBlock';
import { codeSch } from './MainContents';


const TriggerIndex = {
  'onAwaken': {
    Name: "ロボット起動時",
    AlternativeName: "ロボットをきどうしたとき",
  },
  'onJoyStickFront': {
    Name: "スティックを前に倒したとき",
    AlternativeName: "スティックをまえにたおしたとき",
  },
  'onJoyStickBack': {
    Name: "スティックを後ろに倒したとき",
    AlternativeName: "スティックをうしろにたおしたとき",
  },
  'onJoyStickRight': {
    Name: "スティックを右に倒したとき",
    AlternativeName: "スティックをみぎにたおしたとき",
  },
  onJoyStickLeft: {
    Name: "スティックを左に倒したとき",
    AlternativeName: "スティックをひだりにたおしたとき",
  },
  onMaruButton: {
    Name: "◯ボタンを押したとき",
    AlternativeName: "◯ボタンをおしたとき",
  },
  onBatuButton: {
    Name: "✕ボタンを押したとき",
    AlternativeName: "✕ボタンをおしたとき",
  },
  onSankakuButton: {
    Name: "△ボタンを押したとき",
    AlternativeName: "△ボタンをおしたとき",
  },
  onShikakuButton: {
    Name: "□ボタンを押したとき",
    AlternativeName: "□ボタンをおしたとき",
  },
  onL1Button: {
    Name: "L1ボタンを押したとき",
    AlternativeName: "L1ボタンをおしたとき",
  },
  onL2Button:{
    Name: "L2ボタンを押したとき",
    AlternativeName: "L2ボタンをおしたとき",
  },
  onR1Button:{
    Name: "R1ボタンを押したとき",
    AlternativeName: "R1ボタンをおしたとき",
  },
  onR2Button:{
    Name: "R2ボタンを押したとき",
    AlternativeName: "R2ボタンをおしたとき",
    },
};

const order: (keyof codeSch)[] = ['onAwaken','onJoyStickFront','onJoyStickBack','onJoyStickRight','onJoyStickLeft','onMaruButton','onBatuButton','onSankakuButton','onShikakuButton','onL1Button','onL2Button','onR1Button', 'onR2Button']

type CompType = "move" | "rot" | "handud" | "handoc" | "r_led" | "g_led" | "b_led" | "wait";

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
            '1' : "前",
            '2' : "後",
            '3' : "左",
            '4' : "右",
        },
    },

    rot:{
        Heading : "ロボットを回転させる",
        AlternativeHeading : "ロボットをまわす",
        color : "#FFE0E0",
        Darkcolor : "#902525",
        Icon : <ThreeSixtyIcon/>,
        value : {
            '1' : "時計回り",
            '2' : "反時計回り",
        },
    },

    handud:{
      Heading : "ハンドを上げる・下げる",
      AlternativeHeading : "ロボットをあげる・さげる",
      color : "#E0FFE0",
      Darkcolor: "#309030",
      Icon : <SwapVertIcon/>,
      value : {
          '1' : "上げる",
          '2' : "下げる",
      },
    },

    handoc:{
      Heading : "ハンドを開く・閉じる",
      AlternativeHeading : "ハンドをひらく・とじる",
      color : "#E0FFE0",
      Darkcolor: "#309030",
      Icon : <SyncAltIcon/>,
      value : {
          '1' : "開く",
          '2' : "閉じる",
      },
    },
    
    r_led:{
      Heading : "赤色のLEDを光らせる・消す",
      AlternativeHeading : "あかいろのLEDをひからせる・けす",
      color : "#FFFFFF",
      Darkcolor: "#101010",
      Icon : <LightModeIcon sx={{color:"#F06060"}}/>,
      value : {
          '1' : "光らせる",
          '2' : "消す",
      },
    },

    g_led:{
      Heading : "緑色のLEDを光らせる・消す",
      AlternativeHeading : "みどりいろのLEDをひからせる・けす",
      color : "#FFFFFF",
      Darkcolor: "#303030",
      Icon : <LightModeIcon sx={{color:"#60F060"}}/>,
      value : {
          '1' : "光らせる",
          '2' : "消す",
      },
    },

    b_led:{
      Heading : "青色のLEDを光らせる・消す",
      AlternativeHeading : "あおいろのLEDをひからせる・けす",
      color : "#FFFFFF",
      Darkcolor: "#303030",
      Icon : <LightModeIcon sx={{color:"#6060F0"}}/>,
      value : {
          '1' : "光らせる",
          '2' : "消す",
      },
    },

    wait:{
      Heading : "待機する",
      AlternativeHeading : "じかんをまつ",
      color : "#E0E0FF",
      Darkcolor: "#303090",
      Icon : <AccessAlarmIcon/>,
      value : {
          '0' : "",
      },
    },
    
}

type propsType = {
  isDark : boolean,
  code : codeSch,
}

const CodeBlocks = (props: propsType) => {
  return (
    <Stack>
            {
                order.map((triggerName, index) => {

                  const blockArray = props.code![triggerName];
                  
                  //トリガーに何もブロックがない場合
                  if(!blockArray.length) return <Box key={index}></Box>;
                  //トリガーにブロックがあるとき
                  return(
                    <Paper key={index} sx={{p:3, mb:1}}>
                        <Box sx={{mb:1}}>
                            <Typography sx={{fontSize:{xs:14, sm: 16}}}>{TriggerIndex[triggerName].Name}</Typography>
                            <Typography sx={{fontSize:10, color:"#A0A0A0"}}>{TriggerIndex[triggerName].AlternativeName}</Typography>    
                        </Box>
                            <Paper elevation={0} sx={{p:1, backgroundColor: props.isDark? "#404040" : "#E0E0E0"}}>
                                <Stack gap={1}>

                                  {blockArray.map((elem, Bindex) =>{
                                      const detail = TypeIndex[elem.component as CompType];
                                      const value = elem.component == "wait"? elem.value + "秒" : detail.value[elem.value];
                                      
                                      //トリガーにブロックがあるとき
                                      return(
                                          <CodeBlock key={index + "-" + Bindex} Heading={detail.Heading} AlterHeading={detail.AlternativeHeading} Icon={detail.Icon} value={value} color={props.isDark? detail.Darkcolor : detail.color} isDark={props.isDark}/>
                                      )
                                  })}
                                
                                </Stack>
                            </Paper>
                    </Paper>
                    
                  )
            
            })
              
            }
    </Stack>
  )
}

export default CodeBlocks