import React from 'react'
import Image  from 'next/image';
const initial = (props) => {
    const setStart = props.setStart;
    const setShowOption1 = props.setShowOption1;
    const setShowOption2 = props.setShowOption2;
    return (
        <>
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
                        setStart(false);
                        setShowOption1(true)
                    }}></div>
                    Getting help from your friends
                </div>
                <div className='option_s'>
                    <div className='option' onClick={() => {
                        setStart(false);
                        setShowOption2(true)
                    }}></div>
                    Taking photo by yourself
                </div>
            </div>
        </>
    )
}

export default initial