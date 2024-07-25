# Ghostban

TODO: text

## Usage

TODO: examples / API?

## Development

Notes by/for someone unfamiliar with js/ts/node/npm development.

First install dependencies:

```
yarn install

# The above did not work for me (hangs at link step but no debug output).
# An alternative is:
#
# npm install --force --verbose
```

Start in two separate terminals:

```bash
npm run watch
```

```bash
cp examples/{index.html,example.js} build/
npm start
```

Then pointing a browser to [127.0.0.1:8080](http://127.0.0.1:8080/) should give an example page
integrating the goban.

