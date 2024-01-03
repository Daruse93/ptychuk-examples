import styled from 'styled-components';
import { Input, Layout } from 'antd';

import theme, { getEnvColor } from '../../../config/theme';

export const StyledLayout = styled(Layout)`
  background: ${getEnvColor()};
`;

export const StyledLayoutContent = styled('div')`
  min-height: ${theme.layout.defaultSize};
  padding: ${theme.margins.xs};
  background: ${theme.colors.white};
`;

export const StyledInputSearch = styled(Input)`
  margin-bottom: ${theme.margins.xs};
  border: ${theme.borders.input};
`;
