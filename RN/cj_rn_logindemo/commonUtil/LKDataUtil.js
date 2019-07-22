// LKDataUtil.js

export default class LKDataUtil {
    /**
     * 获取唯一值
     * @returns {string}
     */
    static getUUID =()=>{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }


    /**
     * 获取一个随机值(该随机值的取值范围为start到end中)
     * @param start     最小值
     * @param end       最大值
     * @returns {number}
     */
    static getRandomNumber = (start, end) => {
        let length = end - start;
        let num = parseInt(Math.random() * (length) + start);
        return num;
    }
}