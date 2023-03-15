import React from 'react'

const videoInstruction2 = (props) => {
    const setShowOption2 = props.setShowOption2;
    const setShowVideoInstruction2 = props.setShowVideoInstruction2;
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
                    <div className='video2'>
                        <video loop controls width="100%">
                            <source src="/static/mobile/hd_tuchup.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className='par'>
                <div className='button_tab'>
                    <div className='previous_tab' onClick={() => { setShowVideoInstruction2(false); setShowOption2(true) }}>
                        Previous
                    </div>
                    <div className='take_photo' onClick={() => { setCountDown(true); setShowVideoInstruction2(false); setTakePicture(true); setcamHidden(false); getVideo(); }}>Take Photos</div>
                </div>
                </div>
            </div>
        </>
    )
}

export default videoInstruction2