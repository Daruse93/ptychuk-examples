import _keyBy from 'lodash/keyBy';
import { Breadcrumb } from 'antd';
import { Link, Location } from 'react-router-dom';

import { navItems } from '../../../app/Navigation';

interface IProps {
  location: Location;
}

const navItemsMap = _keyBy(navItems, 'path');

function BreadCrumbs({ location }: IProps) {
  const pathSnippets = location.pathname.split('/').filter((i: string) => i);

  const breadcrumbItems = pathSnippets.map((_: string, index: number) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const navItem = navItemsMap[url];

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {navItem?.name || pathSnippets[index]}
        </Link>
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
}

export default BreadCrumbs;
