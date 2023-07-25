import { Table, Tag } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import React, { useEffect } from 'react';
import {
  advancedWebDriverTest,
  interactionSpeedTest,
  isChromeTest,
  isPluginsTypePluginArray,
  languagesTest,
  mouseMovementTest,
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

  const [promises, setPromises] = React.useState<any>([]);
  const [promisesLoading, setPromisesLoading] = React.useState<boolean>(true);
  const [interaction, setInteraction] = React.useState<{
    data: string;
    detected: boolean;
  }>({
    data: 'No interaction yet',
    detected: false,
  });

  const testPromises = async () => {
    const mouseMovement = await mouseMovementTest();
    return [mouseMovement];
  };

  useEffect(() => {
    testPromises()
      .then((data) => {
        setPromises(data);
        setPromisesLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    interactionSpeedTest(setInteraction);
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
      !promisesLoading
        ? {
            key: '10',
            name: 'Mouse Movement',
            res: promises[0],
          }
        : {
            key: '10',
            name: 'Mouse Movement',
            res: {
              data: 'Loading...',
              detected: false,
            },
          },
      {
        key: '11',
        name: 'Interaction Speed',
        res: interaction,
      },
    ]);
  }, [promises]);
  return <Table dataSource={data} columns={columns} pagination={false} />;
};
