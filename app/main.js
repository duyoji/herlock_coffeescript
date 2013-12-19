(function() {
  var script, _app;

  this._app = {};

  this._app.stage = new Stage(640, 640 * window.innerHeight / window.innerWidth);

  this._app.baseUrl = './coffee_sample/';

  _app = this._app;

  window.addLayer(new Layer(_app.stage));

  script = new Script(_app.baseUrl + 'lib/require.min.js');

  script.onload = function() {
    require.config({
      baseUrl: _app.baseUrl,
      waitSeconds: 120
    });
    return require(['app/scenes/MainScene', 'app/managers/AppManager'], function(MainScene, AppManager) {
      var appManager, mainScene;
      appManager = AppManager.getInstance();
      mainScene = new MainScene();
      return appManager.runWithScene(mainScene);
    });
  };

}).call(this);
