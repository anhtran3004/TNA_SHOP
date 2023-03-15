import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
const TakePicture = (props) => {
  const todo = props.todo;
  const camHidden = props.camHidden;
  const setShowVideoInstruction2 = props.setShowVideoInstruction2;
  const setShowVideoInstruction1 = props.setShowVideoInstruction1;
  const setTakePicture = props.setTakePicture;
  const stopCamera = props.stopCamera;
  const rotateCam = props.rotateCam;
  const setRotateCam = props.setRotateCam;
  const getVideo = props.getVideo;
  const videoRef = props.videoRef;
  const [yourself, setYourself] = useState(false);
  const [topY, setTopY] = useState('');
  const [topX, setTopX] = useState('');
  const [state, setState] = useState(null);
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [z, setZ] = useState('');
  const [showCam, setShowCam] = useState(false);
  const [overlay, setOverlay] = useState(true);

  // const [countdown, setCountDown] = useState(false);
  const countdown = props.countdown;

  const [timeLeft, setTimeLeft] = useState(null);
  // const videoRef = useRef(null);
  const handleAcceleration = (event) => {
    const x = event.accelerationIncludingGravity.x;
    const y = event.accelerationIncludingGravity.y;
    const z = event.accelerationIncludingGravity.z;
    setState({
      x: parseInt(x),
      y: parseInt(y),
      z: parseInt(z)
    })
    setX(parseInt(x));
    setY(parseInt(y));
    setZ(parseInt(z));
  }
  const format = () => {
    if (x >= -1 && x <= 1 && z >= -1 && z <= 1) {
      setShowCam(true);
      setOverlay(false);
    } else {
      setShowCam(false);
      setOverlay(true);
    }
  }
  useEffect(() => {
    format();
  }, [x, z, y]);
  // const videoRef = props.videoRef;
  useEffect(() => {
    // window.addEventListener('devicemotion', handleAcceleration);
    // window.removeEventListener('orientationchange', handleOrientation);
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      window.DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleAcceleration);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('devicemotion', handleAcceleration);
    }
  }, [])
  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);

      todo();
      setYourself(false);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      // setNumber(timeLeft);
      setTimeLeft(timeLeft - 1);

    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  useEffect(() => {
    if (z >= -9 && z <= -1) {
      // setTopY(330 - 30 * Math.abs(z));
      setTopY(2.5 - 22.5 * Math.abs(z));
    }
    if (z == 0) {
      setTopY(0)
    }
    if (z >= 1 && z <= 9) {
      setTopY(-2.5 + z * 22.5);
    }
    if (x >= 1 && x <= 9) {
      setTopX(3.25 - 14.25 * x);
    }
    if (x == 0) {
      setTopX(0);
    }
    if (x >= -9 && x <= -1) {
      setTopX(-3.25 + 14.25 * Math.abs(x));
    }

  }, [z, x])
  return (
    <>
      <div className={'camera ' + (camHidden ? 'none' : '')} >
        <div className='lk'>

          <div className='closes' onClick={!countdown ? () => { setShowVideoInstruction1(true); setTakePicture(false); setTakePicture(false); stopCamera() } : () => { setShowVideoInstruction2(true); setTakePicture(false); stopCamera() }}>
            <Image
              src="/static/mobile/Close.png"
              width="40"
              height="40"
              alt=""
            />
          </div>
          <div className='step_par_ts'>
            <div className='step_completed step'></div>
            <div className='step_completed step_t'></div>
            <div className='step_active step_t'></div>
          </div>
          <div className='rotate_cams' onClick={() => { rotateCam ? setRotateCam(false) : setRotateCam(true); getVideo() }}>
            <Image
              src="/static/mobile/rotatecam.png"
              width="40"
              height="40"
              alt=""
            />
          </div>
        </div>
        <video ref={videoRef} id="webcam2" muted autoPlay playsInline></video>
        {overlay ? <>
          

          <div className='frame_picture'>
            <div className='logo_instruct'>
              <Image
                src="/static/mobile/instruction.png"
                width="88.88"
                height="130.64"
                alt=""
              />
            </div>
            <div className='text_instructs'>
              <Image
                src="/static/mobile/text_instruc.png"
                width="246"
                height="44"
                alt=""
              />
            </div>

          </div>
          <div className='take_photos'>
            <Image
              src="/static/mobile/camera-disable.png"
              width="70"
              height="70"
              alt=""
            />
          </div>
        </> : null}
        <div className='ys'>
          <Image
            src="/static/mobile/Y.png"
            width="16"
            height="425"
            alt=""
          />
          
        </div>
        <div className='arrow_ys'
        >
          <Image
            src="/static/mobile/arrow.png"
            width="28"
            height="30"
            alt=""
          />
        </div>
        <div className='xs'>
          <Image
            src="/static/mobile/X.png"
            width="280"
            height="16"
            alt=""
          />
          <div className='arrow_xs'
        >
          <Image
            src="/static/mobile/arrow_x.png"
            width="28"
            height="30"
            alt=""
          />
        </div>
        </div>
        <style jsx>{`
                   .arrow_ys{
                    position: absolute;
                    top: 0px;
                    //  margin-top: ${topY}px;
                    // padding-top: ${topY}px;
                    transform: translateY(${topY}px);
                    transition: transform 330ms;
                    left:8px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                   }
                  .arrow_xs{
                    position: absolute;
                    bottom: 0;
                    // left: 0px;
                    height: 20px;
                    // max-width: 50px;
                    margin:auto;
                    transform: translateX(${topX}px);
                    transition: transform 330ms;
                    // margin-left: ${topX}px;
                    // display: flex;
                    // align-items: center;
                    // justify-content: center;
                    // box-sizing: border-box;
                  }
                `}</style>
        
        
        {yourself ? <>
          <p className="progressBar">{timeLeft}</p>
          <div className='take_photose'>
            <Image
              src="/static/mobile/camdis.png"
              width="100"
              height="100"
              alt=""
            />
          </div>
        </> : null}
        {showCam ? <>
          <div className='take_photos' onClick={countdown ? () => { setYourself(true); setTimeLeft(10) } : todo}>
            <Image
              src="/static/mobile/camera-enable.png"
              width="70"
              height="70"
              alt=""
            />
          </div>
          <div className='frame_pictures'>
            
          </div>
          
        </> : null}
      </div>
    </>
  )
}

export default TakePicture