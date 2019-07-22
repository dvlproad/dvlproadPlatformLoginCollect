/* 
//使用示例： 
import LKNetWorkTool from '/networkTool/LKNetWorkTool'

networkInfo = {type,isConnected,details}
type:[
    none(Android, iOS, Windows),
    unknown(Android, iOS, Windows),
    cellular(Android, iOS, Windows),
    wifi(Android, iOS, Windows),
    bluetooth(Android),
    ethernet(Android, Windows),
    wimax(Android),
    vpn(Android),
    other(Android, iOS, Windows)
]
details:[
    isConnectionExpensive,
    cellularGeneration:[
        null,
        2g,
        3g,
        4g
    ]
]

//、、、  
handleMethod(networkInfo){
       console.log('test', (networkInfo.isConnected ? 'online' : 'offline'));
   }
//、、、
constructor(props) {
    super(props);
    LKNetWorkTool.checkNetworkState((networkInfo)=>{
          if(!networkInfo.isConnected){
              console.log('网络无连接');
          }
        });
  }

componentWillMount() {
       LKNetWorkTool.addEventListener('监听标识：一般为当前类名',this.handleMethod.bind(this));
   }

componentWillUnmount() {
      LKNetWorkTool.removeEventListener('监听标识：一般为当前类名');
      }
*/

import NetInfo from "@react-native-community/netinfo";

var networkSubscribe = [];
var networkListener = null;

export default {
    /***
     * 检查网络链接状态
     * @param callback
     */
    checkNetworkState(callback) {
        NetInfo.fetch().then(networkInfo => {
            callback && callback(networkInfo);
        });
    },
    /***
     * 添加网络状态变化监听
     * @param tag
     * @param handler
     */
    addEventListener(tag, handler) {
        let subscribe = { tag: tag, handle: handler };
        //添加监听对象
        if (!this.hasExistSubscribe(tag)) {
            networkSubscribe.push(subscribe);
        }
        if (networkListener) {
            return;
        }
        networkListener = NetInfo.addEventListener(networkInfo => {
            for (let item of networkSubscribe) {
                item.handle && item.handle(networkInfo);
            }
        });
    },
    /***
     * 移除网络状态变化监听
     * @param tag
     */
    removeEventListener(tag) {
        this.removeSubscribe(tag);
    },
    /**
     *移除当前app的网络监听
     *
     */
    removeMiniAppNetworkListener() {
        networkListener();
        networkListener = null;
    },
    /**
     *是否存在监听者
     *
     * @param {标识*} tag
     * @returns
     */
    hasExistSubscribe(tag) {
        for (let index = 0; index < networkSubscribe.length; index++) {
            const element = networkSubscribe[index];
            if (element.tag == tag) {
                return true;
            }
        }
        return false;
    },
    /**
     *移除监听者
     *
     * @param {标识*} tag
     */
    removeSubscribe(tag) {
        for (let index = 0; index < networkSubscribe.length; index++) {
            const element = networkSubscribe[index];
            if (element.tag == tag) {
                networkSubscribe.splice(index, 1);
                break;
            }
        }
    },
}
