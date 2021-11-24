const parsePathToArray = (string) => {
    const tokens = string.split("/");
    const nonempty = tokens.filter(token => token.length > 0);
    return nonempty;
}

const parsePathToString = (array) => {
    let string = "";
    array.map((token) => {return(
        string += `/${token}`
    )});
    return string;
}

const cloneObject = (obj) => {
    const clone = JSON.parse(JSON.stringify(obj));
    return clone;
}

const utils = {
    parsePath: {
        toString: parsePathToString,
        toArray: parsePathToArray
    },
    clone: cloneObject,
}

export default utils;