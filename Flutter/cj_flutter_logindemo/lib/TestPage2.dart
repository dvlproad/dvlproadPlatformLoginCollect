import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:async';

class NewRoute2 extends StatelessWidget {
  static const methodChannel = const MethodChannel('com.dvlproad.ciyouzen/platform_channel');
  Future<Null> _goBack() async {
    try {
      await methodChannel.invokeMethod('goBack');
    } on PlatformException {

    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("New route2"),
      ),
      body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text("This is new route"),
              RaisedButton(
                  child: Text('goback'),
                  onPressed: _goBack
              )
            ],
          )

      ),
    );
  }
}