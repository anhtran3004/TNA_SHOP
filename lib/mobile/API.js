export const makePending = async (web_token) => {
    const data = {
        "web_token": web_token
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers
    }
    const response = await fetch('https://api.3drp.tech/mark_token_is_pending',
        fetchData)
    try {
        const json = await response.json();
        console.log("is true make pending", json);

    } catch (error) {
        console.log("Error:", error);
    }
}

export const dataURLtoFile = (dataURL, filename) => {

    let arr = dataURL.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
}