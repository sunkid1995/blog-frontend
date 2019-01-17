import _ from 'lodash';
import { Nav, NavItem, NavLink } from 'reactstrap';
import css from 'styled-jsx/css';

// Constants
import { MENU_TAB_LIST_LEFT_IDS, MENU_TAB_LIST_LEFT } from 'src/constants';
import { FONT_SIZE, COLOR } from 'src/constants/style-set';

const { HOT, NEW, TOP } = MENU_TAB_LIST_LEFT_IDS;

const TabListControlLeft = () => (
  <div>
    <Nav className="tab-list-left" vertical>
      {_.map([HOT, NEW, TOP], id => {
        const { [id]: { title, href, icon } } = MENU_TAB_LIST_LEFT;

        return (
          <NavItem key={`tab-list-${id}`}>
            <NavLink className="title-tab-list" href={href}>
              <p className="wrap-content-menu">
                <span className="mr-2">
                  {icon}
                </span>
                <span>
                  {title}
                </span>
              </p>
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
    <style jsx>{styled}</style>
  </div>
);

const styled = css`
  :global(.tab-list-left) {
    float: right;
  };

  :global(.title-tab-list) {
    color: #99A3AD;
    font-size: ${FONT_SIZE.TITLE};
    font-weight: 400;
  }

  :global(.title-tab-list:hover) { 
    color: ${COLOR.BLUE};
  }

  .wrap-content-menu {
    margin-bottom: 0px;
  }
`;

export default TabListControlLeft;
