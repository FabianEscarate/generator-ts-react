/* eslint-disable capitalized-comments */
/* eslint-disable no-useless-constructor */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  generatePackage() {
    const pkg = {
      name: this.props.proyectName,
      version: '1.0.0',
      description: 'Nuevo proyecto: ' + this.props.proyectName + ' (React-ts) ',
      main: 'index.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1'
      },
      author: 'testUser',
      license: 'ISC',
      dependencies: {
        '@types/es6-collections': '^0.5.31',
        '@types/es6-promise': '^3.3.0',
        '@types/react': '^16.0.38',
        '@types/react-dom': '^16.0.4',
        '@types/webpack-env': '^1.13.5',
        https: '^1.0.0',
        linq: '^3.0.9',
        react: '^16.2.0',
        'react-dom': '^16.2.0'
      },
      devDependencies: {
        'awesome-typescript-loader': '^3.4.1',
        'css-loader': '^1.0.0',
        gulp: '^3.9.1',
        'gulp-live-server': '0.0.31',
        https: '^1.0.0',
        'node-sass': '^4.9.2',
        rest: '^2.0.0',
        'sass-loader': '^7.0.3',
        'source-map-loader': '^0.2.3',
        'style-loader': '^0.21.0',
        typescript: '^2.7.2',
        'webpack-stream': '^4.0.2'
      }
    };

    this.fs.extendJSON(this.destinationPath('package.json'), pkg);
  }

  generateTsConfig() {
    const tsconfigJson = {
      compilerOptions: {
        outDir: './dist/',
        forceConsistentCasingInFileNames: false,
        sourceMap: true,
        noImplicitAny: false,
        module: 'commonjs',
        target: 'es5',
        jsx: 'react',
        experimentalDecorators: true,
        types: ['es6-promise', 'es6-collections', 'webpack-env']
      },
      include: ['./src/**/*']
    };

    this.fs.extendJSON(this.destinationPath('tsconfig.json'), tsconfigJson);
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the awesome ${chalk.green('generator-ts-react')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'proyectName',
        message: 'Ingrese nombre del proyecto',
        default: this.appname
      },
      {
        type: 'input',
        name: 'proyectDescripcion',
        message: 'Ingrese descripcion del proyecto',
        default: 'Nuevo Proyecto de prueba'
      },
      {
        type: 'confirm',
        name: 'flagCurrentFolder',
        message: 'Desea utilizar la carpeta actual?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    console.log(this.props);
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
  }

  install() {
    // this.installDependencies();
  }
};
