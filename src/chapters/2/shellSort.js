function sort(data) {
    var length = data.length;
    var h = 1;
    while (h < length / 3) {
        h = 3*h + 1;
    }

    while (h >= 1) {
        for (var i = h; i < length; i ++) {
            for (var j=i; j>=h && compare(data[j], data[j-h]) < 0; j-=h){
                exch(data, j, j-h);
            }
        }
        h = parseInt(h / 3);
    }
  }