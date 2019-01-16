import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Nav, NavItem, NavLink, Input,
} from 'reactstrap';
import css from 'styled-jsx/css';

// Contants
import { MENU_BAR_IDS, MENU_BAR } from 'src/constants';

// Models
import User from 'src/models/User';

// Locals
import Avatar from './Avatar';
import withConnect from './withConnect';

const { NOTIFICATIONS, MESSAGE } = MENU_BAR_IDS;

@withConnect
export default class UserAvatar extends React.PureComponent {
  static propTypes = {
    deauthorize: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(User),
  };

  static defaultProps = {
    user: null,
  };

  constructor(props) {
    super(props);
    this.state = {
    };

    this.deauthorize = props.deauthorize.bind(this);
    this.state = { dropdownOpen: false };
  }

  hideDropdown = () => this.setState({ dropdownOpen: false });
  showDropdown = () => this.setState({ dropdownOpen: true });

  onSelectMenu = event => {
    this.hideDropdown();
    const option = event.target.dataset.tag;

    switch (option) {
      case 'log_out': this.deauthorize(); return;
      default: return;
    }
  };

  renderAvatar(user) {
    const { dropdownOpen } = this.state;

    return (
      <div className="user-avatar">
        <Dropdown
          isOpen={dropdownOpen}
          onMouseEnter={this.showDropdown}
          onMouseLeave={this.hideDropdown}
          toggle={() => { }}
        >
          <DropdownToggle aria-expanded={dropdownOpen} data-toggle="dropdown" tag="div">
            <div className={`avatar-toggle ${dropdownOpen ? 'show' : ''}`}>
              <Avatar size={40} />
            </div>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem data-tag="add_lead" >{`Hi, ${user.username}`}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem data-tag="add_lead" onClick={this.onSelectMenu}>{'Trang cá nhân'}</DropdownItem>
            <DropdownItem data-tag="log_out" onClick={this.onSelectMenu}>{'Đăng xuất'}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <style jsx>{avatarStyles}</style>
      </div>
    );
  }

  onChangeNavBar = id => {
    console.log(id); // eslint-disable-line no-console
  }

  renderMenubarItem = () => _.map([MESSAGE ,NOTIFICATIONS], id => {
    const { [id]: { enabled, href, icon } } = MENU_BAR;
    if (!enabled) return null;

    return (
      <NavItem key={`nav-item-${id}`}>
        <NavLink className="mt-1 pt-1 ml-1 mr-1" href={href} onClick={() => this.onChangeNavBar(id)} style={{ fontSize: 22 }} >
          {icon}
        </NavLink>
      </NavItem>
    );
  })

  render() {
    const { user } = this.props;
    if (user == null) return null;

    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Input className="input-search-bar mt-1" placeholder="Tìm kiếm" type="text" />
        </NavItem>
        {this.renderMenubarItem()}
        <NavItem>
          {this.renderAvatar(user)}
        </NavItem>
      </Nav>
    );
  }
}

const avatarStyles = css`
  .avatar-toggle {
    background-color: transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    cursor: pointer;
    padding: 0.25rem;
  }

  .avatar-toggle.show {
    background-color: white;
  }
  
  .user-avatar :global(.dropdown-menu) {
    border-top-right-radius: 0;
    border-top: none;
    margin-right: -1px;
    margin-top: 0px;
  }

  .user-avatar :global(.dropdown-menu) > :global(.dropdown-item) {
    cursor: pointer;
  }

  :global(.input-search-bar) {
    width: 450px !important;
  }

  @media (max-width: 480px) {

    :global(.input-search-bar) {
      width: 325px !important;
    }

  }
`;
