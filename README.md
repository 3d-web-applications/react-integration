# react-integration
Guide to integrating React in PlayCanvas projects

## System Setup
- NodeJs 8 is required to use the NPM package <i>create-react-app</i>
- <i>npm install -g create-react-app</i>

## Project Setup
1. Create new remote repository
2. Clone repository and navigate into the new subfolder
3. Call <i>create-react-app frontend</i>
4. Navigate into the subfolder <i>frontend</i>
5. Run <i>npm start</i> to test the default app (another tab will open up in your browser shortly after; if you can see the default app go on with the next step)
6. <i>npm install webpack webpack-cli --save-dev</i>
7. Create webpack.config.js
8. Create .babelrc
9. <i>npm install babel-plugin-transform-react-jsx --save</i>
10. <i>npm install svg-inline-loader --save-dev</i>
11. <i>npm install css-loader --save-dev</i>
12. Extend the scripts section in package.json and run <i>npm start</i> again
Probably you cannot start the application anymore. Instead you will receive a message in your terminal, similar to the message below. If that happens, you need to downgrade your webpack package with <i>npm install webpack@4.19.1 --save-dev</i>.
```
There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "webpack": "4.19.1"

...
```
13. Before you can run your React app in PlayCanvas, you have to replace one line in your index.js.
```diff
- ReactDOM.render(<App />, document.getElementById('root'));
+ let root = document.getElementById('root');
+ if (!root) {
+   root = document.createElement('div');
+   root.id = 'root';
+   root.style = 'position: absolute;';
+   document.body.appendChild(root);
+ }
+ ReactDOM.render(<App />, root);
```
14. Now upload <i>dist/main.js</i> into your PlayCanvas project and make sure that it is set to the beginning of the script loading order.
15. Update your .gitignore file, to prevent file uploads from your <i>dist</i> folder.

## Thoughts about resource handling.
To display images which are referenced in <i>dist/main.js</i> build, we have multiple options.

### svg-inline-loader
To display the default React logo, which is an .svg file, we could add the following package to our <i>devDependencies:</i> in <i>package.json</i>. Open a terminal and enter: <i>npm install svg-inline-loader --save-dev</i>. Furthermore another rule must be added to webpack.config.js:
```javascript
{
  test: /\.svg$/,
  loader: 'svg-inline-loader',
},
```
Moreover we have to explicitly mention the usage of <i>inline-svg</i> by adding the prefix <i>data:image/svg+xml;utf8,</i> to ${logo} in App.js. The result could look like this one:
```javascript
const img = `data:image/svg+xml;utf8,${logo}`;
return (
  <div className="App">
    <header className="App-header">
      <img src={img} className="App-logo" alt="logo" />
      <p>
      ...
```
Now we can see the logo when launching the PlayCanvas app. Unfortunately, the image is not displayed anymore when executing <i>npm start</i>.

### file-loader
Working with <i>file-loader</i> instead of using <i>svg-inline-loader</i>, was even less successful.

### Using PNG files
Using .png files instead of .svg files, seems to be a good workaround! But now you have to upload those files into your PlayCanvas project, too. They become available under
```
https://playcanvas.com/editor/scene/<SCENE_ID>/files/assets/1/<ASSET_ID>/logo.png
```
But when you launch the the application, after replacing the build file, 	&lt;img src= points to
```
https://launch.playcanvas.com/<SCENE_ID>/logo.png
```
This url cannot be resolved, which means no image will be presented. You could add a custom logic, observing window.location.href to make decisions about the real resource path. But this would also mean, that the workaround will always exist inside the application.

### url-loader
At the moment <i>npm install url-loader --save-dev</i> seems to be the best solution. Like in (1) we have to add another rule to webpack.config.js. Furthermore we need to set the limit to any value greater than the largest file size. Otherwise some images will not be transformed into base64, which will end in the same problem, as described in (3).
```javascript
{
  test: /\.(jpg|png|gif|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 640000,
    }
  },
},
```

### Using external services
Another solution is to upload images, etc. onto another URL, to become available for PlayCanvas applications. But this makes only sense, when you plan to use a content delivery network (CDN) during the development and also in production. 

## Notes
Please note that there are still some things to do. For instance we need to provide a custom logic to catch some mouse/touch events in the UI, while others should be passed to the scene, to allow navigating the camera, etc.

