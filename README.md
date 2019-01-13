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
10. <i>npm install html-webpack-plugin --save-dev</i>
11. <i>npm install svg-inline-loader --save-dev</i>
12. <i>npm install css-loader --save-dev</i>
13. Extend the scripts section in package.json and run <i>npm start</i> again
Probably you cannot start the application anymore. Instead you will receive a message in your terminal, similar to the message below. If that happens, you need to downgrade your webpack package with <i>npm install webpack@4.19.1 --save-dev</i>.
```
There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "webpack": "4.19.1"

...
```
14. Before you can run your React app in PlayCanvas, you have to replace one line in your index.js.
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
15. Now upload <i>dist/main.js</i> into your PlayCanvas project and make sure that it is set to the beginning of the script loading order.
16. Update your .gitignore file, to prevent file uploads from your <i>dist</i> folder. 

