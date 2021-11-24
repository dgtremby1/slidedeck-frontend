const toArray = (string) => {
    const tokens = string.split("/");
    const nonempty = tokens.filter(token => token.length > 0);
    return nonempty;
}

const toString = (array) => {
    let string = "";
    array.map((token) => {return(
        string += `/${token}`
    )});
    return string;
}

const parsePath = {
    toArray: toArray,
    toString: toString 
}

export default parsePath;