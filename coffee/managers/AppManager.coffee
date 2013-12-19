define [], ->

	_app = @_app

	# private class
	class _AppManager

		constructor : ->

			# private member
			currentScene = null
			sceneStack   = []

			setScene = (scene) ->
				currentScene = scene
				scene.onEnter()
				scene.onShow()


			# シーン切り替え系 -------------------------
			@runWithScene = (scene) ->
				if currentScene != null
					throw new Error('既にシーンをセットしている')
				setScene(scene)


			@replaceScene = (scene) ->
				currentScene.onLeave()
				# currentScene.onDestroy()
				setScene(scene)



	# public class
	class AppManager

		# private static instance
		instance = null

		# public static instance
		constructor : ->
			throw new Error('newで作成出来ない')

		@getInstance = ->
			if instance == null
				instance = new _AppManager()

			return instance


	return AppManager