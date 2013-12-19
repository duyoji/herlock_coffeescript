@_app         = {}
@_app.stage   = new Stage( 640, 640 * window.innerHeight / window.innerWidth )
@_app.baseUrl = './coffee_sample/'


# appは既にHerlockで使われている変数のため先頭に「_」をつける
_app = @_app;

window.addLayer(  new Layer( _app.stage ) )

script = new Script( _app.baseUrl + 'lib/require.min.js');
script.onload = ->
	require.config({
		baseUrl     : _app.baseUrl,
		waitSeconds : 120,
	})

	require ['app/scenes/MainScene', 'app/managers/AppManager'], (MainScene, AppManager) ->
		appManager = AppManager.getInstance()
		mainScene  = new MainScene()
		appManager.runWithScene(mainScene)