#AngularJS 1.x TypeScript Starter Template Project
The goal of this starter template is to offer a framework for Angular Applications that take full advantage of TypeScript from developing 
Angular Application code to developing Gulp Build workflow with Strongly typed definitions.

### Gulp workflow with TypeScript

This basic template uses TypeScript and Gulp workflow that lays the foundation moving forward to AngularJs 2.x

### Requirements
1. Favorite editor or development IDE - the code was developed using [Visual Studio Code](https://code.visualstudio.com/)
 
2. [Node.js](https://nodejs.org/)

### Project Configurations
* npm install
* tsd install

![alt tag](https://github.com/kdcllc/Angular-TypeScript-Starter/blob/typescript-workflow-with-gulp/content/tsd.install.1.PNG)

* gulp - uses default tasks to print out

![alt tag](https://github.com/kdcllc/Angular-TypeScript-Starter/blob/typescript-workflow-with-gulp/content/gulp.default.PNG)

### Project structure for definitely typed
In order for the Gulpfile.ts to function properly we must provide with TypeScript Definitions for the project. tsd.json contains basic references for the project.

```
|+.vscode
|    settings.json                         - specifies details for search exclusions and files from the view of the editor
|+-- tools
|       +-- typings                         
|               +-- tsd                    - tsd install command stores the definition files
|               +-- 
```

### Clone this
```
git clone -b typescript-workflow-with-gulp https://github.com/kdcllc/Angular-TypeScript-Starter.git
```

## The Article
[CodeProject.com published](http://www.codeproject.com/Tips/1075064/Gulp-Workflow-with-TypeScript)
Introduction
JavaScript's standards are constantly changing and different versions of the ECMA Scripts have been adopted by various vendors at various times. Google Angular development team embraced TypeScript open-source project by Microsoft for their latest re-write of Angular2 framework. That leaves all of the existing investment of Angular in a state of transition. 
The goal of this article is to provide a first step of migrating existing Angular applications that utilize TypeScript to write Gulp to build workflows for your projects.
On a personal note, I prefer well-structured code with the ability to divide it into sections instead of being overwhelmed by DevOps code. TypeScript provides us with the ability to write classes for reuse within the Gulp Tasks.
This article assumes the basic knowledge of Node.js, Gulp and Angular Js. 
Setting Up the Project
Please make sure that you have the following installed:
1.	Git for your operating system of choice
2.	Node.js
3.	Visual Studio Code
To get the source code for this article, use Git to clone it like so:
git clone -b typescript-workflow-with-gulp https://github.com/kdcllc/Angular-TypeScript-Starter.git
Once the project is downloaded and created on your machine, navigate to the project and run code . command.  This will open the source code within Visual Studio Code.
Next run the following:
1.	Npm install  - this will download all of the project dependencies and install them in the project directory
2.	Tsd install  –this will install all of the definitely typed files for the project
3.	Gulp – this will run the default Gulp task written in TypeScript
So, if you followed the steps listed above and were successful in executing your first Gulp tasks written in TypeScript  - Congratulations!

Now, let’s highlight the project setup.
First, npm package ts-node allows the execution of Gulpfile.ts.
Second, tsconfig.json file contains the TypeScript compilation settings.
Third, tools/typings/tsd folder contains all of the definitely typed files that we are going to use for our tooling.
The project contains a minimal amount of code but allows you to begin converting existing Gulp JavaScript based workflows to Gulp TypeScript workflows.

## Licence ##

The MIT License

Copyright (c) 2014-2016 [King David Consulting LLC](https://kingdavidconsulting.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.