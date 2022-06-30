function getRandInRange(begin, end){
    [begin, end] = [Math.min(begin, end), Math.max(begin, end)];
    return begin + Math.floor(Math.random() * (end - begin + 1));
}

function isShortString(string, maxLength){
    return string.length <= maxLength;
}