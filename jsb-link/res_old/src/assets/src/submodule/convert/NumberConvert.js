let proto = Number.prototype;

function format(t) {
    return (t + "").replace(/(?=(?!\b)(\d{3})+$)/g, ",");
}

proto.equals = function(t) {
    return this === t;
}, proto.isZero = function() {
    return 0 === this;
}, proto.getNormal = function() {
    return this.isZero() ? 0 : this / Math.abs(this);
}, proto.clamp = function(t, o) {
    return this < t ? t : this > o ? o : this;
}, proto.format = function() {
    return format(this);
}, Number.formatNumber = function(t) {
    return format(t);
}, proto.doNFunc = function(t) {
    for (let o = 0; o < this; o++) t && t(o, this);
}, Number.doNFunc = function(t, o) {
    for (let e = 0; e < t; e++) o && o(e);
};

let dateObj = {
    ms: 1,
    second: 1e3,
    minute: 60,
    hour: 60,
    day: 24
}, dateList = [ "ms", "second", "minute", "hour", "day" ];

proto.dateToDate = function(t, o, e) {
    let r = dateList.indexOf(t), n = dateList.indexOf(o), i = this;
    if (-1 === r || -1 === n || r === n) ; else if (r > n) for (let t = r; t > n; t--) i *= parseInt(dateObj[dateList[t]]); else for (let t = r + 1; t <= n; t++) i /= parseInt(dateObj[dateList[t]]);
    return e ? e(i) : i;
};

for (let t of dateList) for (let o of dateList) if (t !== o) {
    o = o.substring(0, 1).toUpperCase() + o.substring(1), proto[`${t}To${o}`] = function(e) {
        return this.dateToDate(t, o, e);
    };
}

proto.toSecond = function(t) {
    return this.dateToDate("ms", "second", t);
}, proto.toMinute = function(t) {
    return this.dateToDate("ms", "minute", t);
}, proto.toHour = function(t) {
    return this.dateToDate("ms", "hour", t);
}, proto.toDay = function(t) {
    return this.dateToDate("ms", "day", t);
}, proto.secondTo = function(t) {
    return this.dateToDate("second", "ms", t);
}, proto.minuteTo = function(t) {
    return this.dateToDate("minute", "ms", t);
}, proto.hourTo = function(t) {
    return this.dateToDate("hour", "ms", t);
}, proto.dayTo = function(t) {
    return this.dateToDate("day", "ms", t);
}, proto.padding = function(t = 1) {
    return (Array(t).join("0") + this).slice(-t);
}, proto.toDateStr = function() {
    let t = Math.max(0, this), o = Math.floor(t.toSecond()) % 60, e = Math.floor(t.toMinute()) % 60;
    return `${Math.floor(t.toHour()).padding(2)}:${e.padding(2)}:${o.padding(2)}`;
};