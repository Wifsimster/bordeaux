# Bordeaux

Simple TV Shows manager with Transmission, Trakt and Plex integration over WebSockets.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Wifsimster/bordeaux/blob/master/LICENSE)

> Work in progress...

Transmission, Trakt and Plex are not mandatory. They simply add more features to the app.

## Core features

- Transfert new downloaded tv shows episodes to your library
- Download subtitles for new episodes (`en` and `fr` supported)

## Additional features

- Calendar of your tv shows from your [Trakt.tv](https://trakt.tv/dashboard) account
- Detect collected and downloaded episode from your [Trakt.tv](https://trakt.tv/dashboard) account
- Synchronize your [Plex](https://www.plex.tv) library when you transfert episodes

## Prerequis

You need to install Node.js (> 10.16.0 recommended), see [here](https://nodejs.org/en/).

## Install

Download the project or fork it, then install all dependencies.

```
$ npm install --production
```

## Start the backend

First, start the WebSockets server. Default URL: `ws://localhost:8080`

```
$ npm run backend
```

## Start the frontend

Then, start the web application. Default URL : `http://localhost:8082`

```
$ npm run frontend
```

That's all :)

## Screenshots

![screen](https://github.com/Wifsimster/bordeaux/blob/master/assets/unamed_01.png)

![screen](https://github.com/Wifsimster/bordeaux/blob/master/assets/unamed_02.png)
