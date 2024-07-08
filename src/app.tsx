import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import CreateForm from './app/forms/CreateForm';

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <CreateForm />
    </FluentProvider>
  );
}

export default App;
