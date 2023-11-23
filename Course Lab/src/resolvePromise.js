

export function resolvePromise(prms, promiseState) {
    if (!prms) {
        return;
    }
    
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;
    
    prms.then(successACB).catch(failureACB);

    function successACB(result) {
        if (promiseState.promise === prms) {
            promiseState.data = result;
        }
    }

    function failureACB(err) {
        promiseState.error = err;
    }
}

export default resolvePromise;
