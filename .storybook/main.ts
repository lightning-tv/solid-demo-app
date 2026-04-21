import type { StorybookConfig } from 'storybook-solidjs-vite';
import type { InlineConfig } from 'vite';

function flattenPlugins(plugins: any[]): any[] {
  return plugins.reduce((acc: any[], p: any) => {
    if (Array.isArray(p)) return acc.concat(flattenPlugins(p));
    if (p) acc.push(p);
    return acc;
  }, []);
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: 'storybook-solidjs-vite',
    options: {}
  },
  async viteFinal(config: InlineConfig) {
    if (config.plugins) {
      const flat = flattenPlugins(config.plugins as any[]);
      config.plugins = flat.filter((p: any) => !String(p?.name ?? '').includes('legacy'));
    }
    return config;
  }
};

export default config;
