Math.getRandom = function(...t) {
    let n = 0, a = 0;
    return 1 === t.length && Array.isArray(t[0]) ? (n = t[0][0], a = t[0][1]) : 2 === t.length && (n = t[0], 
    a = t[1]), Math.random() * (a - n) + n;
}, Math.getRandomInt = function(...t) {
    return Math.floor(Math.getRandom(...t));
}, Math.getRandomBool = function() {
    return Math.getRandom(0, 1) > .5;
}, Math.getPointLength = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
}, Math.dirMin = function(t, n) {
    let a = Math.abs(t);
    return t / a * Math.min(a, n);
}, Math.dirMax = function(t, n) {
    let a = Math.abs(t);
    return t / a * Math.max(a, n);
}, Math.clamp = function(t, n, a) {
    return t < n ? n : t > a ? a : t;
}, Math.clamp0_1 = function(t) {
    return Math.clamp(t, 0, 1);
}, Math.getNormalValue = function(t) {
    return t ? t / Math.abs(t) : 0;
}, Math.addZero = function(t) {
    return t < 10 ? "0" + t : t;
}, Math.getArithmeticSub = function(t, n, a = 1) {
    return n * t + n * (n - 1) * a / 2;
}, Math.mySeed = 0, Math.myRandomBySeed = function(t) {
    let n = this.mySeed || 0;
    this.mySrand(t), this.myRandom(), this.myRandom();
    let a = this.random();
    return this.mySrand(n), a;
}, Math.myRandom2 = function() {
    return this.mySeed = (214013 * this.mySeed + 2531011) % 4294967296, this.mySeed / 4294967296;
}, Math.myRandom = function() {
    return this.mySeed = (1103515245 * this.mySeed + 12345) % 4294967296, this.mySeed / 4294967296;
}, Math.mySrand = function(t) {
    this.mySeed = parseInt(t) || 0;
}, Math.getRandom2 = function(t, n, a) {
    return a ? Math.myRandom() * (n - t) + t : Math.random() * (n - t) + t;
}, Math.getRandomInt2 = function(t = 0, n = 16777215, a = null) {
    return Math.floor(Math.getRandom2(t, n, a));
};