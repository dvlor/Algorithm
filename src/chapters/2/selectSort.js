function sort(data) {
  for(var i=0; i < data.length - 1; i ++) {
    var min = i;
    for(var j = i + 1; j < data.length; j ++) {
      if (compare(data[j], data[min]) > 0) {
        min = j;
      }
    }
    if (min !== i) {
      exch(data, min, i);
    }
  }
}