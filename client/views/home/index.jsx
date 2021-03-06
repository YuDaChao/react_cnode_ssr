import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../action/home';

const propTypes = {
  message: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
};

class Home extends Component {
  componentDidMount() {
    this.props.getMessage();
  }

  render() {
    return (
      <div className="home">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit.... <code>src/views/home/index.js</code> and save to reload.
        </p>
        <Link href to="/user">
          <p className="App-intro">
            {this.props.message}
          </p>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.home.message,
});

/**
 * mapDispatchToProps： 可以是一个对象或是函数
 * @type {{getMessage: getMessage}}
 */
const mapDispatchToProps = {
  getMessage: action.getMessage,
};

Home.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
