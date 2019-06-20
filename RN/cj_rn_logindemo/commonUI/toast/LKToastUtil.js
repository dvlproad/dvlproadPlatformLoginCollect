//LKToastUtil.js
import React from 'react';
import Toast from "react-native-root-toast";

class LKToastUtil {
    static showMessage(message){
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }
}

export default LKToastUtil;