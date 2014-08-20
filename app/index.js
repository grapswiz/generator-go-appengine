'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var GoAppengineGenerator = yeoman.generators.Base.extend({
    askFor: function () {
        var done = this.async();

        this.appId = this.args[0] || undefined;

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous GoAppEngine generator!'));

        var prompts = [
            {
                name: 'appId',
                message: 'What is the application ID?',
                default: path.basename(process.cwd())
            }
        ];

        this.prompt(prompts, function (props) {
            for (var prop in props) {
                this[prop] = props[prop];
            }

            done();
        }.bind(this));
    },

    app: function () {
        this.template('app.go', 'app.go');
        this.template('index.html', 'index.html');
    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
    },

    appEngineFiles: function () {
        this.template('app.yaml.template', 'app.yaml');
    }
});

module.exports = GoAppengineGenerator;
