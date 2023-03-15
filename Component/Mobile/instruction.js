import React from 'react'
import Image from 'next/image'
const instruction = (props) => {
    const handleChange = props.handleChange
    const setShowSizeForm = props.setShowSizeForm;
    const setShowIntruction = props.setShowIntruction;
    const setShowMethod = props.setShowMethod;
    return (
        <>
            <div className="modal-form_i">
                <div className="modal-overlay-form_i"></div>
                <div className="modal-body-form_i">
                    <div className="modal-inner-form">
                        <div className='intruction_p'>
                        <div className='intruction_t'>
                        <h6 className='h'>Intruction</h6>
                        <p className='text-center k'> Please choose photo as described blow</p>
                        <div className='bundle_instruction'>
                            <div className='instruction'>
                                <Image
                                    src="/static/mobile/instruction/instruction.png"
                                    width="345"
                                    height="438"
                                    alt=""
                                />
                            </div>
                        </div>
                        </div>
                        <div className="bundle_button">
                            <p className="cancle_instruct" onClick={() => { setShowSizeForm(true); setShowIntruction(false); setShowMethod(false) }}>Cancel</p>
                            <div className='change_photo_instruct'>
                                <label htmlFor="up_img">
                                    Choose Photo
                                </label>
                                <input
                                    type="file"

                                    onChange={handleChange}
                                    // value={showImg}
                                    id="up_img"
                                    name="img"

                                />

                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default instruction