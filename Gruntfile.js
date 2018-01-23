module.exports = function(grunt) {
  grunt.initConfig({
    ts: {
      options: {
          rootDir: '',
          compile: true,                 // perform compilation. [true (default) | false]
          comments: false,               // same as !removeComments. [true | false (default)]
          target: 'es5',                 // target javascript language. [es3 | es5 (grunt-ts default) | es6]
          module: 'commonjs',                 // target javascript module style. [amd (default) | commonjs]
          sourceMap: false,               // generate a source map for every output js file. [true (default) | false]
          declaration: true,            // generate a declaration .d.ts file for every output js file. [true | false (default)]
          noImplicitAny: false,          // set to true to pass --noImplicitAny to the compiler. [true | false (default)]
          fast: "watch"                  // see https://github.com/TypeStrong/grunt-ts/blob/master/docs/fast.md ["watch" (default) | "always" | "never"]
          /* ,compiler: './node_modules/grunt-ts/customcompiler/tsc'  */ //will use the specified compiler.
      },
      // a particular target
      dev: {
          src: [
              "constants/**/*.ts",
              "helpers/**/*.ts",
              "!**/*.d.ts"
          ],          // The source typescript files, http://gruntjs.com/configuring-tasks#files
          watch: 'ts',                  // If specified, watches this directory for changes, and re-runs the current target
          // use to override the grunt-ts project options above for this target
          options: {
              module: 'commonjs'
          }
      }
    }
  });
  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask("default", ["ts"]);
};
