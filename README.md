# Bordeaux

Simple TV Shows manager with Transmission, Trakt and Plex integration over WebSockets.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Wifsimster/bordeaux/blob/master/LICENSE)

> Work in progress...

## Features

- Calendar of your Trakt tv shows
- Transfert new downloaded tv shows episodes
- Download subtitles for new episodes

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
