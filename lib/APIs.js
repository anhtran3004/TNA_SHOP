import React from "react";
import FormData from 'form-data';
//const img_file = '1.jpg';
var _token = 'cc763e6f4983da52a0583cf3c07e730618f19835ea6ad1c118d139b3c2b6544e9fda00bd8d37e7a81718184f79a2b1b9e0dacefc5255be751ae531448c53fc01';

const AR_BASE_URL = process.env.NEXT_PUBLIC_API_AR_BASE_URL;

export const UploadFrontImage = async (img_file) => {
    try {
        const url_imgF = "https://api.3drp.tech/api/v4/mobile/predict_body/upload_front";
        const formData = new FormData();
        formData.append('front', img_file);
        const headers = new Headers();

        const resp = await fetch(url_imgF, {
            method: 'POST',
            body: formData,
            headers: headers
        })

        const jsons = await resp.json();
        // setImages(jsons);
        return jsons.data;
    } catch (e) {
        console.log("Upload front error ", e)
        throw e
    }

}
export const UploadSideImage = async (_token, img_file) => {
    try {
        // define URL and for element
        const url_imgF = "https://api.3drp.tech/api/v4/mobile/predict_body/upload_side";

        const formData = new FormData();
        formData.append('side', img_file);
        formData.append('token', _token)

        let headers = new Headers();
        // post form data
        let resp = await fetch(url_imgF, {
            method: 'POST',
            body: formData,
            headers: headers
        })
        return await resp.json();
    } catch (e) {
        throw e
    }
}

export async function create3DBody(_token, your_gender, your_height, your_weight) {
    try {
        let url_body =
            "https://api.3drp.tech/api/v4/mobile/predict_body/from_image";
        const y_height = your_height / 100;
        const y_weight = parseFloat(your_weight);
        // setGender(your_gender);
        const data = {
            gender: your_gender,
            height: y_height,
            config: "image::no::calib::op",
            token: _token,
            weight: y_weight,
            age: 25
        };
        // console.log("data create:", JSON.parse(JSON.stringify(data)));
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: "POST",
            body: JSON.stringify(data),
            headers: headers,
        };

        // console.log(url);
        let response = await fetch(url_body, fetchData);
        // console.log(response);
        const json = await response.json();
        // setTokens(json);
        console.log("create3DBody: ", json);

    } catch (e) {
        throw e
    }
}

// =============================================================
// Get Body Measurements
export const get3DBodyMeasurements = async (_token) => {
    try {
        let url_body = "https://api.3drp.tech/api/v4/mobile/predict_body/from_image/result";
        let data = {
            "token": _token
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        }

        console.log("data mesure: ", JSON.stringify(data))
        const response = await fetch(url_body, fetchData);
        //extract JSON from the http response
        return await response.json();
    } catch (e) {
        throw e
    }
}
// =============

// =============================================================
// To Recommend Size from Measurements
export async function getRecommendedSize(_your_measurements, your_gender, brand_name, category,subcategory) {
    let url = "https://api.3drp.tech/v3/mobile/recommend_size";
    // const brand_name = "BELLUNI";
    // const category = "TOP";
    // const subcategory = "SHIRT";
    //your_gender = genders;
    const data = {
        gender: your_gender,
        brand_name: brand_name,
        category: category,
        subcategory: subcategory,
        body_measures: _your_measurements,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    // The parameters we are gonna pass to the fetch function
    const fetchData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers,
    };

    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    try {
        // console.log(url);
        const response = await fetch(url, fetchData);
        console.log("getRecommendedSize: ", JSON.stringify(data));
        const json = await response.json();
        console.log("getRecommendedSize: json ", json);
        return json;
    } catch (error) {
        console.log("Error:", error);
        throw error
    }

}

