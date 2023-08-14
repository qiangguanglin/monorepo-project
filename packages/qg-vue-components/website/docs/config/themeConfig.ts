import { zhConfig, enConfig } from './otherConfig';
import { zhNav, enNav } from './nav';
import { zhSidebar, enSidebar } from './sidebar';

export default {
    locales: {
        '/': {
          ...zhConfig,
          nav: zhNav,
          sidebar: zhSidebar
        },
        '/en/': {
          ...enConfig,
          nav: enNav,
          sidebar: enSidebar
        }
    },
}