import React from 'react';
import propTypes from 'prop-types';
import { Tooltip, Popover } from 'reactstrap';

// Constants
import { FONT_SIZE, COLOR } from 'src/constants/style-set';

export default class Control extends React.Component {
  static propTypes = {
    index: propTypes.number.isRequired,
  }

  constructor() {
    super();
    this.state = {
      tooltip: false,
      popover: false,
    };
  }

  componentDidMount() {}

  toggleTooltip = () => this.setState({ tooltip: !this.state.tooltip });
  togglePopover = () => this.setState({ popover: !this.state.popover });

  render() {
    const { index } = this.props;
    const { tooltip, popover } = this.state;
    return (
      <React.Fragment key={`logs-${index}`}>
        <i className="fas fa-ellipsis-h icon-controll ml-1 mt-3" id={`logs_control_${index}`} onClick={this.togglePopover} />
        <Tooltip isOpen={tooltip} placement="top" target={`logs_control_${index}`} toggle={this.toggleTooltip}>
          <p className="logs-control">{'Chỉnh sửa hoặc xoá bình luận này'}</p>
        </Tooltip>

        <Popover isOpen={popover} placement="bottom" target={`logs_control_${index}`} toggle={this.togglePopover} >
          <p className="item-control">{'Chỉnh sửa'}</p>
          <p className="item-control">{'Xoá'}</p>
        </Popover>
        <style jsx>{`
          .item-control {
            text-align: center;
            padding: 5px;
            margin-bottom: 0px;
            cursor: pointer;
            font-size: ${FONT_SIZE.SMALL};
          }

          .item-control:hover {
            background: ${COLOR.BLUE};
            color: white;
          }

          .logs-control {
            text-align: center;
            margin-bottom: 0px;
            cursor: pointer;
            font-size: ${FONT_SIZE.SMALL};
            white-space: nowrap;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
