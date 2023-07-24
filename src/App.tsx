import { ConfigProvider, theme, Typography } from 'antd';
import './App.css';
import Title from 'antd/es/typography/Title';
import { BasicTest } from './components/basic-test';

function App(): JSX.Element {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Typography>
        <Title>Tests</Title>
      </Typography>
      <BasicTest />
    </ConfigProvider>
  );
}

export default App;
