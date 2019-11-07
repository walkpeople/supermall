export function debounce(func, delay) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("goodsList Item already loaded , we exec debounce at "+ formatDate(new Date(Date.now()), "yyyy-MM-dd hh:mm:ss") );
      func.apply(context, args);
    }, delay);
  };
}

//日期格式化函数
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDay(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "m+": date.getMilliseconds()
  };

  for (let key in o) {
    if (new RegExp(`(${key})`).test(fmt)) {
      let str = o[key] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.lenght === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
