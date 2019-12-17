# Bordeaux

Simple TV Shows manager with Transmission, Trakt and Plex integration over WebSockets.

Transmission, Trakt and Plex are not mandatory. They simply add more features to the app.

## Goals

It aims to be :

- simple
- lightweight
- mobile friendly
- as little dependence as possible
- build only in JS/Node.js

## Core features

- Transfert new downloaded tv shows episodes to your library
- Download subtitles for new episodes (`en` and `fr` supported)

## Additional features

[Trakt.tv](https://trakt.tv/dashboard) service :

- provides a full calendar to display episodes releases
- return collected and downloaded episodes from your account

[Plex](https://www.plex.tv) service :

- enable automatic synchronization of your Plex library when episodes are transfered

## Prerequis

You need to install Node.js (> 10.16.0 recommended), see [here](https://nodejs.org/en/).

## Install

Download the project or fork it, then install all dependencies.

```
$ npm install --production
```

## Start the app (backend & frontend)

```
$ node .\run\startup.js
```

The server start at `ws://localhost:8080` by default.

The web app start at `http://localhost:8082` by default.

That's all :)

## Enable systemd service

systemctl enable bordeaux.service

## Start service

systemctl start bordeaux.service

## Screenshots

![screen](https://github.com/Wifsimster/bordeaux/blob/master/assets/mobile_04_transparent.png)

![screen](https://github.com/Wifsimster/bordeaux/blob/master/assets/unamed_01.png)

![screen](https://github.com/Wifsimster/bordeaux/blob/master/assets/unamed_02.png)

## Licence

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Wifsimster/bordeaux/blob/master/LICENSE)
