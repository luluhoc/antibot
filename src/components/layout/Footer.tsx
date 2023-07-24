import { Layout, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const MyFooter = () => (
  <Footer style={{ textAlign: 'center' }}>
    ©2023 Created by luluhoc
    <Button
      type="link"
      href="https://github.com/luluhoc"
      target="_blank"
      rel="noopener noreferrer"
      icon={<GithubOutlined />}
    >
      Github
    </Button>
  </Footer>
);

export default MyFooter;
