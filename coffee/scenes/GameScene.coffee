###
requirejsの循環参照はhttp://d.hatena.ne.jp/qsona/20130825/1377448054を参考にする
###
_app = @_app;
define ['require', 'app/scenes/BaseScene', 'app/managers/AppManager'], (require, BaseScene, AppManager) ->
	class GameScene extends BaseScene
		constructor : ->
			super

		onPrepare : ->
			super

		onEnter : ->
			super
			@setTitle 'GameScene'

		onShow : ->
			super
			@backgroundColor(0xffffff00)
			button = new Sprite()
			bmp    = new Bitmap( new BitmapData(1, 1, true, 0xffff0000) )
			bmp.width = bmp.height = 100
			button.addChild(bmp)
			@addChild(button)
			button.addEventListener 'touchTap', (e) ->
				appManager = AppManager.getInstance()
				MainScene  = require 'app/scenes/MainScene'
				mainScene  = new MainScene()
				appManager.replaceScene(mainScene)

		onHide : ->
			super

		onLeave : ->
			super

		onDestroy : ->
			super

		update : ->
			super

	return GameScene