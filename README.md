# Lightning Demo App with SolidJS

View the demo - [https://lightning-tv.github.io/solid-demo-app/](https://lightning-tv.github.io/solid-demo-app/)

There are a few query params for customizing the application to test on devices

size='720' | '1080' | '4k'
numImageWorkers = 0 to disable image workers
disableBG=true to turn off background (reduce memory)
roundPoster=false to turn off rounded images on poster

https://lightning-tv.github.io/solid-demo-app/?size=720&disableBG=true#/

## Main Repo

Solid
[https://github.com/lightning-tv/solid](https://github.com/lightning-tv/solid)

## Getting started

Remove the .template to the .env.template to create a .env file. This is where all the secrets of the application will be.

Get an API Read Access Token from [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction)
and put the key in .env with the variable `VITE_API_KEY_V4`

```
git clone https://github.com/lightning-tv/solid-demo-app
cd solid-demo-app
pnpm i
pnpm start
```

If you're interested in using SolidJS with Lightning and Web check out [Web Branch](https://github.com/lightning-tv/solid-demo-app/tree/web) to see the setup.
