import { cp } from 'fs';
import React, { FC } from 'react'

export interface PlayerProgressProps{
  wth:number,
  duration:number,
  aud:any
};

const PlayerProgress:FC<PlayerProgressProps>=(props)=> {
  
  const SetAudioTime=(offsetLeft:number,offsetWidth:number,clientX:number)=>{
    const Num=clientX-offsetLeft;
    const percentage=(Num/offsetWidth);
    const time=percentage*props.duration;
    props.aud.currentTime=time;
  }

  const ChangeTimeOuter=(e:React.MouseEvent<HTMLDivElement>)=>{
    const {clientX}=e;
    const {offsetWidth,offsetLeft}=(e.target as HTMLDivElement)
    SetAudioTime(offsetLeft,offsetWidth,clientX)
  }

  const ChangeTimeInner=(e:React.MouseEvent<HTMLDivElement>)=>{
    e.stopPropagation();
    const {clientX}=e;
    const {parentElement}=(e.target as HTMLDivElement)
    const {offsetLeft,offsetWidth}=(parentElement as HTMLDivElement)
    SetAudioTime(offsetLeft,offsetWidth,clientX)
  }

  return (
    <>

      <div  className='inline-block m-0 p-0 bg-[#5C5C5C] border border-[#AFAFAF] w-full h-full rounded-xl' onClick={ChangeTimeOuter}>
        <div className="h-full w-0 inputRangeBall bg-[#ffff]" style={{width:`${props.wth}%`}} onClick={ChangeTimeInner}></div>                                  
      </div>

    </>
  )
}

export default PlayerProgress;