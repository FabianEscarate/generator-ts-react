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

  generateFolders() {
    var flagCurrentFolder = this.props.flagCurrentFolder;
    var proyectName = this.props.proyectName;

    if (!flagCurrentFolder) {
      this.destinationRoot(proyectName);
    }

    this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('index.html'), {
      title: proyectName
    });
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copyTpl(
      this.templatePath('src/logo.svg'),
      this.destinationPath('src/logo.svg')
    );
    this.fs.copyTpl(
      this.templatePath('src/index.tsx'),
      this.destinationPath('src/index.tsx')
    );
    this.fs.copyTpl(
      this.templatePath('src/tsd.d.ts'),
      this.destinationPath('src/tsd.d.ts')
    );
    this.fs.copyTpl(
      this.templatePath('src/components/Hello.tsx'),
      this.destinationPath('src/components/Hello.tsx')
    );
    this.fs.copyTpl(
      this.templatePath('src/css/Hello.scss'),
      this.destinationPath('src/css/Hello.scss')
    );
    this.fs.copyTpl(
      this.templatePath('src/css/style.scss'),
      this.destinationPath('src/css/style.scss')
    );
  }

  generatePackage() {
    const pkg = {
      name: this.props.proyectName,
      version: '1.0.0',
      description: this.props.proyectDescripcion,
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
        'url-loader': '^1.1.2',
        'file-loader': '^2.0.0',
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
      },
      {
        type: 'confirm',
        name: 'flagInstallPackages',
        message: 'Desea instalar paquetes despues de la instalacion?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    console.log('Instalando carpetas y archivos');
  }

  install() {
    if (this.props.flagInstallPackages) {
      this.npmInstall();
      // this.installDependencies();
    }
  }
};
