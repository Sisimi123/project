let util = {

};
util.isNull = function (o) {
    return o == null || o == undefined || o == "";
};

util.trim = function (o) {
    if (this.isNull(o))
        return "";
    return o.replace(/^\s+|\s+$/gm, '');
};

util.isEmpty = function (o) {
    return this.isNull(o) || this.trim(o) == "";
};
util.digui = function (node, search, handler) {
    if (this.isNull(node))
        return undefined;
    if (handler == undefined) {
        if (!this.isNull(node.title) && node.title.indexOf(search) >= 0) {
            //node.title = node.title.replace(search, '<span style=\"color:red\">' + search + '</span>');
            return node;
        }
    } else {
        if (handler(node, search))
            return node;
    }
    if (this.isNull(node.children))
        return undefined;
    var children = []
    for (var i = 0; i < node.children.length; i++) {
        var child = util.digui(node.children[i], search, handler);
        if (!this.isNull(child))
            children.push(child);
    }
    if (children.length == 0)
        return undefined;
    node.children = children;
    node["expand"] = true;
    return node;
};
util.deepCopy = function (source) {
    var str = JSON.stringify(source); //序列化对象
    return JSON.parse(str); //还原
};

util.diguiTree = function (nodes, search, handler) {
    var search = this.trim(search);
    if (this.isEmpty(search))
        return nodes;
    var newTree = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = util.digui(nodes[i], search, handler);
        if (!this.isNull(node))
            newTree.push(node);
    }
    return newTree;
}

export default util;
