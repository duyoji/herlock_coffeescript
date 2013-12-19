(function() {
  var _app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _app = this._app;

  define(['app/scenes/BaseScene', 'app/scenes/GameScene', 'app/managers/AppManager'], function(BaseScene, GameScene, AppManager) {
    var MainScene;
    MainScene = (function(_super) {
      __extends(MainScene, _super);

      function MainScene() {
        MainScene.__super__.constructor.apply(this, arguments);
      }

      MainScene.prototype.onPrepare = function() {
        return MainScene.__super__.onPrepare.apply(this, arguments);
      };

      MainScene.prototype.onEnter = function() {
        MainScene.__super__.onEnter.apply(this, arguments);
        return this.setTitle('MainScene');
      };

      MainScene.prototype.onShow = function() {
        var bmp, button;
        MainScene.__super__.onShow.apply(this, arguments);
        this.backgroundColor(0xff00ffff);
        button = new Sprite();
        bmp = new Bitmap(new BitmapData(1, 1, true, 0xffff00ff));
        bmp.width = bmp.height = 100;
        button.addChild(bmp);
        this.addChild(button);
        return button.addEventListener('touchTap', function(e) {
          var appManager, gameScene;
          appManager = AppManager.getInstance();
          gameScene = new GameScene();
          return appManager.replaceScene(gameScene);
        });
      };

      MainScene.prototype.onHide = function() {
        return MainScene.__super__.onHide.apply(this, arguments);
      };

      MainScene.prototype.onLeave = function() {
        return MainScene.__super__.onLeave.apply(this, arguments);
      };

      MainScene.prototype.onDestroy = function() {
        return MainScene.__super__.onDestroy.apply(this, arguments);
      };

      MainScene.prototype.update = function() {
        return MainScene.__super__.update.apply(this, arguments);
      };

      return MainScene;

    })(BaseScene);
    return MainScene;
  });

}).call(this);
