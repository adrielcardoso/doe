import 'core-js/client/shim';
import 'reflect-metadata';
require('zone.js/dist/zone');
import 'ts-helpers';

if (process.env.ENV === 'build') {
  // Producao
} else {
  // Desenvolvimento
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
