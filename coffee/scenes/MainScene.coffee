_app = @_app;
define ['app/scenes/BaseScene', 'app/scenes/GameScene', 'app/managers/AppManager'], (BaseScene, GameScene, AppManager) ->
	class MainScene extends BaseScene
		constructor : ->
			super

		onPrepare : ->
			super

		onEnter : ->
			super
			@setTitle 'MainScene'

		onShow : ->
			super
			@backgroundColor(0xff00ffff)
			button = new Sprite()
			bmp    = new Bitmap( new BitmapData(1, 1, true, 0xffff00ff) )
			bmp.width = bmp.height = 100
			button.addChild(bmp)
			@addChild(button)
			button.addEventListener 'touchTap', (e) ->
				appManager = AppManager.getInstance()
				gameScene  = new GameScene()
				appManager.replaceScene(gameScene)

		onHide : ->
			super

		onLeave : ->
			super

		onDestroy : ->
			super

		update : ->
			super

	return MainScene