#GrainForAll.com

##Installation

In terminal:
* Install Grunt dependencies: `npm install`
* Install Bower components: `bower install`

##Live Watching

Run `grunt watch` to handle live SASS compiling, asset copying, and Assemble
building. You can also run these tasks individually with the `Gruntfile`
commands given below.

##Deploying
A deploy consists of running the necessary Grunt tasks, commiting the `output`
folder, and pushing to the proper remote. **All of these tasks can be achieved by
running `sh deploy` from the root folder of the repository.**

##Gruntfile

Modify `Gruntfile.js` as needed, following the documentation at
[Assemble](http://assemble.io/).

The following tasks are currently available:

* Compile SASS: `grunt sass:dist`
* Copy Bower Components and Assets: `grunt copy`
* Invoke Assemble: `grunt assemble`

