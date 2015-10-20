# formatting-textbox.js
書式付きテキストボックス作成ライブラリ  

## 利用方法
#### __$(_セレクタ_).FormattingTextbox(_書式_,_オプション_)__  
 セレクタで指定した要素に書式を設定します。  
 オプション(後述)は任意です。
 ※セレクタは「input type=text」のみ対応しています。  
 デフォルトでは半角数値の入力のみ、\-が区切り文字となります。  
 オプションで変更可能です。(どちらも正規表現で指定してください)  
 - 入力可能文字：inputRegExp
 - 区切り文字：delimiterRegExp

```javascript
//実装例
//スタンダードな実装
$("#target").FormattingTextbox("____-____");

//区切り文字を-または+に設定
$("#target2").FormattingTextbox("_+__-__",{
  delimiterRegExp:/[-]|[+]/
});

//区切り文字を-または+に設定、入力可能文字にアルファベットを追加
$("#target3").FormattingTextbox("__+__*__",{
  inputRegExp:/[0-9]|[A-Z]/
  ,delimiterRegExp:/[*]|[+]/
});
```

## License
MIT license.
