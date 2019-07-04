//LKCalendarUtil.js

export default class LKCalendarUtil {
    /**
     * 统计从指定年份到指定年份的所有日期
     * @param beginYear     开始年(默认1900)
     * @param endYear       结束年(默认2300)
     * @returns {Array}     开始年到结束年之间的所有天
     */
    static collectDateBetweenYears=(beginYear=1900, endYear=2300)=> {
        let dates = [];
        for(let i=beginYear;i<endYear;i++){
            let months = [];
            for(let j = 1;j<13;j++){
                // 计算'日'
                let days = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        days.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        days.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        days.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        days.push(k+'日');
                    }
                }

                // 计算'月'
                let _month = {};
                _month[j+'月'] = days;
                months.push(_month);
            }

            // 计算'年'
            let _date = {};
            _date[i+'年'] = months;
            dates.push(_date);
        }
        return dates;
    }
}