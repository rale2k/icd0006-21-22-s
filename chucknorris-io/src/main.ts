import Aurelia, { RouterConfiguration } from 'aurelia';
import { MyApp } from './my-app';
import "./css/bootstrap-5.1.3-dist/css/bootstrap.min.css"
import "./css/bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js"

Aurelia
  .register(RouterConfiguration)
  .app(MyApp)
  .start();
