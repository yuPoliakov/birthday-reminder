import sls from 'serverless-http';
import binaryMimeTypes from './binaryMimeTypes.js';
import nuxtApp from './nuxtBuild.js';

export const nuxt = sls(nuxtApp, {
  binary: binaryMimeTypes
});
