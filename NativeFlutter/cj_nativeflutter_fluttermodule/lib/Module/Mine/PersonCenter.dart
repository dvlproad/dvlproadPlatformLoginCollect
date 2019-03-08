import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:async';

import 'package:cj_nativeflutter_fluttermodule/Tool/Adapter.dart';

void main() => runApp(PersonCenter());

class PersonCenter extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      home: new MyHomePage(),
    );
  }

  @override
  _PersonCenter createState() => _PersonCenter();
}

class MyHomePage extends StatefulWidget {
  @override
  _PersonCenter createState() => new _PersonCenter();
}

class _PersonCenter extends State<MyHomePage> {


  static const METHODCHANNEL = "com.dvlproad.ciyouzen/personCenterMethodChannel";
  static const EVENTCHANNEL = "com.dvlproad.ciyouzen/personCenterEventChannel";

  static const eventPlugin = const EventChannel(EVENTCHANNEL);

//  static const jumpPlugin = const MethodChannel("personmethodchannel");
  static const jumpPlugin = const MethodChannel(METHODCHANNEL);

  ///返回键点击
  static const backMethod = 'back';

  ///默认服务门店点击
  static const editStoreMethod = 'editStore';

  ///忘记密码点击
  static const editPassWordMethod = 'editPassWord';

  ///退出登录点击
  static const OUT = 'out';
  StreamSubscription _perseonSub;

  var _name = '';
  var _phone = '';
  var _store = '';
  var _barHeigt = 145;

