Date.prototype.Format = function(fmt) {
  const o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
module.exports = {
  dateFormat(time, str = "yyyy-MM-dd hh:mm:ss") {
    return new Date(time).Format(str);
  },
  is() {
    const is = {
      types: [
        "Array",
        "Function",
        "Boolean",
        "Date",
        "Number",
        "Object",
        "RegExp",
        "String",
        "Window",
        "HTMLDocument"
      ]
    };
    for (let i = 0, c; (c = is.types[i++]); ) {
      is[c] = (function(type) {
        return function(obj) {
          if (type === "Number" && isNaN(obj)) {
            return false;
          }
          return Object.prototype.toString.call(obj) == "[object " + type + "]";
        };
      })(c);
    }
    return is;
  },
  async QueryPage({ pageNo = 1, size = 20 }, callback) {
    pageNo = +pageNo;
    size = +size;
    if (!this.is().Number(pageNo)) pageNo = 1;
    if (!this.is().Number(size)) size = 20;
    if (pageNo < 1) pageNo = 1;
    if (size <= 0) size = 20;
    if (size > 1000) size = 1000;
    const count = await callback().count();
    const rows = await callback()
      .skip((pageNo - 1) * size)
      .limit(size);
    return {
      size,
      pageNo,
      pageSize: Math.ceil(count / size),
      count,
      rows
    };
  },
  filterQuery(query = {}) {
    const result = {};
    Object.keys(query).map(key => {
      if (query[key]) {
        result[key] = query[key];
      }
    });
    return result;
  }
};
