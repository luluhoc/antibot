/* eslint-disable @typescript-eslint/no-floating-promises */
import { ConfigProvider, theme, Typography } from 'antd';
import './App.css';
import Title from 'antd/es/typography/Title';
import { BasicTest } from './components/basic-test';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import React from 'react';
import MyFooter from './components/layout/Footer';
import { Content } from 'antd/es/layout/layout';
import { getComprehensiveBrowserInfo } from './components/basic-test/tests';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const fpPromise = FingerprintJS.load();

function App(): JSX.Element {
  const [visitorId, setVisitorId] = React.useState<string>('');
  const [complexData, setComplexData] = React.useState<any>({});
  React.useEffect(() => {
    (async () => {
      // We recommend to call `load` at application startup.
      // Get the visitor identifier when you need it.
      const fp = await fpPromise;
      const result = await fp.get();
      setVisitorId(result.visitorId);
    })();
  }, []);

  React.useEffect(() => {
    setComplexData(getComprehensiveBrowserInfo());
  }, []);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Content style={{ padding: '0 20px' }}>
        <Typography>
          <Title>Basic Tests</Title>
        </Typography>
        <BasicTest />
        <Typography>
          <Title>
            <a href="https://github.com/fingerprintjs/fingerprintjs" target="_blank">
              FingerprintJS
            </a>
          </Title>
          <pre>{visitorId}</pre>
        </Typography>
        <Typography>
          <Title>
            <a href="">More</a>
          </Title>
          <pre>
            <SyntaxHighlighter style={vs2015}>{JSON.stringify(complexData, null, 4)}</SyntaxHighlighter>
          </pre>
        </Typography>
      </Content>
      <MyFooter />
    </ConfigProvider>
  );
}

export default App;
