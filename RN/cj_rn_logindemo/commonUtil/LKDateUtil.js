// LKDateUtil.js

export default class LKDateUtil {
    /**
     * 创建日期
     * @param shortDateString   将形如'2017-06-28'转成date类
     * @returns Date
     */
    static yyyyMMddDate(shortDateString) {
        if (shortDateString) {
            let fullDateString = shortDateString + ' ' + '00:00:00';
            return this.yyyyMMdd_hhmmssDate(fullDateString);
        } else {
            return null;
        }
    }

    /**
     * 创建日期
     * @param fullDateString    将形如'2017-06-28 10:48:46'转成date类
     * @returns Date
     */
    static yyyyMMdd_hhmmssDate(fullDateString) {
        if (fullDateString) {
            let regEx = new RegExp("\\-", "gi");
            let validDateStr = fullDateString.replace(regEx, "/");
            let milliseconds = Date.parse(validDateStr);
            return new Date(milliseconds);
        }
        return '';
    }

    /**
     * 日期转化为字符串
     * @param date          将日期转化为形如'2017-06-28'的字符串
     * @returns {string}
     */
    static yyyyMMddString(date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };

    /**
     * 日期转化为字符串
     * @param date          将日期转化为形如'2017-06-28 10:48:46'的字符串
     * @returns {string}
     */
    static yyyyMMdd_hhmmssString(date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    };


    /**
     * 计算日期：指定日期的加上 yearsToBeAdded 后的年
     * @param sinceDate         指定日期
     * @param yearsToBeAdded    要加多少年
     * @returns Date
     */
    static addYears(sinceDate, yearsToBeAdded) {
        const newDate = sinceDate;
        newDate.setFullYear(sinceDate.getFullYear() + yearsToBeAdded);
        return newDate;
    }

    /**
     * 计算日期：指定日期的加上 daysToBeAdded 后的天
     * @param sinceDate         指定日期
     * @param daysToBeAdded     要加多少天
     * @returns Date
     */
    static addDays(sinceDate, daysToBeAdded) {
        let timestamp = sinceDate.getTime();
        return new Date(timestamp + daysToBeAdded * 24 * 3600 * 1000);
    }


    /**
     * 比较日期：判断第二个日期是否比第一个日期大
     *
     * @param date1
     * @param date2
     * @returns {boolean}
     */
    static compareSecondDateLater(date1, date2) {
        const dateTime1 = date1.getTime();
        const dateTime2 = date2.getTime();
        if(dateTime2 > dateTime1) {
            return true;
        }else{
            return false;
        }
    }


    /**
     * 比较日期：判断指定的yyyyMMdd日期字符串是否比今天大
     *
     * @param yyyyMMddDateString2
     * @returns {boolean}
     */
    static compareyyyyMMddDateStringLaterToday(yyyyMMddDateString2) {
        let yyyyMMddDateString1 = this.yyyyMMddString(new Date());
        return this.compareSecondyyyyMMddDateStringLater(yyyyMMddDateString1, yyyyMMddDateString2);
    }

    /**
     * 比较日期：判断第二个yyyyMMdd日期字符串是否比第一个yyyyMMdd日期字符串大
     *
     * @param yyyyMMddDateString1
     * @param yyyyMMddDateString2
     * @returns {boolean}
     */
    static compareSecondyyyyMMddDateStringLater(yyyyMMddDateString1, yyyyMMddDateString2) {
        if (yyyyMMddDateString1 && yyyyMMddDateString1.length > 8) {
            if (yyyyMMddDateString2 && yyyyMMddDateString2.length > 8) {
                let yyyyMMddDate1 = LKDateUtil.yyyyMMddDate(yyyyMMddDateString1);
                let yyyyMMddDate2 = LKDateUtil.yyyyMMddDate(yyyyMMddDateString2);
                let isSecondDateLater = LKDateUtil.compareSecondDateLater(yyyyMMddDate1, yyyyMMddDate2);
                return isSecondDateLater;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    /**
     * 日期格式化
     * @param timestamp     时间戳
     * @param formatter     时间格式
     * @returns {string | boolean | NavigationReplaceAction | void | *}
     */
    static formatDate(timestamp, formatter) {
        let date = new Date();
        date.setTime(parseInt(timestamp));
        formatter = (formatter != null) ? formatter : 'yyyy-MM-dd hh:mm';
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };

            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                    (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return fmt;
        }
        return date.Format(formatter);
    }

    /**
     * 根据时间戳获取周几
     * @param {时间戳} dateTimeStamp 
     */
    static getWeekWithDate(dateTimeStamp) {
        var date = new Date(dateTimeStamp);
        let day = date.getDay();
        let weekArray = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return weekArray[day];
    }
    /**
     *获取年月日和星期
     *
     * @static
     * @param {时间戳*} dateTimeStamp
     * @returns yyyy年MM月dd日 周几
     * @memberof LKDateUtil
     */
    static getDateStrAndWeek(dateTimeStamp) {
        let dateStr = LKDateUtil.formatDate(dateTimeStamp, 'yyyy年MM月dd日');
        let week = LKDateUtil.getWeekWithDate(dateTimeStamp);
        return dateStr + ' ' + week;
    }

}