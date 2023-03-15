import React from 'react'
import Image from 'next/image';

const option2 = (props) => {
    const setShowOption2 = props.setShowOption2;
    const setShowOption1 = props.setShowOption1;
    const setShowVideoInstruction2 = props.setShowVideoInstruction2;
    return (
        <>
            <div className='contain'>
                <div className='above_content'>
                    <p className='text-center text_first_tab'>Select the method of taking photo</p>
                    <div className='step_par'>
                        <div className='step_active step'></div>
                        <div className='step'></div>
                        <div className='step'></div>
                    </div>
                    <div className='cam'>
                        <Image
                            src="/static/mobile/cam.png"
                            width="49.45"
                            height="42.86"
                            alt=""
                        />
                    </div>
                    <div className='options'>
                        <div className='option_s'>
                            <div className='option' onClick={() => {
                                setShowOption1(true);
                                setShowOption2(false)
                            }}></div>
                            Getting help from your friends
                        </div>

                        <div className='option_s'>
                            <div className='option_active'>
                                <div></div>
                            </div>

                            Taking photo by yourself
                        </div>
                        <div className='img_option1'>
                            <Image
                                src="/static/mobile/TuChup.png"
                                width="185"
                                height="183"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className='next_container'>
                    <div className='next_tab' onClick={() => { setShowOption2(false); setShowVideoInstruction2(true) }}>
                        Next
                    </div>
                </div>
            </div>

        </>
    )
}

export default option2