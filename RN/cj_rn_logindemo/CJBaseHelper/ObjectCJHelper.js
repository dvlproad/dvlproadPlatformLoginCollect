
export default class ObjectCJHelper {
    /**
     * 判断对象是否为NULL或nil
     * @param object
     * @returns {boolean}
     */
    static isNullForObject(object) {
        if (typeof object === "undefined" || object == null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 判断对象是否为空
     * @param object
     * @returns {boolean}
     */
    static isEmptyForObject(object) {
        if (this.isNullForObject(object)) {
            return true;
        }

        if (typeof object === "string") {
            if (object.length == 0) {
                return true;
            }
            return false;
        } else {    // number \ boolean \ function
            return false;
        }
    }

    /**
     * 怎么判断一个数是否是NaN
     * @param number
     * @returns {boolean}
     */
    static isNaN(number) {
        return isNaN(number);
        //附：错误判断：如果你用 if (number === NaN) 得到的始终会是false
    }


    /**
     * 判断是否是数组
     * @param object
     * @returns {boolean}
     */
    static isArray(object) {
        return Object.prototype.toString.call(object)== '[object Array]';
    }

    /**
     * 处理传进来的style参数(该参数类型可能为字典也可能为数组)
     * 常用于：this.props.style = ObjectCJHelper.dealPropStyle(this.props.style);
     *
     * @param originStyle
     * @returns {Array|*}
     */
    static dealPropStyle(originStyle) {
        if (this.isArray(originStyle)) {
            let newStyle = [];
            for (let i = 0; i < originStyle.length; i++) {
                Object.assign(newStyle, originStyle[i]);
            }
            return newStyle;
        } else {
            return originStyle;
        }
    }
}
