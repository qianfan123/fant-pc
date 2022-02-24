/*
 * @Author: 杜风
 * @Date: 2021-07-01 19:53:09
 * @LastEditTime: 2021-07-01 20:08:51
 * @LastEditors: 杜风
 * @Description:
 * @FilePath: \sodm-web\src\utils\DateUtil.ts
 * 记得注释
 */
/**
 * Created by jsama on 2020/2/20.
 */

export default class DateUtil {
  /**
   * 将日期格式化为指定格式
   * @param date
   * @param fmt
   * @returns {*|string}
   */
  static format(date: any, fmt = "yyyy-MM-dd HH:mm:ss") {
    date = date === undefined ? new Date() : date;
    date = typeof date === "number" ? new Date(date) : date;
    fmt = fmt || "yyyy-MM-dd HH:mm:ss";
    const obj: any = {
      y: date.getFullYear(), // 年份，注意必须用getFullYear
      M: date.getMonth() + 1, // 月份，注意是从0-11
      d: date.getDate(), // 日期
      q: Math.floor((date.getMonth() + 3) / 3), // 季度
      w: date.getDay(), // 星期，注意是0-6
      H: date.getHours(), // 24小时制
      h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
      m: date.getMinutes(), // 分钟
      s: date.getSeconds(), // 秒
      S: date.getMilliseconds() // 毫秒
    };
    const week: any = ["天", "一", "二", "三", "四", "五", "六"];
    for (const i in obj) {
      fmt = fmt.replace(new RegExp(i + "+", "g"), function(m) {
        let val = obj[i] + "";
        if (i === "w") return (m.length > 2 ? "星期" : "周") + week[val];
        for (let j = 0, len = val.length; j < m.length - len; j++) val = "0" + val;
        return m.length === 1 ? val : val.substring(val.length - m.length);
      });
    }
    return fmt;
  }
}
