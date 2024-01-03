import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Layout, Typography, Row, Col } from 'antd';

import { dateUTCFormat } from '../../../utils';

import AlertMessage from '../../components/Alerting/Message';
import { Header, HeaderNoUser } from '../../fragments/Header';
import BreadCrumbs from './BreadCrumbs';
import Menu from './Menu';

import { StyledLayout, StyledLayoutContent } from './styled';

const { Content, Footer } = Layout;

interface IProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  hideAlerting?: boolean;
}

function BaseWrapper(props: IProps) {
  const { title, children, actions, hideAlerting = false } = props;
  const location = useLocation();
  const { authState } = useOktaAuth();
  const { isAuthenticated } = authState || {};

  useEffect(() => {
    document.title = title || document.title;
  }, [title]);

  const titleContent = <Typography.Title>{title}</Typography.Title>;

  const todayDate = dateUTCFormat(new Date());

  return (
    <StyledLayout>
      {isAuthenticated && <Header />}
      {!isAuthenticated && <HeaderNoUser />}

      <StyledLayout>
        <Menu />
        <Content>
          {!hideAlerting && (
            <Row>
              <Col span={24}>
                <AlertMessage />
              </Col>
            </Row>
          )}

          <Row justify="space-between">
            <Col>
              <BreadCrumbs location={location} />
            </Col>
            <Col>
              <Typography.Text type="secondary">Today’s date is : {todayDate} UTC</Typography.Text>
            </Col>
          </Row>

          <StyledLayoutContent>
            {actions ? (
              <Row justify="space-between">
                <Col>{titleContent}</Col>
                <Col>{actions}</Col>
              </Row>
            ) : (
              titleContent
            )}

            {children}
          </StyledLayoutContent>

          <Footer/>
        </Content>
      </StyledLayout>
    </StyledLayout>
  );
}

export default BaseWrapper;