export async function save_size_RdSv(web_token, your_size) {

    let url_body = 'https://api.3drp.tech/save_recommend_size_by_web_token';
    let data = {
        "web_token": web_token,
        "size": your_size
    }
    console.log("Saving data to redis:", JSON.stringify(data))
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); //application/json'
    // The parameters we are gonna pass to the fetch function
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers
    }


    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    try {
        // console.log(url);
        let response = await fetch(url_body, fetchData);
        // console.log(response);
        const json = await response.json();
        console.log("save data to redis server: ", json);
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }

}
export const UploadFaceImage = async (img_file) => {
    try {
        const url_imgF = AR_BASE_URL + "/upload_face_image";
        const formData = new FormData();
        formData.append('face_image', img_file);
        const headers = new Headers();

        const resp = await fetch(url_imgF, {
            method: 'POST',
            body: formData,
            headers: headers
        })

        const jsons = await resp.json();
        // setImages(jsons);
        return jsons.token_ar;
    } catch (e) {
        console.log("Upload front error ", e)
        // throw e
    }

}
export const CheckImage = async (img_file) => {
    try {
        const url_imgF = AR_BASE_URL + "/upload_and_check_face_image";
        const formData = new FormData();
        formData.append('face_image', img_file);
        const headers = new Headers();

        const resp = await fetch(url_imgF, {
            method: 'POST',
            body: formData,
            headers: headers
        })

        const jsons = await resp.json();
        // setImages(jsons);
        return jsons;
    } catch (e) {
        console.log("Upload front error ", e)
        // throw e
    }

}
export async function DoArImage(brand, sku, your_weight, your_height, gender, _token_ar) {
    try {
        let url_body = AR_BASE_URL + "/do_ar_img";
        const y_height = your_height / 100;
        const y_weight = parseFloat(your_weight);
        // setGender(your_gender);
        const data = {
            brand: brand,
            sku: sku,
            color: 0,
            weight: y_weight,
            height: y_height,
            gender: gender,
            token_ar: _token_ar
        };
        // console.log("data create:", JSON.parse(JSON.stringify(data)));
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: "POST",
            body: JSON.stringify(data),
            headers: headers,
        };

        // console.log(url);
        let response = await fetch(url_body, fetchData);
        // console.log(response);
        const json = await response.json();
        return json.status;
        // setTokens(json);
        // console.log("create3DBody: ", json);

    } catch (e) {
        // throw e
    }
}
export const ResultStatus = async (_token_ar) => {
    try {
        let url_body = AR_BASE_URL + "/get_result_status";
        let data = {
            "token_ar": _token_ar
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        }

        // console.log("data mesure: ", JSON.stringify(data))
        const response = await fetch(url_body, fetchData);
        //extract JSON from the http response
        const json = await response.json();
        return json.status;
    } catch (e) {
        // throw e
    }
}
export const ResultImage = async (_token_ar) => {
    try {
        let url_body = AR_BASE_URL + "/get_result_image";
        let data = {
            "token_ar": _token_ar
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        }

        // console.log("data mesure: ", JSON.stringify(data))
        const response = await fetch(url_body, fetchData);
        //extract JSON from the http response
        const imageBlob = await response.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob);
        return imageObjectURL;
    } catch (e) {
        // throw e
    }
}
export async function save_token_ar(web_token, token_ar) {

    let url_body = AR_BASE_URL + '/save_token_ar_by_web_token';
    let data = {
        "web_token": web_token,
        "token_ar": token_ar
    }
    // console.log("Saving data token_ar to redis:", JSON.stringify(data))
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); //application/json'
    // The parameters we are gonna pass to the fetch function
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers
    }


    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    try {
        // console.log(url);
        let response = await fetch(url_body, fetchData);
        // console.log(response);
        const json = await response.json();
        console.log("save data token_ar to redis server: ", json);
        return json.status;
    } catch (error) {
        console.log("Error:", error);
        // throw error;
    }

}
export async function get_token_ar(web_token) {

    let url_body = AR_BASE_URL + '/get_token_ar_by_web_token';
    let data = {
        "web_token": web_token
    }
    console.log("Saving data to redis:", JSON.stringify(data))
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); //application/json'
    // The parameters we are gonna pass to the fetch function
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers
    }


    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    try {
        // console.log(url);
        let response = await fetch(url_body, fetchData);
        // console.log(response);
        const json = await response.json();
        // console.log("save data to redis server: ", json);
        return json;
    } catch (error) {
        console.log("Error:", error);
        // throw error;
    }

}