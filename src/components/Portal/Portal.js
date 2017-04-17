import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const PortalFrame = styled.div`
  display: block;
  margin: auto;
  width: 600px;
  height: 600px;
  padding: 30px;

  background-color: #ccc;
`;


const renderChildren = ReactDOM.unstable_renderSubtreeIntoContainer;

export default class Portal extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  componentDidMount() {
    this.portalElement = document.createElement('div');
    document.body.appendChild(this.portalElement);
    this.renderPortal();
  }

  componentDidUpdate() {
    this.renderPortal();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portalElement);
    document.body.removeChild(this.portalElement);
  }

  renderPortal() {
    const { children } = this.props;
    const childrenNode = (
      <PortalFrame>
        {children}
      </PortalFrame>
    );
    // ReactDOM.render(children, this.portalElement);
    renderChildren(this, childrenNode, this.portalElement);
  }

  render() {
    return null;
  }
}
