import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Button,
  Drawer,
  DrawerHeader,
  DrawerBody,
  Switch
} from '@fluentui/react-components';
import { useState, useEffect } from 'react';
import Romanizer from './components/Romanizer';

function App() {
  const [isDarkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('isDarkMode');
    return stored === 'true';
  });
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const currentTheme = isDarkMode ? webDarkTheme : webLightTheme;

  const handleThemeToggle = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <FluentProvider theme={currentTheme}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Settings Button */}
        <div style={{ padding: '12px', textAlign: 'right' }}>
          <Button appearance="primary" onClick={() => setDrawerOpen(true)}>
            Settings
          </Button>
        </div>

        {/* Main Content */}
        <main style={{ flex: 1, overflow: 'auto', height: '100%' }}>
          <Romanizer />
        </main>

        {/* Drawer */}
        <Drawer
          open={isDrawerOpen}
          onOpenChange={(event, data) => setDrawerOpen(data.open)}
        >
          <DrawerHeader
            header={<strong>App Settings</strong>}
            action={
              <Button appearance="transparent" onClick={() => setDrawerOpen(false)}>
                Close
              </Button>
            }
          />
          <DrawerBody>
            <Switch
              checked={isDarkMode}
              onChange={handleThemeToggle}
              label="Dark Mode"
            />
          </DrawerBody>
        </Drawer>
      </div>
    </FluentProvider>
  );
}

export default App;