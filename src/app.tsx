import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import PageLayoutBuilder from './app/pages/PageLayoutBuilder/PageLayoutBuilder';

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <PageLayoutBuilder />
    </FluentProvider>
  );
}

export default App;
