import React from 'react'
import { Button } from 'react-native'

class ButtonFactory {
    static blueButton() {
        return <Button title="内标题">外标题</Button>
    }
}

export default ButtonFactory;