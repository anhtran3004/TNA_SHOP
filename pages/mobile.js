import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";
import Initial from '../Component/Mobile/initial';
import Option1 from '../Component/Mobile/option1';
import Option2 from '../Component/Mobile/option2';
import VideoInstruction1 from '../Component/Mobile/videoInstruction1';
import VideoInstruction2 from '../Component/Mobile/videoInstruction2';
// import TakePhoto from '../Component/Mobile/takePhoto';
import SizeForm from "../Component/Mobile/sizeFormMobile";
import SizeFound from '../Component/Mobile/sizeFoundMobile';
import SizeNotFound from '../Component/Mobile/sizeNotFound';
import WaitingSize from '../Component/ProductDetail/waitingSize';
import SeeItMe from '../Component/Mobile/SeeItMeeMobile';
import Instruction from "../Component/Mobile/instruction";
import Countdown from '../Component/Mobile/countdown';
import Page404 from '../Component/ProductDetail/404';



import { dataURLtoFile, makePending } from '../lib/mobile/API'
import TakePicture from '../Component/Mobile/takePicture';

const Mobile = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [start, setStart] = useState(true);
    const [showoption1, setShowOption1] = useState(false);
    const [showoption2, setShowOption2] = useState(false);
    const [showVideoInstruction1, setShowVideoInstruction1] = useState(false);
    const [showVideoInstruction2, setShowVideoInstruction2] = useState(false);
    const [result, setResult] = useState(false);
    // const [takePhoto, setTakePhoto] = useState(false);
    const [takePicture, setTakePicture] = useState(false);
    const [showError, setShowError] = useState(false);
    // const [button, setButton] = useState('');
    const [showErrorWeight, setShowErrorWeight] = useState(false);
    const [size, setSize] = useState('');
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [showSizeForm, setShowSizeForm] = useState(false);
    const [showWaittingSize, setShowWaittingSize] = useState(false);
    const [showSizeFound, setShowSizeFound] = useState(false);
    const [showSizeNotFound, setShowSizeNotFound] = useState(false);
    const [showSeeItMe, setShowSeeItMe] = useState(false);
    const [showImageError, setShowImageError] = useState(false);
    const [genders, setGender] = useState('male');
    const [img, setImg] = useState(null);
    const [imgurl, setImgurl] = useState('/');
    const [rotateCam, setRotateCam] = useState(true);
    const [camHidden, setcamHidden] = useState(false);
    const [showMethod, setShowMethod] = useState(false);
    const [repending, setRepending] = useState(false);
    const [showInstruction, setShowIntruction] = useState(false);
    const [showCountDown, setShowCountDown] = useState(false);
    const [countdown, setCountDown] = useState(false);
    const [show404, setShow404] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [weightImg, setWeightImg] = useState('140');
    // const dispatch = useDispatch();
    const handleChange = async (event) => {
        console.log("=============");
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            // setImage(i);
            setImgurl(URL.createObjectURL(i));

            setShowMethod(false);
            setShowIntruction(false);
            setImg(i);
            let img = window.document.createElement("img");
            img.onload = function () {
                // alert(img.width + " "+ img.height)
                setWeightImg((img.width * 140) / img.height);
            };
            img.src = imgurl;
            //const img =  "/"+ event.target.files[0].name;
            // setShowImg(i);
        }
    };
    const todo = () => {
        takePhotoIm();
    }
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        const query = router.query;
    }, [router.isReady, router.query]);

    const weights = router.query.weight
    const heights = router.query.height
    const gender = router.query.gender
    const web_token = router.query.web_token
    const handleChangeHeight = async (event) => {

        setHeight(event.target.value);
        if (event.target.value < 50 || event.target.value > 200) {
            setShowError(true);
            // setDisable(true);
        } else {
            setShowError(false);
            //setDisable(false);

        }
        console.log(document.getElementById('height'));
    }
    const handleChangeWeight = async (event) => {

        setWeight(event.target.value);
        if (event.target.value < 30 || event.target.value > 150) {
            setShowErrorWeight(true);
            // setDisable(true);
        } else {
            setShowErrorWeight(false);

        }

    };
    const getVideo = () => {
        if (rotateCam) {
            navigator.mediaDevices.getUserMedia(
                {
                    audio: false,
                    video: {
                        width: 1920, height: 1080,
                        facingMode: 'environment'
                    }
                })
                .then(stream => {
                    const video = videoRef.current;
                    // if (video && video.srcObject) video.srcObject.getTracks().forEach(t => t.stop());
                    video.srcObject = stream;
                    video.onloadedmetadata = () => {
                        video.play();
                    };
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            navigator.mediaDevices.getUserMedia(
                {
                    audio: false,
                    video: {
                        width: 1920, height: 1080,
                        facingMode: "user"
                    }
                })
                .then(stream => {
                    const video = videoRef.current;
                    // if (video && video.srcObject) video.srcObject.getTracks().forEach(t => t.stop());
                    video.srcObject = stream;
                    // console.log(stream);
                    video.onloadedmetadata = () => {
                        video.play();
                    };
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }
    const stopCamera = () =>{
        const video = videoRef.current;
        video.srcObject.getTracks().forEach(t => t.stop());
    }
    const takePhotoIm = () => {
        //getVideo();
        const width = 400;
        const height = 400 / (9 / 16);
        const photo = photoRef.current;
        const video = videoRef.current;
        photo.width = width;
        photo.height = height;
        const ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        const data = photo.toDataURL('image/png');
        photo.setAttribute('src', data);
        const img_file = dataURLtoFile(data, 'image.png');
        //const img_file = dataURItoBlob(data);
        setImg(img_file);

        const url = URL.createObjectURL(img_file);
        // showCanvas(url);

        setImgurl(data);
        setWeightImg((width * 140) / height);
        // }
        setHasPhoto(true);
        setResult(true);
        setcamHidden(true);
    }
    // useEffect(() => {
    //     getVideo();
    // }, [videoRef, takePicture, rotateCam, hasPhoto]);
    // }, []);
    // make pending
    useEffect(() => {
        console.log("test web token: ", router.isReady)
        if (router.isReady) makePending(router.query.web_token).then();
    }, [router.isReady, repending])

    const img_file = img;
    return (

        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Home</title>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet" />
            </Head>
            {/* <div id='s'></div> */}
            {start ? <>
                <Initial
                    setStart={setStart}
                    setShowOption1={setShowOption1}
                    setShowOption2={setShowOption2}
                />
            </> : null}
            {showoption1 ? (

                <Option1
                    setShowOption2={setShowOption2}
                    setShowOption1={setShowOption1}
                    setShowVideoInstruction1={setShowVideoInstruction1}
                />
            ) : null}
            {showoption2 ? (
                <Option2
                    setShowOption2={setShowOption2}
                    setShowOption1={setShowOption1}
                    setShowVideoInstruction2={setShowVideoInstruction2}
                />
            ) : null}
            {showVideoInstruction1 ? (
                <VideoInstruction1
                    setShowOption1={setShowOption1}
                    setShowVideoInstruction1={setShowVideoInstruction1}
                    setCountDown={setCountDown}
                    setcamHidden={setcamHidden}
                    setTakePicture={setTakePicture}
                    getVideo = {getVideo}
                />
            ) : null}
            {showVideoInstruction2 ? (
                <VideoInstruction2
                    setShowOption2={setShowOption2}
                    setShowVideoInstruction2={setShowVideoInstruction2}
                    setTakePicture={setTakePicture}
                    setcamHidden={setcamHidden}
                    setCountDown={setCountDown}
                    getVideo = {getVideo}
                />
            ) : null}
            {takePicture ? (
                <TakePicture
                    camHidden={camHidden}
                    setShowVideoInstruction2={setShowVideoInstruction2}
                    setTakePicture={setTakePicture}
                    rotateCam={rotateCam}
                    setRotateCam={setRotateCam}
                    todo={todo}
                    videoRef={videoRef}
                    countdown={countdown}
                    setShowVideoInstruction1={setShowVideoInstruction1}
                   getVideo={getVideo}
                   stopCamera={stopCamera}
                />
            ) : null}
            {result ? (

                <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                    <div>
                        <canvas ref={photoRef} id="canvas"></canvas>
                        {hidden ? <>
                            <div className='button_top'>
                                <div className='step_par_t n'>
                                    <div className='step_completed step'></div>
                                    <div className='step_completed step_t'></div>
                                    <div className='step_active step_t'></div>
                                </div>
                                <div className='close m' onClick={countdown ? () => { setShowVideoInstruction2(true); setResult(false); } : () => { setShowVideoInstruction1(true); setResult(false); stopCamera()}}>
                                    <Image
                                        src="/static/mobile/Close.png"
                                        width="40"
                                        height="40"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </> : <>
                            <div className='button_top'>
                                <div className='step_par_t n' >
                                    <div className='step_completed step'></div>
                                    <div className='step_completed step_t'></div>
                                    <div className='step_active step_t'></div>
                                </div>
                                <div className='close m' style={{ zIndex: "0" }} onClick={countdown ? () => { setShowVideoInstruction2(true); setResult(false); } : () => { setShowVideoInstruction1(true); setResult(false);stopCamera() }}>
                                    <Image
                                        src="/static/mobile/Close.png"
                                        width="40"
                                        height="40"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </>
                        }
                        <div className='button_tab_p'>
                            <div className='back_tab' id="img" onClick={() => { setResult(false); setcamHidden(false) }}>
                                <Image
                                    src="/static/mobile/previous.png"
                                    width="41.67"
                                    height="41.67"
                                    alt=""
                                />
                            </div>
                            <div className='completed' onClick={() => { setShowSizeForm(true); setHidden(false);stopCamera() }}>
                                <Image
                                    src="/static/mobile/completed.png"
                                    width="41.67"
                                    height="41.67"
                                    alt=""
                                />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            ) :
                (
                    <div className={'result' + (hasPhoto ? 'hasPhoto' : '') + '  none'} >
                        <div>
                            <canvas ref={photoRef} style={{ zIndex: "-2" }}></canvas>
                        </div>
                    </div>
                )}
            {showSizeForm ? (
                <SizeForm
                    img_file={img_file}
                    setShowSizeForm={setShowSizeForm}
                    gender={gender}
                    web_token={web_token}
                    imgurl={imgurl}
                    heights={heights}
                    height={height}
                    handleChangeHeight={handleChangeHeight}
                    showError={showError}
                    weights={weights}
                    handleChangeWeight={handleChangeWeight}
                    showErrorWeight={showErrorWeight}
                    setShowMethod={setShowMethod}
                    // button={button}
                    // setButton={setButton}
                    showMethod={showMethod}
                    setGender={setGender}
                    setShowWaittingSize={setShowWaittingSize}
                    setShowSizeFound={setShowSizeFound}
                    setShowSizeNotFound={setShowSizeNotFound}
                    setShow404={setShow404}
                    weightImg={weightImg}
                    getVideo={getVideo}
                    setShowImageError = {setShowImageError}
                />
            ) : null
            }
            {/* show waitting size */}
            {showWaittingSize ? (

                <WaitingSize />
            ) : null
            }
            {/* Show size found */}
            {showSizeFound ? (
                <>
                    <SizeFound
                        setShowSeeItMe={setShowSeeItMe}
                        setShowSizeFound={setShowSizeFound}
                        setShowSizeForm={setShowSizeForm}
                        size={size}
                        repending={repending}
                        setRepending={setRepending}

                    />
                </>
            ) : null}
            {/* Show size not found  */}
            {showSizeNotFound ? (
                <SizeNotFound
                    setShowSizeNotFound={setShowSizeNotFound}
                    setShowSizeForm={setShowSizeForm}
                    setRepending={setRepending}
                    repending={repending}
                    setShowWaittingSize={setShowWaittingSize}
                />
            ) : null}
            {/* Show see it me */}
            {showSeeItMe ? (
                <SeeItMe
                    setShowSizeFound={setShowSizeFound}
                    setShowSeeItMe={setShowSeeItMe}
                    imgurl={imgurl}
                    setShowSizeForm={setShowSizeForm}
                    setRepending={setRepending}
                    repending={repending}
                    showImageError={showImageError}
                />
            ) : null}
            {showMethod ? (
                <div className="modal_method">
                    <div className="modal_overlay_method"></div>
                    <div className="modal_body_method">
                        <div className="modal_inner_method">
                            <h5 className="mt-4">Upload your photo</h5>
                            <p className="text-center mt-5 device_method" onClick={() => { setShowMethod(false); setShowIntruction(true) }}>
                                <label htmlFor="up_img" >
                                    Select form this device
                                </label>
                            </p>
                            <p className="text-center" style={{ fontSize: "18px" }}>or</p>

                            <p className="text-center mt-3 qr_method" onClick={() => { setResult(false); setcamHidden(false); setShowMethod(false); setShowSizeForm(false); getVideo() }}>
                                Take Photo Again
                            </p>


                            <p
                                className="text-center mt-5 cancel_method"
                                onClick={() => { setShowMethod(false) }}
                            >
                                Cancel
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
            {showInstruction ? (
                <Instruction
                    setShowSizeForm={setShowSizeForm}
                    handleChange={handleChange}
                    setShowIntruction={setShowIntruction}
                    setShowMethod={setShowMethod} />
            ) : null}
            {/* {showCountDown ?  (
                <Countdown 
                todo={todo}
                camHidden={camHidden}
                setShowVideoInstruction1= {setShowVideoInstruction1}
                setTakePicture = {setTakePicture}
                rotateCam ={rotateCam}
                setRotateCam = {setRotateCam}
                videoRef = {videoRef}
                setShowCountDown = {setShowCountDown}
                />
            ) : null} */}
            {show404 ?
                (
                    <Page404 setShow404={setShow404} />
                )
                : null}
        </div>
    )
}

export default Mobile