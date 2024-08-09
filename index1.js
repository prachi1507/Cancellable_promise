// #main function

/*
time @params
return @promise
**/

function cancellableTimeout(duration) {
    let valueSetTimeOut;
    let rejectPromise;

    const promise = new Promise((resolve, reject) => {
        rejectPromise = reject;
        valueSetTimeOut = setTimeout(() => {
            resolve('Promise Fullfilled/resolve');
            clockInterval.cancel();  // Cancel the clock interval #HELPER
        }, duration);
    });

    promise.cancel = () => {
        clearTimeout(valueSetTimeOut);
        rejectPromise('Promise rejected');

    };

    return promise;
}

// Start and store the timeout promise and interval
let timeoutPromise;
let clockInterval;

document.querySelector('#startTimeOut').addEventListener('click', () => {
    clockInterval = helperFuntionToShow();        // Start the clock
    
    
    timeoutPromise = cancellableTimeout(10000);   // Start the timeout
    document.querySelector('.result').innerHTML = 'Pending'
    timeoutPromise.then((message) => {
            console.log(message);
            document.querySelector('.result').innerHTML = message
        })
        .catch(error => {
            console.error(error);
            document.querySelector('.result').innerHTML = error;
        });
});



// Cancel/stop  Promise (both timeout and clock)
document.querySelector('#cancelTimeout').addEventListener('click', () => {
   // if (timeoutPromise) {
        timeoutPromise.cancel();  
    //}
    //if (clockInterval) {
        clockInterval.cancel();
    //}
});




// Helper function to show a clock with cancellation capability #HELPER
const helperFuntionToShow = () => {
    let initSeconds = 1;
    const value = setInterval(() => {
        document.querySelector('#Clock').innerHTML = initSeconds+(initSeconds>1?' Seconds':'Second');
        initSeconds++;
    }, 1000);

    return {
        cancel: () => {
            clearInterval(value);
        }
    };
};
