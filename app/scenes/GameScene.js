/*
requirejsの循環参照はhttp://d.hatena.ne.jp/qsona/20130825/1377448054を参考にする
*/


(function() {
  var _app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _app = this._app;

  define(['require', 'app/scenes/BaseScene', 'app/managers/AppManager'], function(require, BaseScene, AppManager) {
    var GameScene;
    GameScene = (function(_super) {
      __extends(GameScene, _super);

      function GameScene() {
        GameScene.__super__.constructor.apply(this, arguments);
      }

      GameScene.prototype.onPrepare = function() {
        return GameScene.__super__.onPrepare.apply(this, arguments);
      };

      GameScene.prototype.onEnter = function() {
        GameScene.__super__.onEnter.apply(this, arguments);
        return this.setTitle('GameScene');
      };

      GameScene.prototype.onShow = function() {
        var bmp, button;
        GameScene.__super__.onShow.apply(this, arguments);
        this.backgroundColor(0xffffff00);
        button = new Sprite();
        bmp = new Bitmap(new BitmapData(1, 1, true, 0xffff0000));
        bmp.width = bmp.height = 100;
        button.addChild(bmp);
        this.addChild(button);
        return button.addEventListener('touchTap', function(e) {
          var MainScene, appManager, mainScene;
          appManager = AppManager.getInstance();
          MainScene = require('app/scenes/MainScene');
          mainScene = new MainScene();
          return appManager.replaceScene(mainScene);
        });
      };

      GameScene.prototype.onHide = function() {
        return GameScene.__super__.onHide.apply(this, arguments);
      };

      GameScene.prototype.onLeave = function() {
        return GameScene.__super__.onLeave.apply(this, arguments);
      };

      GameScene.prototype.onDestroy = function() {
        return GameScene.__super__.onDestroy.apply(this, arguments);
      };

      GameScene.prototype.update = function() {
        return GameScene.__super__.update.apply(this, arguments);
      };

      return GameScene;

    })(BaseScene);
    return GameScene;
  });

}).call(this);
