#Installation Steps
---

In terminal:
* Install Grunt dependencies: `npm install`
* Install Bower components: `bower install`

Modify `Gruntfile.js` as needed, following the documentation at
[Assemble](http://assemble.io/).

###Live Watching
Run `grunt watch` to handle live SASS compiling, asset copying, and Assemble
building. You can run these tasks individually with the commands given below.

#####Compile SASS
Run `grunt sass:dist`.

#####Copy Bower Components and Assets
To copy Bower components and assets into the `output` folder, run `grunt copy`.

#####Invoke Assemble
To invoke Assemble and trigger a complete site build, run `grunt assemble`.

#####Deploying
A deploy consists of running the necessary Grunt tasks, commiting the `output`
folder, and pushing to the proper remote. All of these tasks can be achieved by
running `sh deploy` from the root folder of the repository.
