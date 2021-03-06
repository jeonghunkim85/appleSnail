import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as registerActions from 'actions/RegisterActions';

import RegisterShopForm from 'components/register/RegisterShopForm';
import {Logger, history} from 'helpers';

class RegisterShopContainer extends Component{

  constructor(props){
    super(props);
    this.state = {status : 0}

       
    if(!props.auth || !props.auth.Authorization){
      history.push('/login');
    }
  }

  handleSubmit = (data) => {
    Logger.debug('RegisterShopContainer.handleSubmit()', data);
    this.props.handleActions.reqRegisterCompanyWithShop(data);
  }

  render(){
    const {handleSubmit, status} = this;

    return (
      <RegisterShopForm onSubmit={handleSubmit} status={status}/>
    )
  }
}

// export default RegisterShopContainer;

// export default SalesDetailContainer;
const mapStateToProps = ({register, auth}) => {
  Logger.debug('register', register);
  return {
    status : register.status,
    auth: auth
    // duplicatedCheck: register.duplicatedCheck,
    // userId: register.userId
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleActions: bindActionCreators(registerActions, dispatch)
      // handleActions: bindActionCreators(salesActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchProps)(RegisterShopContainer);