  @override
  Widget build(BuildContext context) {
    Adapter()
      ..init(context);
    return MaterialApp(
        debugShowCheckedModeBanner: true,
        home: new Scaffold(
          appBar: PreferredSize(child: AppBar(
            elevation: 0.0,
            leading: IconButton(
                splashColor: Colors.blue,
                highlightColor: Colors.blue,
                icon: Icon(Icons.arrow_back), onPressed: _pCenterBack),
            title: new Text('个人中心',style: new TextStyle(fontSize: Adapter.setFont(55))), centerTitle: true,),
              preferredSize: Size.fromHeight(Adapter.setHeight(_barHeigt))
          ),
          bottomNavigationBar: new BottomAppBar(
              elevation: 10.0,
              child:
              new GestureDetector(
                  onTap: () {
                    _out();
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      new Text('', textAlign: TextAlign.center),
                      Padding(
                        padding:new EdgeInsets.fromLTRB(
                            20.0, Adapter.setWidth(Adapter.item), 20.0, Adapter.setWidth(Adapter.item)),
                        child: new Text(
                            '退出登陆', textAlign: TextAlign.center,
                            style: new TextStyle(fontSize: Adapter.setFont(55),
                                color: Colors.blue)),

                      ),
                      new Text('', textAlign: TextAlign.center),
                    ],
                  )
              )
          ),


          body: new Column(
              children: <Widget>[
                Padding(
                    padding: const EdgeInsets.only(top: 30, bottom: 30),
                    child: Image(
                        image: AssetImage(
                            'lib/Resources/login/person.png'),
                        width: Adapter.setWidth(260),
                        height: Adapter.setWidth(260))
                ),
                new Container(
                  padding: new EdgeInsets.fromLTRB(
                      20.0, Adapter.setWidth(Adapter.item), 20.0, Adapter.setWidth(Adapter.item)),
                  width: double.infinity,
                  color: const Color(0xFFffffff),
                  child:
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: <Widget>[
                      new Expanded(
                        child: new GestureDetector(
                          onTap: () {},
                          child: new Text('姓名', textAlign: TextAlign.left),
                        ),
                      ),

                      new Text(
                          '$_name', textAlign: TextAlign.right),

                    ],
                  ),
                ),
                _line(),
                new Container(
                    padding: new EdgeInsets.fromLTRB(
                        20.0, Adapter.setWidth(Adapter.item), 20.0, Adapter.setWidth(Adapter.item)),
                    width: double.infinity,
                    color: const Color(0xFFffffff),
                    child:
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: <Widget>[
                        new Expanded(
                          child: new GestureDetector(
                              onTap: () {},
                              child: new Text(
                                  '联系电话', textAlign: TextAlign.left),
                          ),
                        ),

                        new Text(
                            '$_phone', textAlign: TextAlign.right),

                      ],
                    )
                ),

                _line(),
                new Container(
                    padding: new EdgeInsets.fromLTRB(
                        20.0, Adapter.setWidth(Adapter.item), 20.0, Adapter.setWidth(Adapter.item)),
                    width: double.infinity,
                    color: const Color(0xFFffffff),
                    child:
                    new GestureDetector(
                      onTap: () {
                        _editPassWord();
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: <Widget>[
                          new Expanded(
                            child:new Text(
                                '修改密码', textAlign: TextAlign.left),
                          ),
                          new Text(
                              '〉', textAlign: TextAlign.right),
                        ],
                      ),
                    )
                ),
                _line(),
                new Container(
                  padding: new EdgeInsets.fromLTRB(
                      20.0, Adapter.setWidth(Adapter.item), 20.0, Adapter.setWidth(Adapter.item)),
                  width: double.infinity,
                  color: const Color(0xFFffffff),
                  child:
                  new GestureDetector(
                    onTap: () {
                      _editStore();
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: <Widget>[
                        new Expanded(
                          child:  new Text(
                              '默认服务门店', textAlign: TextAlign.left),
                        ),
                        new Text(
                            '$_store 〉', textAlign: TextAlign.right),
                      ],
                    ),
                  ),

                )
              ]
          ),
        )
    );
  }

  static Widget _line() {
    return Container(
      margin: const EdgeInsets.only(
          left: 0, right: 0, top: 0),
      width: double.infinity,
      height: 0.5,
      color: Colors.grey,
    );
  }

  ///修改默认服务门店,出发api请求服务门店列表
  _editStore() {
    _toNativeMethod(editStoreMethod);
  }

  ///修改默认服务门店,出发api请求服务门店列表
  _out() {
    _toNativeMethod(OUT);
  }

  ///修改密码
  _editPassWord() {
    print("000");
    _toNativeMethod(editPassWordMethod);
  }

  ///姓名
  _updateInit(var name, var phone) {
    setState(() {
      this._name = name;
      this._phone = phone;
    });
  }

  ///更新门店
  _updateStore(var store) {
    setState(() => _store = store);
  }

  @override
  void initState() {
    super.initState();
    _startPlugin();
  }

  ///开启EventChannle事件监听
  void _startPlugin() {
    if (_perseonSub == null) {
      _perseonSub = eventPlugin.receiveBroadcastStream().listen(
          _onLisenEvent, onError: _onError);
    }
  }

  /*{"nativeParams":{"phone":"15392032589","name":"熊承昌","type":"init"},"nativeType":"1"} */
  void _onLisenEvent(Object event) {
    print(event.toString());
    final jsonResponse = json.decode(event.toString());
    Out student = new Out.fromJson(jsonResponse);
    var personBean = student.nativeParams;
    setState(() {
      switch (personBean.type) {
        case "init":
          _updateInit(personBean.name, personBean.phone);
          break;
        case "store":
          _updateStore(personBean.store);
          break;
      }
    });
  }

  void _onError(Object error) {
    setState(() {});
  }

  ///返回键点击事件
  Future<Null> _pCenterBack() async {
    _toNativeMethod(backMethod);
  }

  ///和natvie通讯
  _toNativeMethod(String tag) async {
    try {
      print("当前tag=" + tag);
      Map<String, String> map = { "flutterParams": "I very like flutter，bro！"};
      String result = await
      jumpPlugin.invokeMethod(tag, map);
      print(result);
    } on PlatformException catch (e) {
      print("_toNativeMethod" + '${e.message}');
    }
  }
}

class Out {
  PersonBean nativeParams;
  String nativeType;

  Out({
    this.nativeType,
    this.nativeParams
  });

  factory Out.fromJson(Map<String, dynamic> parsedJson){
    return Out(
        nativeType: parsedJson['nativeType'],
        nativeParams: PersonBean.fromJson(parsedJson['nativeParams'])
    );
  }

}

class PersonBean {

  String name;

  /* type用于区分事件，init：初始化，用于设置姓名和电话，store：用于设置服务门店 */

  String type;
  String phone;
  String store;

  PersonBean({this.name, this.type, this.phone, this.store});

  factory PersonBean.fromJson(Map<String, dynamic> json){
    return PersonBean(
        name: json['name'],
        type: json['type'],
        phone: json['phone'],
        store: json['store']
    );
  }
}

