function sort(data){
    _sort(data, 0, data.length - 1);
}

function _sort(data, lo, max) {
    if (lo >= max) return;
    var mid = partition(data, lo , max);
    _sort(data, lo, mid -1);
    _sort(data, mid+1, max);
}

function partition(data, lo, max) {
    var min = data[lo];
    var i = lo + 1;
    var j = max;
    while(true) {
        while (compare(data[i], min) && i < j) {
            i++;
        }
        if (compare(min, data[j]) && i < j) {
            j --;
        }
        if (i >= j) {
            break;
        }
        exch(data, i, j);
    }
    exch(data, lo, j);
    return j;
}