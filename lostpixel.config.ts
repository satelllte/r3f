import {type CustomProjectConfig} from 'lost-pixel';

export const config: CustomProjectConfig = {
  pageShots: {
    baseUrl: 'http://localhost:3000',
    breakpoints: [375, 768, 1024, 1440],
    pages: [{path: '/test', name: 'test'}],
  },
  generateOnly: true,
  failOnDifference: true,
};
