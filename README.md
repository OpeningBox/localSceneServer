# LocalSceneServer #


## Install Node and npm ##
If you do not have node and npm, install it.

Use nvm to install and manage node is recommended, follow link below to install nvm.

https://github.com/nvm-sh/nvm#installing-and-updating

Install node lts/gllium
```
nvm install lts/gallium
nvm alias default lts/gallium
```

## Clone repo and start ##
```
git clone https://github.com/OpeningBox/localSceneServer.git
cd localSceneServer
npm install
npm run start
```
You will get a **_LocalServerHost_** maybe http://10.1.104.91:8080/

You should have a runtime server meybe http://10.1.104.91:8080/

so, use link below to open test scene in your local scene server

http://10.1.104.91:8080/shell?sceneId=local&url=http://10.1.104.91:8081/test

## Edit scene ##

Edit script in localSceneServer, click button **重新开始** to check the update.