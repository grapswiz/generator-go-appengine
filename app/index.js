'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var GoAppengineGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

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
            Object.keys[props].forEach(function(value, index) {
                this[index] = value;
            });

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir('app');
        this.mkdir('app/templates');
    },

    projectfiles: function () {
        this.template('app.yaml.template', 'app.yaml');
        this.copy('editorconfig', '.editorconfig');
    }
});

module.exports = GoAppengineGenerator;
