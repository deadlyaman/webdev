function download(url) {
    return new Promise((resolve, reject) => {
        if (!url.startsWith("http"))
            reject(new Error("Url does not start with http "))
        else {
            setTimeout(() => { //! fake 3-sec download task
                let filename = url.split('/').pop()
                resolve(filename)
            }, 3000);
        }
    })
}

function resize(filename) {
    return new Promise((resolve, reject) => {
        if (!filename.endsWith(".png")) {
            reject(new Error("file is not png"))
        }
        else { // ! Fake resize task
            setTimeout(() => {
                let resizedfile = filename.split('.')[0] + "resized" + "png"

                resolve(resizedfile)
            });
        }
    })
}

//same way can write same fake upload function
//resolve ki value can be passed to then function jacha nicha ki h
download('http://cb.lk/logo.png').then((filename) => {
    resize(filename).then((resizedfile) => {
        console.log("Resize file is at : " + resizedfile)
    })
}).catch((e) => {
    console.error(e)
})

//! dono ka same result aaye gha logic samaj
//  download('http://cb.lk/logo.png').then(resize).then((resizedfile) => {
//     console.log("Resize file is at : " + resizedfile)
// })


//agar humna promise.all() me ek se jadha argument pass kiya h or koi ek error deta h toh catch function chala gha then function nhi

Promise.all([
    download('http://cb.lk/logo.png'),
    download('http://cb.lk/logo.png'),
    download('http://cb.lk/logo.png')
]).then((downloadvalues) => {
    return Promise.all(downloadvalues.map(resize))
}).catch((e) => {
    console.error(e)
})