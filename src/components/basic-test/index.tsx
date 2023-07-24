import { Table, Tag } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import React, { useEffect } from 'react';
import {
  advancedWebDriverTest,
  isChromeTest,
  isPluginsTypePluginArray,
  languagesTest,
  userAgentTest,
  webDriverTest,
  webGLRendererTest,
  webGLVendorTest,
} from './tests';

const columns: ColumnsType<{
  key: string;
  name: string;
  res: {
    data: string;
    detected: boolean;
  };
}> = [
  {
    title: 'Test Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Result',
    dataIndex: 'res',
    key: 'res',
    render: (res: { data: string; detected: boolean }) => {
      if (res.detected) {
        return (
          <Tag
            style={{
              padding: 10,
              fontSize: 14,
              whiteSpace: 'pre-line',
            }}
            color="red"
          >
            {res.data}
          </Tag>
        );
      }
      return (
        <Tag
          color="green"
          style={{
            padding: 10,
            fontSize: 14,
            whiteSpace: 'pre-line',
          }}
        >
          {res.data}
        </Tag>
      );
    },
  },
];

export const BasicTest = (): JSX.Element => {
  const [data, setData] = React.useState<
    Array<{
      key: string;
      name: string;
      res: {
        data: string;
        detected: boolean;
      };
    }>
  >([]);

  useEffect(() => {
    const UA = userAgentTest();
    const webDriver = webDriverTest();
    const advancedWebDriver = advancedWebDriverTest();
    const isChrome = isChromeTest();
    const pluginsArray = isPluginsTypePluginArray();
    const lang = languagesTest();
    const vendor = webGLVendorTest();
    const renderer = webGLRendererTest();
    setData([
      {
        key: '1',
        name: 'User Agent',
        res: UA,
      },
      {
        key: '2',
        name: 'Web Driver',
        res: webDriver,
      },
      {
        key: '3',
        name: 'Advanced Web Driver',
        res: advancedWebDriver,
      },
      {
        key: '4',
        name: 'Chrome',
        res: isChrome,
      },
      {
        key: '5',
        name: 'Plugins Array (deprecated)',
        res: pluginsArray,
      },
      {
        key: '6',
        name: 'Languages',
        res: lang,
      },
      {
        key: '7',
        name: 'WebGL Vendor',
        res: vendor,
      },
      {
        key: '8',
        name: 'WebGL Renderer',
        res: renderer,
      },
    ]);
  }, []);
  return <Table dataSource={data} columns={columns} pagination={false} />;
};
