//cjdemoPickerImageCell.js

import React, { Component } from 'react';
import {View, Image, StyleSheet, Dimensions, Alert, Text, TouchableOpacity, FlatList} from 'react-native';
import ImageChooseButton, { ImageSourceType } from '../../commonUI/button/ImageChooseButton'


// export default class CJDemoPickerImageFlatList extends Component {
//     render() {
//         const { style } = this.props;
//         return (
//             <View style={[{flexDirection: 'row', justifyContent: "space-between", paddingTop: 12}, style]}>
//                 <ImageButton style={{ width: 164, height: 108, backgroundColor:'red'}}
//                              imageSourceType={ImageSourceType.Network}
//                              imageUrl='/resources/healthCerImage1.png'
//                              pickImageHandle={() => {
//                                  Alert.alert("点击选择图片1");
//                              }}
//                              deleteImageHandle={() => {
//                                  Alert.alert("点击删除图片1");
//                              }}
//                 />
//                 <ImageButton style={{ width: 164, height: 108, backgroundColor:'green'}}
//                              imageSourceType={ImageSourceType.Local}
//                              imageUrl="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg"
//                              pickImageHandle={() => {
//                                  Alert.alert("点击选择图片2");
//                              }}
//                              deleteImageHandle={() => {
//                                  Alert.alert("点击删除图片2");
//                              }}
//                 />
//             </View>
//         );
//     }
// }

export default class CJDemoPickerImageFlatList extends Component {
    render() {
        const { style } = this.props;

        const screenWidth = Dimensions.get('window').width;
        //const imageWidth = 164;
        //const imageHeight = 108;
        const imageWidth = screenWidth/2 - 50;
        const imageHeight = imageWidth*0.7;

        return (
            <View style={[{paddingTop: 12}, style]}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    // horizontal={true}
                    // showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    data={[
                        {key: 'Devin'},
                        {key: 'Jackson'},
                        {key: 'James'},
                    ]}
                    renderItem={({item}) => {
                        return (
                            <ImageChooseButton style={{backgroundColor:'green'}}
                                         imageWidth={imageWidth}
                                         imageHeight={imageHeight}
                                         imageSourceType={ImageSourceType.Local}
                                         imageUrl="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg"
                                         pickImageHandle={() => {
                                             Alert.alert("点击选择图片2");
                                         }}
                                         deleteImageHandle={() => {
                                             Alert.alert("点击删除图片2");
                                         }}
                            />
                        )
                    }}
                />
            </View>
        );
    }
}
