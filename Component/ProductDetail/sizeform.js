import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { setSizes } from "../../slices/counterSlices";
import { setBlob } from '../../slices/blobSlices'
import {
    create3DBody,
    get3DBodyMeasurements,
    getRecommendedSize,
    UploadFrontImage,
    UploadSideImage,
    UploadFaceImage,
    CheckImage,
    DoArImage,
    ResultStatus,
    ResultImage,
} from "../../lib/APIs";


const Sizeform = (props) => {
    const setShowSizeForm = props.setShowSizeForm;
    const setShowConfirm = props.setShowConfirm;
    const showSizeFound = props.showSizeFound;
    const showSizeNotFound = props.showSizeNotFound;
    const height = props.height;
    const handleChangeHeight = props.handleChangeHeight;
    const showError = props.showError;
    const weight = props.weight;
    const handleChangeWeight = props.handleChangeWeight;
    const showErrorWeight = props.showErrorWeight;
    const setGender = props.setGender;
    const gender = props.gender;
    const disable = props.disable;
    const setShowMethod = props.setShowMethod;
    const createObjectURL = props.createObjectURL;
    const showMethod = props.showMethod;
    // const handleChange = props.handleChange;
    const setShowQR = props.setShowQR;
    const setShowSizeFound = props.setShowSizeFound;
    const setShowWaittingSize = props.setShowWaittingSize;
    const setShowSizeNotFound = props.setShowSizeNotFound;
    const setShowImageError = props.setShowImageError;
    const category = props.category;
    const brand = props.brand;
    const sku = props.sku;
    // const web_token = props.web_token;
    const subCategory = props.subCategory;
    const setShow404 = props.setShow404;
    const setQRnone = props.setQRnone;
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);
    const img_files = props.img_files;
    const heightImg = props.heightImg;
    const setShowWatingSeeItMe = props.setShowWatingSeeItMe;
    const [items, setItems] = useState([]);
    // console.log("cccccccccccccccc", category)
    // const get3DBodyMeasurements = props.get3DBodyMeasurements;
    let timerId = null;
    let timerIds = null;
    useEffect(() => {
        setDisabled(false);
    }, [showSizeFound, showSizeNotFound])

    const processAPIError = () => {
        setShowSizeFound(false)
        setShowSizeNotFound(true);
    }

    const processRequestError = (e) => {
        // todo: processRequestError
        // console.log("request error", e)
        setShow404(true);
    }
    const toDoAr = async () => {
        try {
            const your_gender = document.getElementById('gender').value;
            const your_height = document.getElementById('height').value;
            const your_weight = document.getElementById('weight').value;
            const token_ar = await UploadFaceImage(img_files);
            const status_check = await CheckImage(img_files);
            console.log("pppppppppppppppppp", token_ar);
            await DoArImage(brand, sku, your_weight, your_height, your_gender, token_ar);
            
            timerIds = setInterval(async () => {
                console.log("cccccccccccc",status_check.status)
                if(status_check.status == 200){
                setShowImageError(false);
                const status = await ResultStatus(token_ar);
                // const js = await ResultImage(token_ar);
                console.log("jjjjjjj", status);
                if (status == 200) {
                    setShowWatingSeeItMe(false);
                    const blob = await ResultImage(token_ar);
                    dispatch(setBlob(blob));
                    console.log("bbbbbbbbbbbb", blob);
                    // for (let i = 1; i < timerIds + 1; i++) {
                    //     clearInterval(i); 
                    // }
                }
                if (status == 500) {
                    setShowWatingSeeItMe(false);
                    dispatch(setBlob(createObjectURL));
                }
                if(status == 4000){
                    setShowWatingSeeItMe(false);
                    
                    setShowWatingSeeItMe(true);
                }
            }if(status_check.status == 500){
                setShowWatingSeeItMe(false);
                setShowImageError(true);
            }
            }, 1000);
        
        } catch (e) {
            setShowWaittingSize(false);
            processRequestError(e)
        }
    }
    const toDopd = async () => {
        try {
            setShowSizeForm(false);
            setShowWaittingSize(true);

            const your_gender = document.getElementById('gender').value;
            const your_height = document.getElementById('height').value;
            const your_weight = document.getElementById('weight').value;
            window.localStorage.setItem('gender', your_gender);
            // confirm("Start process");
            console.log(img_files);
            //  await getInfo_from_iframe();
            const token = await UploadFrontImage(img_files);
            await UploadSideImage(token, img_files);
            await create3DBody(token, your_gender, your_height, your_weight);

            // eslint-disable-next-line react-hooks/exhaustive-deps
            timerId = setInterval(async () => {
                const json = await get3DBodyMeasurements(token);
                console.log("wwwwwwwwwwwwwwwwww", json);
                // if (status == 200) {
                if (json.code === 200) {
                    setShowWaittingSize(false);
                    setShowSizeFound(true);
                    const _your_measurements = json.data.body_measure;
                    window.localStorage.setItem('_your_measurements', JSON.stringify(_your_measurements));
                    const jsons = await getRecommendedSize(_your_measurements, your_gender, brand, category, subCategory);
                    if (jsons.status === 500) {
                        processAPIError()
                        dispatch(setSizes(''))
                        window.localStorage.setItem('_your_measurements', JSON.stringify({ "anh": "500" }));
                    } else {
                        dispatch(setSizes(jsons.recommend_size))
                    }
                    for (let i = 1; i < timerId + 1; i++) {
                        // console.log("timerId",timerId, i)
                        clearInterval(i); // clear all Interval, if re-click the button many times
                    }
                    for (let i = 1; i < timerIds + 1; i++) {
                        clearInterval(i);
                    }

                } else if (json.code === 40000) {
                    // pending

                } else {
                    setShowWaittingSize(false);
                    processAPIError();
                    // const _your_measurements = json.data.body_measure;
                    window.localStorage.setItem('_your_measurements', JSON.stringify({ "anh": "500" }));
                }
            }, 1000);
        } catch (e) {
            setShowWaittingSize(false);
            processRequestError(e)
        }
    }

    return (
        <>
            <style jsx>{`
                .modal-body-form{
                    @media screen and (max-width: 576px) {
                        .modal-form{
                            width: 995px;
                        }
                    }
                }
            `}</style>
            <div className="modal-form">
                <div className="modal-overlay-form"
                    onClick={() => {
                        setShowSizeForm(false)
                    }}
                ></div>
                <div className="modal-body-form">
                    <div className="modal-inner-form">
                        <h6>Size Recomendation</h6>
                        <div className="x" onClick={() => {
                            setShowConfirm(true);
                            setShowSizeForm(false)
                        }}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>

                        <form id="form_f">
                            <input type="hidden" name="brand_name" value={brand} />
                            <input type="hidden" name="category" value={category} />
                            <input type="hidden" name="subCategory" value={subCategory} />
                            <label>Enter your height (cm)</label>
                            <br></br>

                            <input
                                type="number"
                                className="height"
                                name="height"
                                id="height"
                                defaultValue={height}
                                placeholder="height"
                                onChange={handleChangeHeight}
                            />
                            <br></br>
                            {showError ? (
                                <p className="text-danger error_infor" id="error_if">
                                    Height must be an integer 50 and 200
                                </p>
                            ) : null}
                            <label>Enter your weight (kg)</label>
                            <br></br>

                            <input
                                type="number"
                                className="weight"
                                name="weight"
                                id="weight"
                                defaultValue={weight}
                                onChange={handleChangeWeight}
                                placeholder="weight"
                                required
                            />
                            <br></br>
                            {showErrorWeight ? (
                                <p className="text-danger error_infors" id="error_ifs">
                                    Weight must be an integer 30 and 150
                                </p>
                            ) : null}

                            <label>Gender</label>
                            <br></br>
                            <select name="gender" id="gender" value={gender} onChange={(e) => {
                                setGender(e.target.value)
                            }}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <br></br>
                            <label>Your front full-body photo</label>

                        </form>
                        <div className='choosephoto_p'>
                            <div className="choosephoto">
                                {disable ? (
                                    <button
                                        type="button"
                                        disabled={disable}
                                        onClick={() => setShowMethod(true)}
                                    >

                                        <Image
                                            src="/static/productDetail/add.png"
                                            width="48"
                                            height="48"
                                            alt=""
                                        />
                                    </button>
                                ) : (
                                    <button type="button" onClick={() => { setShowMethod(true); setShowQR(false); setQRnone(false); }}>
                                        <Image
                                            src="/static/productDetail/add.png"
                                            width="48"
                                            height="48"
                                            alt=""
                                        />
                                    </button>
                                )}
                                {createObjectURL != null ? (
                                    <div className='frame_img'>
                                        <Image
                                            src={createObjectURL}
                                            height="134"
                                            width={heightImg}
                                            alt=""
                                            className="imgf"
                                            id="imgd"
                                            // quality={20}
                                            // sizes="(max-width: 400px)"

                                        />
                                    </div>
                                ) : null}
                                {createObjectURL != null ? (
                                    <>
                                        <label
                                            htmlFor="upload_photo"
                                            className="upload_photo"
                                            id="upload_photos"
                                            onClick={() => {
                                                setShowMethod(true);
                                                setShowSizeForm(false);
                                                setShowQR(false);
                                                setQRnone(false);
                                            }}
                                        >
                                            Change Picture
                                        </label>
                                        {showErrorWeight == false ?
                                            <>
                                                {!showError ? <>
                                                    <input
                                                        className="submit-s g"
                                                        id="submit-s"
                                                        name="submit"
                                                        type="button"
                                                        value="Let's start"

                                                        disabled={disabled}
                                                        onClick={() => {
                                                            
                                                            toDopd();
                                                            toDoAr();
                                                            setDisabled(true);
                                                        }}
                                                    />
                                                    <div
                                                        className="cancel_s"
                                                        onClick={() => setShowSizeForm(false)}
                                                    >
                                                        Cancel
                                                    </div>

                                                </> : <>
                                                    <div
                                                        className="cancel"
                                                        onClick={() => setShowSizeForm(false)}
                                                    >
                                                        Cancel
                                                    </div>
                                                </>}
                                            </> : <>
                                                <div
                                                    className="cancel"
                                                    onClick={() => setShowSizeForm(false)}
                                                >
                                                    Cancel
                                                </div>
                                            </>}


                                        {/* <div
                                            className="cancel"
                                            onClick={() => setShowSizeForm(false)}
                                        >
                                            Cancel
                                        </div> */}
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="cancel_h"
                                            onClick={() => setShowConfirm(true)}
                                        >
                                            Cancel
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Sizeform