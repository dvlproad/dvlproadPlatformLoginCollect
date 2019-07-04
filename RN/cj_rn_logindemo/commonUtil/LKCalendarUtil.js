//LKCalendarUtil.js

export default class LKCalendarUtil {
    /**
     *
     * @param beginYear     开始年(默认1900)
     * @param endYear       结束年(默认2300)
     * @returns {Array}     开始年到结束年之间的所有天
     */
    static createDateData=(beginYear=1900, endYear=2300)=> {
        let date = [];
        for(let i=beginYear;i<endYear;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }
}