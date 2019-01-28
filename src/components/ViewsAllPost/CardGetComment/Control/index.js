import React from 'react';
import propTypes from 'prop-types';
import { Tooltip, Popover } from 'reactstrap';

// Constants
import { FONT_SIZE, COLOR } from 'src/constants/style-set';

export default class Control extends React.Component {
  static propTypes = {
    comments: propTypes.object.isRequired,
    handleEventUpdate: propTypes.func.isRequired,
    index: propTypes.number.isRequired,
    post: propTypes.string.isRequired,
    updateComment: propTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      tooltip: false,
      popover: false,
    };
    this.handleEventUpdate = props.handleEventUpdate.bind(this);
  }

  componentDidMount() {}

  toggleTooltip = () => this.setState({ tooltip: !this.state.tooltip });
  togglePopover = () => this.setState({ popover: !this.state.popover });

  clickUpdate = payload => {
    this.handleEventUpdate(payload);
  }

  render() {
    const { index, post, updateComment, comments } = this.props;
    const { tooltip, popover } = this.state;
    return (
      <React.Fragment key={`logs-${index}`}>
        <i className="fas fa-ellipsis-h icon-controll ml-1 mt-3" id={`logs_control_${index}_${post}`} onClick={this.togglePopover} />
        <Tooltip isOpen={tooltip} placement="top" target={`logs_control_${index}_${post}`} toggle={this.toggleTooltip}>
          <p className="logs-control">{'Chỉnh sửa hoặc xoá bình luận này'}</p>
        </Tooltip>

        <Popover isOpen={popover} placement="bottom" target={`logs_control_${index}_${post}`} toggle={this.togglePopover}>
          {updateComment ?
            <span>
              <p className="item-control" onClick={() => this.clickUpdate({ comments, index })}>{'Chỉnh sửa'}</p>
              <p className="item-control">{'Xoá'}</p>
            </span>
            :
            <p className="item-control">{'Báo cáo'}</p>
          }
          
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
