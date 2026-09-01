Array.prototype.clear = function() {
    this.splice(0, this.length);
}, Array.prototype.clone = function() {
    return this.slice();
}, Array.prototype.getRandomOne = function() {
    return this[Math.getRandomInt(0, this.length)];
}, Array.prototype.getRandomCount = function(t) {
    if (t > this.length) return console.log("超出数组长度"), this;
    let r, e, n = this.slice(0), o = this.length, i = o - t;
    for (;o-- > i; ) r = n[e = Math.floor((o + 1) * Math.random())], n[e] = n[o], n[o] = r;
    return n.slice(i);
}, Array.prototype.getRandomCountDiff = function(t) {
    let r = this.slice(0), e = [], n = r.length;
    for (let o = 0; o < n; o++) {
        let n = Math.floor(Math.random() * r.length);
        if (e.indexOf(r[n]) < 0 && (e.push(r[n]), e.length === t)) return e;
        r.splice(n, 1);
    }
    return console.log("未找到足够数量的元素"), e;
}, Array.prototype.getRandomExcept = function(t, r = 1) {
    Array.isArray(t) || (t = [ t ]);
    let e = this.filter(r => t.indexOf(r) < 0);
    return 1 === r ? e.getRandomOne() : e.getRandomCount(r);
}, Array.prototype.getRanomExceptIdx = function(t, r = 1) {
    Array.isArray(t) || (t = [ t ]);
    let e = this.filter((r, e) => t.indexOf(e) < 0);
    return 1 === r ? e.getRandomOne() : e.getRandomCount(r);
}, Array.prototype.addRange = function(t) {
    this.concat(t);
}, Array.prototype.insert = Array.prototype.insert || function(t, r) {
    this.splice(t, 0, r);
}, Array.prototype.removeAt = function(t) {
    let r = this.splice(t, 1);
    return r.length > 0 ? r[0] : null;
}, Array.prototype.remove = function(...t) {
    for (let r of t) {
        let t = this.indexOf(r);
        t > -1 && this.removeAt(t);
    }
}, Array.prototype.removeRange = function(t, r) {
    return this.splice(t, r);
}, Array.prototype.removeByMatch = function(t) {
    let r = this.filter(t);
    for (let t = 0; t < r.length; t++) this.remove(r[t]);
    return r;
}, Array.prototype.contains = function(t) {
    return this.indexOf(t) > -1;
}, Array.prototype.distinct = function() {
    return [ ...new Set(this) ];
}, Array.prototype.sum = function() {
    for (var t = 0, r = 0; r < this.length; r++) "number" == typeof this[r] ? t += this[r] : console.log("Tips: [" + this[r] + "] isn\\'t Number!");
    return t;
}, Array.prototype.upset = function() {
    for (var t = this.length, r = 0; r < t - 1; r++) {
        var e = Math.floor(Math.random() * (t - r)), n = this[e];
        this[e] = this[t - r - 1], this[t - r - 1] = n;
    }
    return this;
}, Array.prototype.getMax = function() {
    return Math.max.apply(null, this);
}, Array.prototype.getMin = function() {
    return Math.min.apply(null, this);
}, Array.getUnion = function(...t) {
    let r = [];
    return t.forEach(t => {
        r = [ ...r, ...t ];
    }), [ ...new Set(r) ];
}, Array.getIntersect = function(...t) {
    return t.reduce((t, r) => {
        return t.filter(t => r.indexOf(t) >= 0);
    });
}, Array.shuffle = function(t) {
    for (var r = t.slice(), e = r.length, n = 0; n < e - 1; n++) {
        var o = Math.floor(Math.random() * (e - n)), i = r[o];
        r[o] = r[e - n - 1], r[e - n - 1] = i;
    }
    return r;
};