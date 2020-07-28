# ![Logo](.github/logo.png?raw=true 'Logo') Brows'ear

Find your favorites song in a Shazam-like flavored experience

<p align="center">

<img width="300" src="https://github.com/Liinkiing/browsear/raw/master/.github/screens/main-light.png?raw=true">
<img width="300" src="https://github.com/Liinkiing/browsear/raw/master/.github/screens/main-dark.png?raw=true">
<img width="300" src="https://github.com/Liinkiing/browsear/raw/master/.github/screens/history-light.png?raw=true">
<img width="300" src="https://github.com/Liinkiing/browsear/raw/master/.github/screens/history-dark.png?raw=true">

<img width="400" src="https://github.com/Liinkiing/browsear/raw/master/.github/screens/browsear.gif?raw=true">

</p>

## Installation

[Chrome Web Store](https://chrome.google.com/webstore/detail/browsear/gmfpfebmgkoplcpceddmhigogakflnak)

Or you can freely test it by building the extension and load the unpacked version (located in `build` folder)

```bash
$ yarn
# install dependencies

$ yarn build
# build production-ready files into a 'build' folder
```

### In Chrome web browser

1. Go to: [**chrome://extensions**](chrome://extensions)
2. Toggle: "**developer mode**" on
3. Click on: "**Load unpacked**"
4. Select the newly created folder "**build**" from the project folder

### Firefox and other browsers

Because I'm using the `tabsCapture` API to record sound from a tab, it is currently supported only in Chromium based browsers 😭

## Usage

Just click the big 'Record' button, and wait until it recognize the sound. You can
stop it by yourself, but remember that the longer you wait the greater the chance of finding
a song will be.

## Shortcuts

By default, use `Ctrl+Shift+X` (or `Command+Shift+X` on mac) to start the recognition process
in background, without opening the popup. A small badge will indicate the new
recognized sounds. The shortcut can be freely re-assigned in your browser shortcuts preference panel. You can use it
to toggle the recognition procession (so it can start / stop the recording)
