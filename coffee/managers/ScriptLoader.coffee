###
class ScriptLoader

	requests = []
	caches   = []


	constructor : ->

		addCache = (filePath) ->
			caches.push filePath

		isCache = (filePath) ->
			exist = false
			for cache in caches
				if filePath == cache
					exist = true
					break

			return exist

		@request = (filePath) ->
			requests.push(filePath) if !isCache(filePath)
			console.log "request filepath : #{filePath}"

		@load = (callback) ->

			total  = requests.length
			loaded = 0

			onloaded = ->
				addCache(@src)
				if total == ++loaded
					callback()

			onerror = ->
				console.log "load error : #{@src}"

			for request in requests.length
  				script = new Script( request )
  				script.onload  = onloaded
  				script.onerror = onerror

@app.managers.ScriptLoader = ScriptLoader

console.log 'ScriptLoader loaded!!!!!!!!!!'
###