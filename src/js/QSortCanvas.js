/**
 * a tool class for data sort visual
 * @param {HTMLCanvasElement} el canvas element
 */
function createQSortCanavs(el, data) {
    if (! el instanceof HTMLCanvasElement) {
        throw 'el must be instance of HTMLCanvasElement'
    }

    const pillarWidth = 8;
    const pillarSpace = 2;
    const dataScale = 4;


    var canvasWidth = el.offsetWidth,
        canvasHeight = el.offsetHeight,
        exchanges = [],
        dataLength = data.length,
        startX = 0,
        context = el.getContext('2d'),
        currentStep = 0;

    var qSortObjects = init(context, canvasWidth, canvasHeight, data, pillarSpace, pillarWidth);

    /**
     * show the next change animate
     */
    function next(callback) {
        if (currentStep >= exchanges.length) {
            callback && calback();
            return
        }
        var needChange = exchanges[currentStep];
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        qSortObjects.filter(data => needChange.indexOf(data.config.index) < 0).forEach(draw);
        doAnimate(qSortObjects.filter(d => needChange.indexOf(d.config.index) > -1), function () {
            currentStep ++;
            callback && callback()
        });
    }

    /**
     * play data change
     */
    function play(callback) {
        if (currentStep < exchanges.length) {
            next(function () {
                play(callback);
            })
        } else {
            qSortObjects.forEach(draw);
            callback && callback()
        }
    }

    

    function draw(obj) {
        obj.draw(context, startX, canvasHeight, dataScale, pillarWidth, pillarSpace);
    }

    function init(context, canvasWidth, canvasHeight, data, pillarSpace, pillarWidth, ) {
        // set style
        context.fillStyle = "#f00";
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        // init basic info

        startX = (canvasWidth - dataLength * (pillarSpace + pillarWidth) + pillarSpace) / 2;
        var objs = [];
        for (var i = 0; i < data.length; i++) {
            objs.push(new QSortObject({
                value: data[i],
                index: i
            }));
        }
        objs.forEach(draw);

        return objs;
    }

    function exch(data, src, dst) {
        exchanges.push([src, dst]);
        var tmp = data[dst];
        data[dst] = data[src];
        data[src] = tmp;
    }

    function doAnimate(changes, callback) {
        var tmp = changes[0].config.index;
        changes[0].config.index = changes[1].config.index;
        changes[1].config.index = tmp;
        context.save()
        context.fillStyle = '#00f';
        changes.forEach(a => draw(a));
        context.restore()
        setTimeout(() => {
            callback && callback()
        }, 500);
    }

    return {exch, play}


}

/**
 * data obj
 * @param {*} config 
 */
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