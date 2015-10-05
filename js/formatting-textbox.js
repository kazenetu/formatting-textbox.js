/**
 * 書式付テキストボックス
 * @classdesc テキストボックスに書式機能を追加する
 * @constructor
 * @memberof FormattingTextbox
 * @param {string} targetId - 対象のinput要素
 * @param {string} format - 書式フォーマット
 */
function FormattingTextbox(targetId,format){
  this.targetId = targetId;
  this.format = format;
  this.dataArray  = this.format.split("");

  this.init();
};

/**
 * 入力結果を反映
 * @method
 * @name FormattingTextbox#displayText
 */
FormattingTextbox.prototype.displayText = function(){
  $(this.targetId).val(this.dataArray.toString().replace(/,/g,""));
};

/**
 * 初期化処理
 * @method
 * @name FormattingTextbox#init
 */
FormattingTextbox.prototype.init = function(){
  var instance = this;
  instance.displayText();

  $(instance.targetId).on("keydown",function(e){
    var isBS = (e.keyCode === 8);
    var isDel = (e.keyCode === 46);

    var inputKeyCode = e.keyCode;
    if(inputKeyCode>=96 && inputKeyCode<=105){
      //テンキー対応
      inputKeyCode = (inputKeyCode-96+48);
    }
    var inputValue = String.fromCharCode(inputKeyCode);
    if(isBS || isDel || inputValue.match(new RegExp(/\d/g))){
      var startPos = $(this)[0].selectionStart;
      if(isBS===false && startPos >= instance.format.length){
        return;
      }

      //置き換え位置の設定と値の設定
      if(isBS || isDel){
        if(isBS){
          //カーソルの移動
          startPos--;
          if(startPos<0){
            startPos=0;
          }
          if(instance.dataArray[startPos] === "-"){
            startPos--;
          }

          //置き換え
          instance.dataArray[startPos] = "_";
        }
        if(isDel){
          var index = startPos;
          while(index < instance.format.length-1){
            if(instance.dataArray[index] !== "-"){
              if(instance.dataArray[index+1] === "-"){
                instance.dataArray[index] = instance.dataArray[index+2];
              }else{
                instance.dataArray[index] = instance.dataArray[index+1];
              }
            }
            index++;
          }
          instance.dataArray[index] = "_";
        }
      }else{
        //最終桁に入力があれば終了
        var index = instance.format.length-1;
        if(instance.dataArray[index] !== "_"){
          return;
        }

        //字送りを行う
        while(startPos < index){
          if(instance.dataArray[index] !== "-"){
            if(instance.dataArray[index-1] === "-"){
              instance.dataArray[index] = instance.dataArray[index-2];
            }else{
              instance.dataArray[index] = instance.dataArray[index-1];
            }
          }

          index--;
        }

        //置き換え
        if(instance.dataArray[startPos] === "-"){
          startPos++;
        }
        instance.dataArray[startPos] = inputValue;

        //カーソルの移動
        if(startPos < instance.format.length){
          startPos++;
        }
      }

      //表示
      instance.displayText();

      //カーソル位置を設定
      $(this)[0].selectionStart = $(this)[0].selectionEnd = startPos;
    }
    if(e.keyCode!==37 && e.keyCode!==39){
      e.preventDefault();
    }
  });

  $(instance.targetId).on("keypress",function(e){
    e.preventDefault();
  });
  $(instance.targetId).on("keyup",function(e){
    e.preventDefault();
  });
};
