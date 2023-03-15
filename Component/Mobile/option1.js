import React from 'react'
import Image from 'next/image';
const option1 = (props) => {
    const setShowOption2 = props.setShowOption2;
    const setShowOption1 = props.setShowOption1;
    const setShowVideoInstruction1 = props.setShowVideoInstruction1;
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
                        <div className='option_active'>
                            <div></div>
                        </div>
                        
                        Getting help from your friends
                    </div>
                    <div className='img_option1'>
                        <Image
                            src="/static/mobile/ChupHo.png"
                            width="185"
                            height="183"
                            alt=""
                        />
                    </div>
                    <div className='option_s'>
                        <div className='option' onClick={() => {
                            setShowOption2(true);
                            setShowOption1(false)
                        }}></div>
                        Taking photo by yourself
                    </div>
                </div>
                </div>
                <div className='next_container'>

                <div className='next_tab' onClick={() => { setShowOption1(false); setShowVideoInstruction1(true) }}>
                    Next
                </div>
                </div>
            </div>
        </>
    )
}

export default option1