# react-dc-voting

A react app built and used by React DC for voting on discussion topics.

## Getting Set Up
(If you have any of these then skip that step). Depending on your experience with JavaScript and coding in general, this setup process may be intimidating. If you have trouble getting started please let an organizer or someone who has the hang of things know!

### Git
Mac or linux users can skip this step. Windows users should go [here](http://www.git-scm.com/download/win) and follow the download instructions.

### Node
Use the appropriate installer [here](http://nodejs.org/download/).

### NPM
Type this command in the terminal:
```
curl https://www.npmjs.org/install.sh | sh
```

`npm install` will install all other dependencies.

## Use
The following commands will get you set up:
```
git clone git@github.com:reactdc/react-dc-voting.git
cd /react-dc-voting
npm install
npm run build
```
Now open up a second terminal and type:
```
npm start
```
Congratulations! If all went well you know have a fully functional node.js server with a React front-end.

To view your site, go to `localhost:3000`. You should see a single line: "React App".

## Contibuting
All React code goes in the `src/jsx` folder. As long as the tab running `npm build` remains running, the app will be build as you are writing it, so you just have to refresh the page.