https://stackoverflow.com/questions/35991698/telegram-bot-receive-photo-url

crear folder dentro de file : photos ,videos

In the message array you receive you can find the key photo. There you will find multiple arrays with the following format

"file_id" : "XXXX",
"file_size" : 1107,
"width" : 90,
"height" : 51
From one of those array you need to take the file_id. You can then request the file_path with a simple get get on the url https://api.telegram.org/bot<token>/getFile?file_id=<file_id>

You will receive an array that looks as following

"ok" : true,
"result" : {
"file_id" : "XXXX",
"file_size" : 27935,
"file_path" : "photo\/file_1.jpg"
}
From the result you need the file_path and you then got the image location https://api.telegram.org/file/bot<token>/<file_path>

https://platzi.com/blog/bot-python/

Usando un bot:

Añade a @RawDataBot al grupo
El bot automáticamente mostrará información del grupo, incluyendo el ID del grupo.
