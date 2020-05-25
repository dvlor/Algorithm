function InsertSort() {
    this.sort = function (data) {
        var length = data.length;
        for (var i = 1; i < length; i++) {
            for (var j = i; j > 0 && compare(data[j], data[j - 1]) < 0; j--) {
                exch(data, j, j - 1);
            }
        }
    }
}

function QuickSort() {
    this.sort = function (data) {
        _sort(data, 0, data.length - 1);
    }

    function _sort(data, lo, max) {
        if (lo >= max) return;
        var mid = partition(data, lo, max);
        _sort(data, lo, mid - 1);
        _sort(data, mid + 1, max);
    }

    function partition(data, lo, max) {
        var min = data[lo];
        var i = lo + 1;
        var j = max;
        while (true) {
            while (compare(data[i], min) < 0 && i < j) {
                i++;
            }
            while (compare(min, data[j]) <= 0 && i < j) {
                j--;
            }
            if (i >= j) {
                if (compare(min, data[j]) < 0) j--;
                break;
            }
            exch(data, i, j);
        }
        exch(data, lo, j);
        return j;
    }
}

function QuickSort2() {
    this.sort = function (data) {
        _sort(data, 0, data.length - 1);
    }

    function _sort(data, lo, hi) {
        if (lo >= hi) {
            return;
        }
        var i = lo + 1, f = data[lo], min = lo, max = hi;
        while (i <= max) {
            var c = compare(data[i], f);
            if (c > 0) {
                exch(data, i, max--);
            } else if (c < 0) {
                exch(data, i++, min++);
            } else {
                i++;
            }
        }
        _sort(data, lo, min - 1);
        _sort(data, max + 1, hi);
    }
}


function SelectSort() {
    this.sort = function (data) {
        for (var i = 0; i < data.length - 1; i++) {
            var min = i;
            for (var j = i + 1; j < data.length; j++) {
                if (compare(data[j], data[min]) < 0) {
                    min = j;
                }
            }
            if (min !== i) {
                exch(data, min, i);
            }
        }
    }
}

function ShellSort() {
    this.sort = function (data) {
        var length = data.length;
        var h = 1;
        while (h < length / 3) {
            h = 3 * h + 1;
        }

        while (h >= 1) {
            for (var i = h; i < length; i++) {
                for (var j = i; j >= h && compare(data[j], data[j - h]) < 0; j -= h) {
                    exch(data, j, j - h);
                }
            }
            h = parseInt(h / 3);
        }
    }
}

const html = ['InsertSort', 'QuickSort', 'QuickSort2', 'SelectSort', 'ShellSort'].map(s => `<option value="${s}">${s}</option>`).join('');
var sort = new InsertSort().sort;
window.onload = function () {
    const select = document.getElementById("select");
    select.innerHTML = html
    select.onchange = function () {
        console.log(select.value)
        switch (select.value) {
            case 'InsertSort':
                sort = new InsertSort().sort;
                reset();
                break;
            case 'QuickSort':
                sort = new QuickSort().sort;
                reset();
                break;
            case 'QuickSort2':
                sort = new QuickSort2().sort;
                reset();
                break;
            case 'SelectSort':
                sort = new SelectSort().sort;
                reset();
                break;
            case 'ShellSort':
                sort = new ShellSort().sort;
                reset();
                break;
        }
    }
}