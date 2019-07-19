import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Platform,
  Animated,
  Keyboard
} from 'react-native';
import Style from './style';
import {LKDatePickerAndroid, LKDatePickeriOS} from "./LKOwnDatepicker";
import LKToastUtil from "../toast/LKToastUtil";

const FORMATS = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm'
};


class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      allowPointerEvents: true
    };

    this.onPressDate = this.onPressDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dateString !== this.props.dateString) {
      this.setState({
        dateString: nextProps.dateString
      });
    }
  }



  onStartShouldSetResponder(e) {
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }



  getTitleElement() {
    const {customStyles, allowFontScaling} = this.props;

    if (!this.props.dateString && this.props.placeholder) {
      return (
        <Text allowFontScaling={allowFontScaling} style={[Style.placeholderText, customStyles.placeholderText]}>
          {this.props.placeholder}
        </Text>
      );
    }
    return (
      <Text allowFontScaling={allowFontScaling} style={[Style.dateText, customStyles.dateText]}>
        {this.state.date}
      </Text>
    );
  }



  onPressDate() {
    if (this.props.disabled) {
      return true;
    }

    Keyboard.dismiss();

    // // reset state
    // this.setState({
    //   date: date
    // });

    if (Platform.OS === 'ios') {
      this.datePickeriOS.show();

    } else {
      const {format = FORMATS[mode], is24Hour = !format.match(/h|a/)} = this.props;

      const mode = this.props.mode;
      let date = this.state.date;
      let minDate = this.props.minDate;
      let maxDate = this.props.maxDate;
      const androidMode = this.props.androidMode;
      LKDatePickerAndroid.showChoose(mode, date, minDate, maxDate, format, androidMode,
          (newDateString, newDate)=>{
            LKToastUtil.showMessage(newDateString);
            this.setState({
              dateString: newDateString,
            });

            if (typeof this.props.onDateChange === 'function') {
              this.props.onDateChange(newDateString, newDate);
            }
          },
          ()=>{
            if (typeof this.props.onCloseModal === 'function') {
              this.props.onCloseModal();
            }
          });
    }

    if (typeof this.props.onOpenModal === 'function') {
      this.props.onOpenModal();
    }
  }

  _renderIcon() {
    const {
      showIcon,
      iconSource,
      iconComponent,
      customStyles
    } = this.props;

    if (showIcon) {
      if (iconComponent) {
        return iconComponent;
      }
      return (
        <Image
          style={[Style.dateIcon, customStyles.dateIcon]}
          source={iconSource}
        />
      );
    }

    return null;
  }

  render() {
    const {
      style,
      customStyles,
      disabled,
      TouchableComponent,
      testID,
      cancelBtnTestID,
      confirmBtnTestID,
    } = this.props;

    const dateInputStyle = [
      Style.dateInput, customStyles.dateInput,
      disabled,
      disabled && customStyles.disabled,
    ];

    return (
      <TouchableComponent
        style={[Style.dateTouch, style]}
        underlayColor={'transparent'}
        onPress={this.onPressDate}
        testID={testID}
      >
        <View style={[Style.dateTouchBody, customStyles.dateTouchBody]}>
          {
            !this.props.hideText ?
              <View style={dateInputStyle}>
                {this.getTitleElement()}
              </View>
            :
              <View/>
          }
          {this._renderIcon()}
          {Platform.OS === 'ios' && <LKDatePickeriOS
              datePickerConStyle={customStyles.datePickerCon}
              datePickerStyles={customStyles.datePicker}

              cancelButtonTestID={cancelBtnTestID}
              cancelButtonStyle={customStyles.btnCancel}
              cancelTextStyle={customStyles.btnTextCancel}

              confirmButtonTestID={confirmBtnTestID}
              confirmButtonStyle={customStyles.btnConfirm}
              confirmTextStyle={customStyles.btnTextConfirm}

              date={this.props.date}
              mode={this.props.mode}
              format={this.props.format}
              minimumDate={this.props.minDate}
              maximumDate={this.props.maxDate}

              // component height=216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
              height={this.props.height}

              // slide animation duration time, default to 300ms, IOS only
              duration={this.props.duration}

              confirmBtnText={this.props.confirmBtnText}
              cancelBtnText={this.props.cancelBtnText}
              allowFontScaling={this.props.allowFontScaling}

              onCloseModal={this.props.onCloseModal}
              onPressMask={this.props.onPressMask}
              onDateChange={(dateString)=>{
                this.props.onDateChange && this.props.onDateChange(dateString);
              }}
              ref={ref => this.datePickeriOS = ref}
          />}
        </View>
      </TouchableComponent>
    );
  }
}

DatePicker.defaultProps = {
  mode: 'date',
  androidMode: 'default',
  dateString: '',
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height: 259,

  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  confirmBtnText: '确定',
  cancelBtnText: '取消',
  iconSource: require('./date_icon.png'),
  customStyles: {},

  // whether or not show the icon
  showIcon: true,
  disabled: false,
  allowFontScaling: true,
  hideText: false,
  placeholder: '',
  TouchableComponent: TouchableHighlight,
  modalOnResponderTerminationRequest: e => true
};

DatePicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'datetime', 'time']),
  androidMode: PropTypes.oneOf(['clock', 'calendar', 'spinner', 'default']),
  dateString: PropTypes.string,
  format: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  height: PropTypes.number,
  duration: PropTypes.number,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  iconComponent: PropTypes.element,
  customStyles: PropTypes.object,
  showIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  allowFontScaling: PropTypes.bool,
  onDateChange: PropTypes.func,
  onOpenModal: PropTypes.func,
  onCloseModal: PropTypes.func,
  onPressMask: PropTypes.func,
  placeholder: PropTypes.string,
  modalOnResponderTerminationRequest: PropTypes.func,
  is24Hour: PropTypes.bool,
  locale: PropTypes.string
};

export default DatePicker;
