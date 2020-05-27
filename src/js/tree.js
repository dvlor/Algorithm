function QTreeCanvas(el, node){
  const context = el.getContext('2d');
  const width = el.width, height = el.height;
  const radius = 15;
  const space = 10;

  const startPoint = { x: parseInt(width / 2), y: radius + 10, radius: radius};

  // 画圆
  function drawArc(context, point, node) {
    context.save();
    context.beginPath();
    context.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
    context.closePath()
    context.fillStyle = node ? node.color : '#f00';
    context.fill();
    context.restore();
  }

  // 画线
  function line(context, startPoint, endPoint) {
    context.save();
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.stroke()
    context.closePath();
    context.restore();
  }

  // 绘制文本
  function drawText(context, startPoint, node) {
    context.save();
    context.beginPath();
    context.fillStyle = "#fff";
    const text = node ? node.value: 'nil';
    context.fillText(text, startPoint.x - (text.toString().length * 2), startPoint.y + 4);
    context.closePath();
    context.restore();
  }

  // 绘制所有树节点
  function paint(context, startPoint, node, currentDeep, deep){
    if (node && (node.lNode || node.rNode)) { //节点是存在的 需要划线
      var level = deep - currentDeep;
      var s = level ? Math.pow(2, deep - currentDeep - 1) * (parseInt(space/2) + radius) : 0;
      console.log(level, s)
      const leftPoint = {x: startPoint.x - s, y: startPoint.y + 2 * radius + space, radius: startPoint.radius};
      const rightPoint = {x: startPoint.x + s, y: startPoint.y + 2 * radius + space, radius: startPoint.radius};
      line(context, startPoint, leftPoint);
      line(context, startPoint, rightPoint);
      drawArc(context, startPoint, node);
      drawText(context, startPoint, node);
      paint(context, leftPoint, node.lNode, currentDeep + 1, deep); // 左
      paint(context, rightPoint, node.rNode, currentDeep + 1, deep); // 右
    } else {
      drawArc(context, startPoint, node);
      drawText(context, startPoint, node);
    }
  }

  function getDeep(node) {
    if (node === null) {
      return 1;
    }
    var lLength = getDeep(node.lNode) + 1;
    var rLength = getDeep(node.rNode) + 1;
    return lLength > rLength ? lLength : rLength;
  }

  var currentDeep = 1;
  console.log(getDeep(node))
  paint(context, startPoint, node, currentDeep, getDeep(node) - 1);
}

function TNode(value) {
  this.value = value;
  this.color = '#f00';
  this.lNode = null;
  this.rNode = null;
}
TNode.prototype.add = function (value) {
  if (this.value > value) {
    if (this.rNode === null) {
      this.rNode = new TNode(value);
    } else {
      this.rNode.add(value);
    }
  } else {
    if (this.lNode === null) {
      this.lNode = new TNode(value);
    } else {
      this.lNode.add(value);
    }
  }
};