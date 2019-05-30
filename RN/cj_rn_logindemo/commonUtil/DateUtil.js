//DateUtil.js

class DateUtil{
    /**
     * 例如:2017-06-28 10:48:46转成date类,
     * 可把- replace成/
     * @param dateString
     * @return Date
     */
    static parserDateString(dateString){
        if(dateString){
            let regEx = new RegExp("\\-","gi");
            let validDateStr=dateString.replace(regEx,"/");
            let milliseconds=Date.parse(validDateStr);
            return new Date(milliseconds);

        }
    }

    /// 指定日期的加上 yearsToBeAdded 后的年
    static addYears(sinceDate, yearsToBeAdded) {
        const newDate = sinceDate;
        newDate.setFullYear(sinceDate.getFullYear()+yearsToBeAdded);
        return newDate;
    }

    static todayString() {
        return this.yyyyMMdd_hhmmssString(new Date());
    };

    static yyyyMMddString(date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };

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

    // timestamp时间戳  formater时间格式
    static formatDate(timestamp, formater) {
        let date = new Date();
        date.setTime(parseInt(timestamp));
        formater = (formater != null)? formater : 'yyyy-MM-dd hh:mm';
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
        return date.Format(formater);
    }
}
export default DateUtil;