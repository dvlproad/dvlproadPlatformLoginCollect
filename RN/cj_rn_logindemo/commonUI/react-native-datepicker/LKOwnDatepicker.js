import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  DatePickerIOS,
  Animated,
} from 'react-native';
import Style from './style';
import Moment from 'moment';

const FORMATS = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm'
};

const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];


export class LKDatePickeriOS extends Component {
  static propTypes = {
    datePickerConStyle: PropTypes.object,
    datePickerStyles: PropTypes.object,

    cancelButtonTestID: PropTypes.string,
    cancelButtonStyle: PropTypes.object,
    cancelTextStyle: PropTypes.object,

    confirmButtonTestID: PropTypes.string,
    confirmButtonStyle: PropTypes.object,
    confirmTextStyle: PropTypes.object,

    getDateStr: PropTypes.func,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.object]),
    mode: PropTypes.oneOf(['date', 'datetime', 'time']),
    format: PropTypes.string,
    locale: PropTypes.string,
    minimumDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maximumDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    height: PropTypes.number,
    duration: PropTypes.number,
    confirmBtnText: PropTypes.string,
    cancelBtnText: PropTypes.string,
    allowFontScaling: PropTypes.bool,

    onCloseModal: PropTypes.func,
    onPressMask: PropTypes.func,
    onDateChange: PropTypes.func,
  };

  static defaultProps = {
    datePickerConStyle: {},
    datePickerStyles: {},

    cancelButtonTestID: '',
    cancelButtonStyle: {},
    cancelTextStyle: {},

    confirmButtonTestID: '',
    confirmButtonStyle: {},
    confirmTextStyle: {},

    date: '',
    mode: 'date',
    format: 'YYYY-MM-DD',
    locale: null,

    minimumDate: '',
    maximumDate: '',

    // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
    height: 259,

    // slide animation duration time, default to 300ms, IOS only
    duration: 300,

    confirmBtnText: '确定',
    cancelBtnText: '取消',
    allowFontScaling: true,

    onCloseModal: ()=>{},
    onPressMask: ()=>{},
    onDateChange: ()=>{},
  };



  constructor(props) {
    super(props);

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      allowPointerEvents: true
    };

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onPressMask = this.onPressMask.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  show() {
    this.setModalVisible(true);
  }

  getDate(date = this.props.date) {
    const {mode, format = FORMATS[mode]} = this.props;
    const minDate = this.props.minimumDate;
    const maxDate = this.props.maximumDate;
    return LKDatePickerDateUtil.getDate(date, minDate, maxDate, format);
  }

  getDateStr(date = this.props.date) {
    const {mode, format = FORMATS[mode]} = this.props;

    const dateInstance = date instanceof Date
        ? date
        : this.getDate(date);

    if (typeof this.props.getDateStr === 'function') {
      return this.props.getDateStr(dateInstance);
    }

    return Moment(dateInstance).format(format);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setState({date: this.getDate(nextProps.date)});
    }
  }

  setModalVisible(visible) {
    const {height, duration} = this.props;

    // slide animation
    if (visible) {
      this.setState({modalVisible: visible});
      return Animated.timing(
          this.state.animatedHeight,
          {
            toValue: height,
            duration: duration
          }
      ).start();
    } else {
      return Animated.timing(
          this.state.animatedHeight,
          {
            toValue: 0,
            duration: duration
          }
      ).start(() => {
        this.setState({modalVisible: visible});
      });
    }
  }


  onPressMask() {
    if (typeof this.props.onPressMask === 'function') {
      this.props.onPressMask();
    } else {
      this.onPressCancel();
    }
  }

  onPressCancel() {
    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }

  onPressConfirm() {
    if (typeof this.props.onDateChange === 'function') {
      this.props.onDateChange(this.getDateStr(this.state.date), this.state.date);
    }

    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }


  render() {
    const {
      minimumDate,
      maximumDate,
      minuteInterval,
      timeZoneOffsetInMinutes,
    } = this.props;

    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={this.state.modalVisible}
            supportedOrientations={SUPPORTED_ORIENTATIONS}
            onRequestClose={() => {this.setModalVisible(false);}}
        >
          <View
              style={{flex: 1}}
          >
            <TouchableHighlight
                style={Style.datePickerMask}
                activeOpacity={1}
                underlayColor={'#00000077'}
                onPress={this.onPressMask}
            >
              <TouchableHighlight
                  underlayColor={'#fff'}
                  style={{flex: 1}}
              >
                <Animated.View
                    style={[Style.datePickerCon, {height: this.state.animatedHeight}, this.props.datePickerConStyle]}
                >
                  <View pointerEvents={this.state.allowPointerEvents ? 'auto' : 'none'}>
                    <DatePickerIOS
                        date={this.state.date}
                        mode={this.props.mode}
                        minimumDate={minimumDate && this.getDate(minimumDate)}
                        maximumDate={maximumDate && this.getDate(maximumDate)}
                        onDateChange={(date)=>{
                          this.setState({
                            allowPointerEvents: false,
                            date: date
                          });

                          const timeoutId = setTimeout(() => {
                            this.setState({
                              allowPointerEvents: true
                            });
                            clearTimeout(timeoutId);
                          }, 200);

                          this.onDateChange(date);
                        }}
                        minuteInterval={minuteInterval}
                        timeZoneOffsetInMinutes={timeZoneOffsetInMinutes ? timeZoneOffsetInMinutes : null}
                        style={[Style.datePicker, this.props.datePickerStyles]}
                        locale={this.props.locale}
                    />
                  </View>
                  <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={this.onPressCancel}
                      style={[Style.btnText, Style.btnCancel, this.props.cancelButtonStyle]}
                      testID={this.props.cancelButtonTestID}
                  >
                    <Text
                        allowFontScaling={this.props.allowFontScaling}
                        style={[Style.btnTextText, Style.btnTextCancel, this.props.cancelTextStyle]}
                    >
                      {this.props.cancelBtnText}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={this.onPressConfirm}
                      style={[Style.btnText, Style.btnConfirm, this.props.confirmButtonStyle]}
                      testID={this.props.confirmButtonTestID}
                  >
                    <Text allowFontScaling={this.props.allowFontScaling}
                          style={[Style.btnTextText, this.props.confirmTextStyle]}
                    >
                      {this.props.confirmBtnText}
                    </Text>
                  </TouchableHighlight>
                </Animated.View>
              </TouchableHighlight>
            </TouchableHighlight>
          </View>
        </Modal>
    )
  }
}


