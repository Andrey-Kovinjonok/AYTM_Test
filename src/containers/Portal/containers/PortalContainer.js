import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import styled from 'styled-components';

import loadUserAction from '../actions/fetchUser';
import { Portal } from '../../../components';

const users = [
  'acdlite',
  'Some-Absolutely-Unknow-User',
  'mzabriskie',
];

const Image = styled.img`
  display: block;
  width: 200px;
  height: 200px;
`;

class PortalContainer extends React.PureComponent {
  static propTypes = {
    isPortalVisible: React.PropTypes.bool,

    showPortal: React.PropTypes.func,
    removePortal: React.PropTypes.func,
    showNextImage: React.PropTypes.func,
    loadUserDispatchedAction: React.PropTypes.func,

    userIndex: React.PropTypes.number,
    userId: React.PropTypes.string,
    loadStatus: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
  };

  static defaultProps = {
    isPortalVisible: false,

    userIndex: 0,
    userId: '',
    loadStatus: '',
    imageUrl: '',

    showPortal: () => {},
    removePortal: () => {},
    showNextImage: () => {},
    loadUserDispatchedAction: () => {},
  };


  componentDidMount() {
    const {
      userIndex,
      loadUserDispatchedAction,
    } = this.props;

    loadUserDispatchedAction({ userId: users[userIndex] });
  }

  render() {
    const {
      isPortalVisible,
      showPortal,
      removePortal,

      showNextImage,
      userId,
      loadStatus,
      imageUrl,
    } = this.props;
    return (
      <div>
        <button onClick={showPortal}>
          SHOW PORTAL
        </button>

        {isPortalVisible &&
        <Portal>

          <div>
            <button onClick={removePortal}>
              REMOVE PORTAL
            </button>

            {!!imageUrl &&
              <p>
                {"Click On Image to load next User's info and show here his logo"}
              </p>}

            <Image
              src={imageUrl}
              alt="Click here to load next User's info and show here his logo"
              onClick={showNextImage}
            />
          </div>

          <p>
            {userId}
          </p>
          <p>
            {loadStatus}
          </p>
        </Portal>}
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      userId: state.loadUserReducer.userId || '',
      loadStatus: state.loadUserReducer.loadStatus || 'NOT LOADED YET',
      imageUrl: state.loadUserReducer.imageUrl || '',
    }),
    dispatch => ({
      loadUserDispatchedAction: (payload) => {
        dispatch(loadUserAction(payload)(payload));
      },
    }),
  ),
  withState('userIndex', 'setUserIndex', 0),
  withState('isPortalVisible', 'changePortalVisibility', false),

  withHandlers({
    showPortal: ({ changePortalVisibility }) => () => {
      changePortalVisibility(true);
    },
    removePortal: ({ changePortalVisibility }) => () => {
      changePortalVisibility(false);
    },
    showNextImage: ({ userIndex, setUserIndex, loadUserDispatchedAction }) => () => {
      const nextIndex = (userIndex + 1) % users.length;
      loadUserDispatchedAction({ userId: users[nextIndex] });
      setUserIndex(nextIndex);
    },
  }),
)(PortalContainer);
