import React, {useState} from 'react'

const VideoInstruction1 = (props) => {
    const setShowOption1 = props.setShowOption1;
    const setShowVideoInstruction1 = props.setShowVideoInstruction1;
    // const setShowCountDown = props.setShowCountDown;
    const setTakePhoto = props.setTakePhoto;
    const setcamHidden = props.setcamHidden;
    const setCountDown = props.setCountDown;
    const setTakePicture = props.setTakePicture;
    const getVideo = props.getVideo;
    return (
        <>
             <div className='contain'>
                <div className='above_content'>
                <p className='text-center text_first_tab'>Instruction</p>
                <div className='step_par'>
                    <div className='step_completed step'></div>
                    <div className='step step_active'></div>
                    <div className='step'></div>
                </div>
                <div className='video'>
                    <video autoPlay loop controls width="100%">
                        <source src="/static/mobile/hd_chupho.mp4" type="video/mp4" />
                    </video>
                </div>
                </div>
                <div className='par'>
                <div className='button_tab' >
                    <div className='previous_tab' onClick={() => { setShowVideoInstruction1(false); setShowOption1(true) }}>
                        Previous
                    </div>
                    <div className='take_photo' onClick={() =>{setCountDown(false); setTakePicture(true);setcamHidden(false) ;setShowVideoInstruction1(false);getVideo()}}>Take Photo</div>
                </div>
                </div>
                </div>
            
        </>
    )
}

export default VideoInstruction1