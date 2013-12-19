(function() {
  define([], function() {
    var AppManager, _AppManager, _app;
    _app = this._app;
    _AppManager = (function() {
      function _AppManager() {
        var currentScene, sceneStack, setScene;
        currentScene = null;
        sceneStack = [];
        setScene = function(scene) {
          currentScene = scene;
          scene.onEnter();
          return scene.onShow();
        };
        this.runWithScene = function(scene) {
          if (currentScene !== null) {
            throw new Error('既にシーンをセットしている');
          }
          return setScene(scene);
        };
        this.replaceScene = function(scene) {
          currentScene.onLeave();
          return setScene(scene);
        };
      }

      return _AppManager;

    })();
    AppManager = (function() {
      var instance;

      instance = null;

      function AppManager() {
        throw new Error('newで作成出来ない');
      }

      AppManager.getInstance = function() {
        if (instance === null) {
          instance = new _AppManager();
        }
        return instance;
      };

      return AppManager;

    })();
    return AppManager;
  });

}).call(this);
