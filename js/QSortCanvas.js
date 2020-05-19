function QSortCanavs(el) {
    this.context = el.getContext('2d');
    var width = el.offsetWidth,
        height = el.offsetHeight,
        pillarWidth = 8,
        pillarSpace = 2,
        exchanges = [],
        datas = [],
        currentStep = 0;

    var startX = 0;

    init(this.context);

    var _this = this;

    function init(context) {
        context.fillStyle = "#f00";
    }

    this.setData = function (data) {
        startX = (width - data.length * (pillarSpace + pillarWidth) + pillarSpace) / 2;
        for (var i = 0; i < data.length; i++) {
            datas.push(new QSortObject({
                value: data[i],
                index: i
            }));
        }
        datas.forEach(obj => draw(obj));
    }

    this.exch = function (data, src, dst) {
        exchanges.push([src, dst]);
        var tmp = data[dst];
        data[dst] = data[src];
        data[src] = tmp;
    }

    this.next = function (callback) {
        if (currentStep >= exchanges.length) {
            callback && calback();
        }
        var indexs = exchanges[currentStep];
        _this.context.clearRect(0, 0, 400, 200);
        datas.forEach(data => {
            if (indexs.indexOf(data.config.index) > -1) {
                return;
            }
            draw(data);
        });
        this.doAnimate(datas.filter(d => indexs.indexOf(d.config.index) > -1), 200, function () {
            currentStep++;
            callback && callback()
        });

    }

    this.doAnimate = function (changes, time, callback) {
        _this.context.save();
        var tmp = changes[0].config.index;
        changes[0].config.index = changes[1].config.index;
        changes[1].config.index = tmp;
        changes.forEach(a => draw(a));
        setTimeout(() => {
            callback && callback()
        }, 500);
    }

    function draw(obj) {
        obj.draw(_this.context, startX, height, 4, 4, 2);
    }

    this.play = function (callback) {
        if (currentStep < exchanges.length) {
            var _this = this;
            this.next(function () {
                _this.play(callback);
            })
        } else {
            console.log('done')
            callback && callback()
        }
    }
}

function QSortObject(config) {
    this.config = Object.assign({
        value: 0,
        index: 0
    }, config);
    /**
     * 
     * @param {*} context canavs上下文
     * @param {*} startX 其实x坐标
     * @param {*} height canvas高度
     * @param {*} scale value缩放
     * @param {*} width 柱宽
     * @param {*} space 间隔
     */
    function draw(context, startX, height, scale, width, space) {
        var pillarHeight = this.config.value * scale;
        context.fillRect((width + space) * this.config.index + startX, height - pillarHeight, width, pillarHeight);
    }
    this.draw = draw;
}