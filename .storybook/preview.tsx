import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mrcamelhub/camel-ui';
import DialogProvider from '@provider/DialogProvider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    (Story, { args: { darkMode } }) => (
      <ThemeProvider theme={darkMode ? 'dark' : 'light'} disableResetCSS={false}>
        <DialogProvider>
          <Story />
        </DialogProvider>
      </ThemeProvider>
    )
  ],
  argTypes: {
    darkMode: { control: 'boolean' },
    customStyle: { control: false }
  },
  args: { darkMode: false }
};

export default preview;
