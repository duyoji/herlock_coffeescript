(function() {
  var _app;

  _app = this._app;

  define([], function() {
    var BaseScene;
    BaseScene = (function() {
      var FADEIN_FRAME, FADEOUT_FRAME, fadein, fadeout;

      FADEIN_FRAME = 15;

      FADEOUT_FRAME = 15;

      fadeout = function(context, displayObject, callback) {
        var currentFrame, setAlpha, startAlpha, update;
        startAlpha = displayObject.alpha;
        setAlpha = 0;
        currentFrame = 0;
        update = function() {
          setAlpha = startAlpha - (++currentFrame / FADEOUT_FRAME);
          if (setAlpha <= 0) {
            setAlpha = 0;
            displayObject.removeEventListener('enterFrame', update);
            if (callback) {
              callback.call(context);
            }
          }
          return this.alpha = setAlpha;
        };
        return displayObject.addEventListener('enterFrame', update);
      };

      fadein = function(context, displayObject, callback) {
        var currentFrame, setAlpha, startAlpha, update;
        startAlpha = displayObject.alpha;
        setAlpha = 0;
        currentFrame = 0;
        update = function() {
          setAlpha = startAlpha + (++currentFrame / FADEIN_FRAME);
          if (setAlpha >= 1) {
            setAlpha = 1;
            displayObject.removeEventListener('enterFrame', update);
            if (callback) {
              callback.call(context);
            }
          }
          return this.alpha = setAlpha;
        };
        return displayObject.addEventListener('enterFrame', update);
      };

      function BaseScene() {
        var bmd;
        this.view = new Sprite();
        bmd = new BitmapData(1, 1, true, 0xffff0000);
        this.background = new Bitmap(bmd);
        this.background.width = _app.stage.stageWidth;
        this.background.height = _app.stage.stageHeight;
        this.view.addChild(this.background);
        this.view.addEventListener('enterFrame', this.update);
        this.mouseEnabled(false);
        this.title = null;
        this.setTitle('BaseScene');
        this.view.alpha = 0;
      }

      BaseScene.prototype.setWidth = function(width) {
        return this.background.width = width;
      };

      BaseScene.prototype.setHeight = function(height) {
        return this.background.height = height;
      };

      BaseScene.prototype.setTitle = function(title) {
        if (!this.title) {
          this.title = new TextField();
          this.title.defaultTextFormat = new TextFormat("", 48, 0x000000, true, false);
          this.addChild(this.title);
        }
        this.title.text = title;
        this.title.width = this.title.textWidth;
        this.title.height = this.title.textHeight;
        return this.title.x = (_app.stage.stageWidth - this.title.textWidth) / 2;
      };

      BaseScene.prototype.backgroundColor = function(colorHex) {
        var bmd;
        bmd = new BitmapData(1, 1, true, colorHex);
        return this.background.bitmapData = bmd;
      };

      BaseScene.prototype.addChild = function(displayObject) {
        return this.view.addChild(displayObject);
      };

      BaseScene.prototype.mouseEnabled = function(flag) {
        return this.view.mouseEnabled = this.view.mouseChildren = flag;
      };

      BaseScene.prototype.update = function() {};

      BaseScene.prototype.onPrepare = function() {};

      BaseScene.prototype.onEnter = function() {
        this.onPrepare();
        return _app.stage.addChildAt(this.view, 0);
      };

      BaseScene.prototype.onShow = function() {
        var _this = this;
        return fadein(this, this.view, function() {
          return _this.mouseEnabled(true);
        });
      };

      BaseScene.prototype.onHide = function() {};

      BaseScene.prototype.onLeave = function() {
        this.mouseEnabled(false);
        return fadeout(this, this.view, this.onDestroy);
      };

      BaseScene.prototype.onDestroy = function() {
        var child;
        while (this.view.numChildren > 0) {
          child = this.view.removeChildAt(0);
          child = null;
        }
        _app.stage.removeChild(this.view);
        return this.view = null;
      };

      return BaseScene;

    })();
    return BaseScene;
  });

}).call(this);
