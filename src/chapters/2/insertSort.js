function sort(data) {
  var length = data.length;
  for(var i=1; i < length; i ++) {
    for(var j = i; j > 0 && compare(data[j], data[j-1]) < 0; j --) {
        exch(data, j, j-1);
    }
  }
}