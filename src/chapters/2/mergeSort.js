function sort(data){
    _sort(data, 0, data.length);
}

function _sort(data, lo, max) {
    var mid = parseInt((lo + max) / 2);
    if (mid == max || mid == lo) {
        return;
    }
    _sort(data, lo, mid);
    _sort(data, mid, max);
    merge(data, lo, mid, max)
}

function mergr(data, lo, mid, max) {
    var i = lo; j = mid;
    var aux = [];
    for (var s=lo; s<=max; s++) {
      aux[s] = data[s];
    }
    var current = lo;
    while(i < mid || j < max) {
      if (i == mid || compare(aux[j], aux[i])) {
        data[current ++] = aux[j++];
        continue;
      }
      data[current ++] = aux[i ++];
    }
}