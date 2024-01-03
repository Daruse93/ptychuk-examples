import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { ChangeEvent, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navItems } from '../../../app/Navigation';

import { StyledInputSearch } from './styled';

const menuItems = navItems
  .filter((route) => !route.isExclude)
  .map((route) => {
    const { path, icon, name, children } = route;

    const childrenNavs = children?.map((item) => {
      return {
        label: <Link to={item.path}>{item.name}</Link>,
        title: item.name,
        key: item.path,
      };
    });

    return {
      label: children ? name : <Link to={path}>{name}</Link>,
      title: name,
      key: path,
      icon,
      children: childrenNavs,
    };
  });

function MenuNav() {
  const location = useLocation();
  const [isCollapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState(menuItems);

  const parentItem = menuItems.find((item) => {
    return item.children?.find((subItem) => subItem.key.includes(location.pathname));
  });

  const defaultOpenKeys = parentItem?.key ? [parentItem?.key] : [];

  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      setOpenKeys([]);
      setItems(menuItems);
      return;
    }

    const newItems = menuItems
      .filter((item) => {
        if (item.children) {
          const isFound = item.children.find((childItem) =>
            childItem.title?.toLowerCase().includes(value.toLowerCase()),
          );

          if (isFound) {
            const opens = openKeys;
            if (opens.indexOf(item.key) === -1) {
              opens.push(item.key);
            }
            setOpenKeys(opens);
          }

          return isFound;
        }

        return item?.title?.toLowerCase().includes(value.toLowerCase());
      })
      .map((item) => {
        if (item.children) {
          const newItem = { ...item };

          newItem.children = item.children?.filter((elem) => {
            return elem.title?.toLowerCase().includes(value.toLowerCase());
          });

          return newItem;
        }

        return item;
      });

    setItems(newItems);
  };

  const currentNavItem = useMemo(() => {
    return `/${location.pathname.split('/')[1]}`;
  }, [location.pathname]);

  const handleOpen: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Layout.Sider collapsible collapsed={isCollapsed} onCollapse={setCollapsed}>
      <StyledInputSearch placeholder="Search..." onChange={handleSearch} allowClear />
      <Menu
        onOpenChange={handleOpen}
        selectedKeys={[currentNavItem]}
        theme="dark"
        mode="inline"
        items={items}
        openKeys={openKeys}
      />
    </Layout.Sider>
  );
}

export default MenuNav;
