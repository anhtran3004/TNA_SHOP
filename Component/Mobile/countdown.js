import React, {useState, useEffect} from 'react'
import Image from 'next/image';

const Countdown = (props) => {
    const todo = props.todo;
    const camHidden = props.camHidden;
    const setShowVideoInstruction1 = props.setShowVideoInstruction1;
    const setTakePhoto = props.setTakePhoto;
    const rotateCam = props.rotateCam;
    const setRotateCam = props.setRotateCam;
    const videoRef = props.videoRef;
    const setShowCountDown = props.setShowCountDown;
    
    const [number,setNumber] = useState('');
    useEffect(() =>{
        const timeleft = 10;
        const downloadTimer = setInterval(() =>{
            if(timeleft <=0){
                clearInterval(downloadTimer);
                todo();
            }
            // const t = 10 - timeleft ;
            setNumber(timeleft);
            timeleft -=1;
            
        }, 1000)
    }, [])
    
  return (

    <>
        <div className={'camera ' + (camHidden ? 'none' : '')} >
                    <video ref={videoRef} id="webcam2"></video>
                    <div className='step_par_t'>
                        <div className='step_completed step'></div>
                        <div className='step_completed step_t'></div>
                        <div className='step_active step_t'></div>
                    </div>
                    <div className='close' onClick={() => { setShowVideoInstruction1(true); setShowCountDown(false) }}>
                        <Image
                            src="/static/mobile/Close.png"
                            width="40"
                            height="40"
                            alt=""
                        />
                    </div>
                    <div className='rotate_cam' onClick={() => { rotateCam ? setRotateCam(false) : setRotateCam(true) }}>
                        <Image
                            src="/static/mobile/rotatecam.png"
                            width="40"
                            height="40"
                            alt=""
                        />
                    </div>
                    <div className='take_photo_'>
                        <Image
                            src="/static/mobile/camera-enable.png"
                            width="60"
                            height="60"
                            alt=""
                        />
                    </div>
                    <p style={{color:"red", fontSize:"50px", textAlign:"center"}} id="progressBar">{number}</p>
                </div>
    </>
  )
}

export default Countdown