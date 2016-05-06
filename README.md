# beam-tts-chat-fonix
Says chat messages on beam using, FonixTalk

1. Npm install
1. write a config.json file with your username and password
1. See [Compile](#compile)
1. Node index.js

# Compile
I can't redistribute the binaries due to licensing issues so you'll have to make them yourself. If you can't do this then look at [beam-tts-chat-winapi](https://github.com/probableprime/beam-tts-chat-winapi)

Compile https://github.com/whatsecretproject/SharpTalk 's "Speak" project into an exe. Copy that to `process/` in the root of this project. Included required DLLs.

Example:

![Example](https://i.probableprime.co.uk/u/r/6rNY.png)
