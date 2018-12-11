import React from 'react';
import { Container, Navbar, NavbarBrand, NavbarToggler, Collapse, Input } from 'reactstrap';

// css
import css from 'styled-jsx/css';

// Components
import SvgIcon from 'src/components/Commons/SvgIcon';

// Locals
import UserInfo from './UserInfo';

export default class HeaderBar extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isOpenNavBar: false,
    };
  }

  componentDidMount() { }

  toggleNavBar = () => {
    this.setState({ isOpenNavBar: !this.state.isOpenNavBar });
  }

  render() {
    const { isOpenNavBar } = this.state;
    return (
      <Navbar className="py-1" color="primary" dark expand="sm">
        <Container>
          <NavbarBrand href="/">
            <SvgIcon name="logo" size={45} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavBar} />
          <Collapse isOpen={isOpenNavBar} navbar>
            <UserInfo />
          </Collapse>
        </Container>
        <style jsx>{styles}</style>
      </Navbar>
    );
  }
}
const styles = css`
  :global(.title-items) {
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    margin-left: 20px;
    font-weight: 300;
  }
  :global(.title-items:hover) {
    color: white;
  }
`;
