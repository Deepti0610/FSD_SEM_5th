const mypromise =new Promise((resolve, reject)=>{
    let age=19;
    if(age>=18){
        resolve("you are eligible to vote");
    }
    else{
        reject("you are not eligible to vote");
    }

})

const checkEligibility=()=>{
    const msg = mypromise;
    console.log(msg);
}
checkEligibility();



// mypromise
// .then((message)=>console.log(message))                                                                                                   0
//     .catch((error)=>console.log(error));
        
    