export class LKDatePickerAndroid extends Component {
  static showChoose (mode, date, minDate, maxDate, format, androidMode, onDateChange, onCloseModal) {
    // 选日期
    if (mode === 'date') {
      LKDatePickerAndroid.showDateChoose(
          date,
          minDate,
          maxDate,
          format,
          androidMode,
          onDateChange,
          onCloseModal
      );

    } else if (mode === 'time') { // 选时间
      LKDatePickerAndroid.showTimeChoose(
          date,
          minDate,
          maxDate,
          format,
          androidMode,
          onDateChange,
          onCloseModal
      );


    } else if (mode === 'datetime') {
      LKDatePickerAndroid.showDateTimeChoose(
          date,
          minDate,
          maxDate,
          format,
          androidMode,
          onDateChange,
          onCloseModal
      );
    }
  }

  /**
   * 选日期
   * @param date
   * @param minDate
   * @param maxDate
   * @param format
   * @param androidMode
   * @param onDateChange
   * @param onCloseModal
   */
  static showDateChoose (date, minDate, maxDate, format, androidMode, onDateChange, onCloseModal) {
    DatePickerAndroid.open({
      date: date,
      minDate: minDate && LKDatePickerDateUtil.getDate(minDate, minDate, maxDate, format),
      maxDate: maxDate && LKDatePickerDateUtil.getDate(maxDate, minDate, maxDate, format),
      mode: androidMode
    }).then(({action, year, month, day}) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        let newDate = new Date(year, month, day);
        let newDateString = LKDatePickerDateUtil.getDateStr(newDate, format);
        if (typeof onDateChange === 'function') {
          onDateChange(newDateString, newDate);
        }

      } else {
        if (typeof onCloseModal === 'function') {
          onCloseModal();
        }
      }
    });
  }

  /**
   * 选时间
   * @param date
   * @param minDate
   * @param maxDate
   * @param format
   * @param androidMode
   * @param onDateChange
   * @param onCloseModal
   */
  static showTimeChoose (date, minDate, maxDate, format, androidMode, onDateChange, onCloseModal) {
    const is24Hour = !format.match(/h|a/);
    let timeMoment = Moment(date);

    TimePickerAndroid.open({
      hour: timeMoment.hour(),
      minute: timeMoment.minutes(),
      is24Hour: is24Hour,
      mode: androidMode
    }).then(({action, hour, minute}) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        let newDate = Moment().hour(hour).minute(minute).toDate();
        let newDateString = LKDatePickerDateUtil.getDateStr(newDate, format);
        if (typeof onDateChange === 'function') {
          onDateChange(newDateString, newDate);
        }

      } else {
        if (typeof onCloseModal === 'function') {
          onCloseModal();
        }
      }
    });
  }

  /**
   * 选日期和时间
   * @param date
   * @param minDate
   * @param maxDate
   * @param format
   * @param androidMode
   * @param onDateChange
   * @param onCloseModal
   */
  static showDateTimeChoose (date, minDate, maxDate, format, androidMode, onDateChange, onCloseModal) {
    this.showDateChoose(date, minDate, maxDate, format, androidMode,
        (newDateString, newDate)=>{
      this.showTimeChoose(newDate, minDate, maxDate,format, androidMode,
          (newDateTimeString, newDateTime)=>{
            if (typeof onDateChange === 'function') {
              onDateChange(newDateTimeString, newDateTime);
            }
          },
          ()=>{
            if (typeof onCloseModal === 'function') {
              onCloseModal();
            }
          })
        },
        ()=>{
          if (typeof onCloseModal === 'function') {
            onCloseModal();
          }
        });
  }
}


class LKDatePickerDateUtil {
  static getDate(date, minDate, maxDate, format) {
    // date默认值
    if (!date) {
      let now = new Date();
      if (minDate) {
        let _minDate = this.getDate(minDate);

        if (now < _minDate) {
          return _minDate;
        }
      }

      if (maxDate) {
        let _maxDate = this.getDate(maxDate);

        if (now > _maxDate) {
          return _maxDate;
        }
      }

      return now;
    }

    if (date instanceof Date) {
      return date;
    }

    return Moment(date, format).toDate();
  }



  static getDateStr(date, format) {
    const dateInstance = date instanceof Date
        ? date
        : this.getDate(date);

    // if (typeof this.props.getDateStr === 'function') {
    //   return this.props.getDateStr(dateInstance);
    // }

    return Moment(dateInstance).format(format);
  }
}
