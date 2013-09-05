# 4k Data Collection Mobile

Mobile client to gather 4k data on the mission field! Yay lets save the world.

Built on top of [Emberjs](http://emberjs.com/) and kept under control with [Yeoman](http://yeoman.io/). Will be integrated with Phonegap later on for native iOS builds! :yum:

## Get started

- Clone the repository
- Make sure mr. [Yeoman](http://yeoman.io/) is installed
- Make sure you run [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) with the --disable-web-security flag: `/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --disable-web-security`
- cd into the directory
- run `grunt server`
- get your most groovin spotify playlist playin'

## To run in the iOS simulator

- run `grunt build`
- run `phonegap run ios`

## To run through xcode

- run `grunt build`
- open `platforms/ios/4k Data Collection.xcodeproj` in xcode
- select target (device or simulator)
- hit 'run'
- yay