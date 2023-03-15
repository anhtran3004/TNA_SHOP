import React from 'react'
import Image from 'next/image'
const instruction = (props) => {
    const setShowConfirm = props.setShowConfirm
    
    const handleChange = props.handleChange
    const setShowInstruction = props.setShowInstruction
    // const handleChange = async (event) => {
    //     console.log("=============");
    //     if (event.target.files && event.target.files[0]) {
    //         const i = event.target.files[0];
    //         setImage(i);
    //         const width = 400;
    //         const height = 400 / (9 / 16);
    //         const photo = photoRef.current;
    //         photo.width = width;
    //         photo.height = height;
    //         const ctx = photo.getContext('2d');
    //         ctx.drawImage(i, 0, 0, width, height);
    //         const data = photo.toDataURL('image/png');
    //         photo.setAttribute('src', data);
    //         const img_file = dataURLtoFile(data, 'image.png');
    //         // setCreateObjectURL(URL.createObjectURL(i));
    //         setCreateObjectURL(img_file);
    //         setShowMethod(false);
    //         setShowSizeForm(true);
    //         setShowInstruction(false);
    //         // console.log("weeeeeeeeeeeeeee",i.size);
    //         let img = window.document.createElement("img");
    //         img.onload = function () {
    //             // alert(img.width + " "+ img.height)
    //             setHeightImg((img.width * 134) / img.height);
    //         };
    //         img.src = createObjectURL;
    //         //const img =  "/"+ event.target.files[0].name;
    //         setShowImg(i);
    //         console.log("ffffffffffff", heightImg)
    //     }
    // };
    return (
        <>
            <div className="modal-form_i">
                <div className="modal-overlay-form_i"></div>
                <div className="modal-body-form_i">
                    <div className="modal-inner-form_i">
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
                        <div className="bundle_button">
                            <p className="cancle_instruct" onClick={() => {setShowConfirm(true); setShowInstruction(false)}}>Cancel</p>
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
        </>
    )
}

export default instruction