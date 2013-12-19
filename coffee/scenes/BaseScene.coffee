_app = @_app;
define [], () ->
	class BaseScene

		FADEIN_FRAME  = 15
		FADEOUT_FRAME = 15

		# private method ---------------------------------------

		# シーン遷移時アニメーション

		fadeout = (context, displayObject, callback) ->
			startAlpha   = displayObject.alpha
			setAlpha     = 0
			currentFrame = 0

			update = ->
				setAlpha = startAlpha - (++currentFrame / FADEOUT_FRAME)
				if setAlpha <= 0
					setAlpha = 0
					displayObject.removeEventListener 'enterFrame', update
					if callback
						callback.call context

				@alpha = setAlpha

			displayObject.addEventListener 'enterFrame', update

		fadein = (context, displayObject, callback) ->
			startAlpha   = displayObject.alpha
			setAlpha     = 0
			currentFrame = 0

			update = ->
				setAlpha = startAlpha + (++currentFrame / FADEIN_FRAME)
				if setAlpha >= 1
					setAlpha = 1
					displayObject.removeEventListener 'enterFrame', update
					if callback
						callback.call context

				@alpha = setAlpha

			displayObject.addEventListener 'enterFrame', update

		# ------------------------------------------------------
		constructor : ->
			@view       = new Sprite()
			bmd         = new BitmapData(1, 1, true, 0xffff0000)
			@background = new Bitmap(bmd)
			@background.width  = _app.stage.stageWidth
			@background.height = _app.stage.stageHeight
			@view.addChild(@background)
			@view.addEventListener 'enterFrame', @update
			@mouseEnabled(false)
			@title = null
			@setTitle('BaseScene')
			@view.alpha = 0


		setWidth : (width) ->
			@background.width = width

		setHeight : (height) ->
			@background.height = height

		setTitle : (title) ->
			if !@title
				@title = new TextField()
				@title.defaultTextFormat = new TextFormat("", 48, 0x000000, true, false)
				@addChild(@title)

			@title.text = title
			@title.width  = @title.textWidth
			@title.height = @title.textHeight
			@title.x = (_app.stage.stageWidth - @title.textWidth) / 2


		backgroundColor : (colorHex) ->
			bmd = new BitmapData(1, 1, true, colorHex)
			@background.bitmapData = bmd

		addChild : (displayObject) ->
			@view.addChild(displayObject)

		mouseEnabled : (flag) ->
			@view.mouseEnabled = @view.mouseChildren = flag

		update : ->

		#lifecycle -----------------------------------------

		# onEnterの前にあらかじめ読み込んでおきたいリソースなどをこのメソッドで呼び出す想定
		onPrepare : ->
			# TODO onPrepareの行うと想定される処理が完了してから@onEnterを呼ぶようにする (completePrepare的なメソッドを作る)

		# runWithScene/replaceSceneが呼ばれたときに呼ばれる
		onEnter : ->
			@onPrepare()
			_app.stage.addChildAt(@view, 0)

		# onEnterで一通り処理が終わったら呼ばれる
		onShow : ->
			fadein @, @view, =>
				@mouseEnabled(true)


		# シーンが切り替わるのではなくただ見えなくなるだけのときに呼ばれる想定で実装
		onHide : ->

		# replaceSceneが呼ばれたときに呼ばれる
		onLeave : ->
			@mouseEnabled(false)
			fadeout @, @view, @onDestroy
			# console.log 'BaseScen leave'
			# @onDestroy()

		# replaceSceneが呼ばれたときに呼ばれる
		onDestroy : ->
			while @view.numChildren > 0
				child = @view.removeChildAt(0)
				child = null

			_app.stage.removeChild(@view)
			@view       = null

	return BaseScene