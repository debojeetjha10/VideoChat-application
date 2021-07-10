## This is the explanation of the files/folders in this folder
- Database (This conatins all the files to interact with the database server)

    -  env.js (this conatins the environment variables)
    - mongo,js (this helps us connnect with the mongo database)

    - msg-model.js (this creates a schema and model for our data to be stored on the Database)


- node_modules (will be there after installing node modules)

- public

    - logos (this folder contains all the logos *.png  *.ico etc files)
        - the logo files

    - scripts (this contains the scripts of the frontend side)
        - button-control.js (this contains all the code for controlling diff buttons on the website except call-functioning buttons ex. call-end, mute-unmute etc)
        - call-control.js (this contains all the code for the different functionalities of call-controlling buttons like end call, mute/unmute , video-on/off)
        - load-chat.js (this fetches an api and loads all the previous chat of a room)
        - message-socket.js (this file is used  in the chat  site this contains code to send and recieve messages)
        - peer-socket-connection.js   ( this file makes peer and socket connection and    this is responsible  for making the video-chat work)
    - stylesheets (this folder conatins all the stylesheets used in the website the names are sel-explenotary)
        - the stylesheets starting with "chat" are only used in the chat page otherwise every stylesheet is used in both the pages
    - style.css (this containes some standard initial css used in the pages)

- views (this folder contains the ejs templates for the chat and video-call page)
    - chat-room.ejs (this file is for the chat page)
    - room.ejs (this file is for the video-call page)

- .gitignore (to ignore some specified files(wrriten in this file) by git)

- package-lock.json (this is used to save npm packages supporting packages version)

- package.json (this is used to store npm configurations,package versions and more npm stuff)

- Readme.md (this is what you are Reading)
- server.js (this file contains the server side code and manages the   chat and vide call functionality,making web-sockets ,peer connection ,saving and recieving data from the database etc , the code is expplained in the comments)

