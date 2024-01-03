import styled from 'styled-components';
import { Input, Layout } from 'antd';

import theme, { getEnvColor } from '../../../config/theme';

export const StyledLayout = styled(Layout)`
  background: ${getEnvColor()};
`;

export const StyledLayoutContent = styled('div')`
  min-height: 360px;
  padding: 24px;
  background: #fff;
`;

export const StyledInputSearch = styled(Input)`
  margin-bottom: 5px;
  border: 3px solid ${theme.colors.black};
`;
