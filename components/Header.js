import React from 'react';

import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';
import KarmaPoints from './KarmaPoints';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }} inverted fluid widths={3}>
      <Menu.Item>
        <Link route="/">
          <a className="item">EtherMantras</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <KarmaPoints />
      </Menu.Item>
      <Menu.Item position="right">
        <Link route="/mantras/show">
          <a className="item">My Mantras</a>
        </Link>
        {/*
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
        */}
      </Menu.Item>
    </Menu>
  );
};
