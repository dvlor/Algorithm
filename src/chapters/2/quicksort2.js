function sort(data){
    _sort(data, 0, data.length-1);
}

function _sort(data, lo, hi) {

    if (lo >= hi) {
        // insertSort(data, lo, hi);
        return;
    }
    var i = lo +1, f = data[lo], min = lo, max = hi;
    while(i <= max) {
        var c = compare(data[i], f);
        if (c > 0) {
            exch(data, i, max --);
        } else if (c < 0) {
            exch(data, i++, min++);
        } else {
            i ++;
        }
    }
    _sort(data, lo, min-1);
    _sort(data, max+1, hi);
}

function insertSort(data, lo, hi) {
    for(var i=lo; i <= hi; i ++) {
      for(var j = i; j > 0 && compare(data[j], data[j-1]) < 0; j --) {
        exch(data, j, j-1);
      }
    }
  }