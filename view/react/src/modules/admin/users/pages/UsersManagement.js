import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  Container,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'shards-react';
import Fuse from 'fuse.js';

import { actions as profileActions } from '../../../user/profile';
import { actions as authActions } from '../../../authentication';
import { actions as userActions } from '../index';
import AlertMessages from '../../../../components/common/AlertMessages';
import PageTitle from '../../../../components/common/PageTitle';
import ManageUsersList from '../../../../components/users/ManageUsersList';
import CreateFleetMemberModal from '../../../../components/users/CreateFleetMemberModal';

const { registerFleetMember } = authActions;
const { getAccountDetails } = profileActions;
const { getUsers, resendVerification } = userActions;

class UsersManagement extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.searcher = null;
    this.state = {
      attemptSubmit: false,
      errorMessages: [],
      successMessages: [],
      isFetchingUsers: true,
      users: [],
      mdlCreation: false,
      email: null,
      firstName: null,
      lastName: null
    };
  }

  componentDidMount = () => {
    this._isMounted = true;

    if (this._isMounted) {
      const { getAccountDetails } = this.props;
      this._getUsers();
      getAccountDetails().catch(error => {
        console.log(error);
      });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  _getUsers = () => {
    const { getUsers } = this.props;
    getUsers()
      .then(users => {
        this.searcher = new Fuse(users, {
          shouldSort: true,
          keys: ['fname', 'lname', 'email']
        });
        this.setState({ isFetchingUsers: false, users });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handleEmail = event => {
    this.setState({ email: event.target.value });
  };

  _handleFirstName = event => {
    this.setState({ firstName: event.target.value });
  };

  _handleLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  _handleSearch = event => {
    const { value } = event.target;
    const { users: allUsers } = this.props;
    const users = value.length === 0 ? allUsers : this.searcher.search(value);
    this.setState({ users });
  };

  _resendVerification = email => {
    const { resendVerification, t } = this.props;
    let errorMessages = [];
    let successMessages = [];
    const confirmation = window.confirm(
      `You are about to re-send a verification email to ${email}`
    );

    if (confirmation) {
      resendVerification(email)
        .then(result => {
          if (result) {
            successMessages.push({
              message: `A verification email has been sent to ${email}.`
            });
            this.setState({ successMessages });
          }
        })
        .catch(error => {
          if (Array.isArray(error)) {
            errorMessages = errorMessages.concat(error);
          } else {
            errorMessages.push({ message: t('translation.generalError') });
          }

          this.setState({ errorMessages });
        });
    }
  };

  _submit = event => {
    event.preventDefault();
    this.setState({ attemptSubmit: true }, () => {
      let errorMessages = [];
      let successMessages = [];
      const country = 'Philippines';
      const { details, registerFleetMember, t } = this.props;
      const { email, firstName: fname, lastName: lname } = this.state;
      registerFleetMember({
        fleet_id: details.fleet_id,
        email,
        fname,
        lname,
        country
      })
        .then(result => {
          if (result) {
            successMessages.push({
              message:
                'A new member has been created. A verification has been sent to his email.'
            });
            this.setState(
              {
                attemptSubmit: false,
                mdlCreation: false,
                successMessages
              },
              this._getUsers
            );
          }
        })
        .catch(error => {
          if (Array.isArray(error)) {
            errorMessages = errorMessages.concat(error);
          } else {
            errorMessages.push({ message: t('translation.generalError') });
          }

          this.setState({ errorMessages, attemptSubmit: false });
        });
    });
  };

  _toggle = () => {
    const { mdlCreation } = this.state;
    this.setState({
      mdlCreation: !mdlCreation,
      email: null,
      firstName: null,
      lastName: null
    });
  };

  render = () => {
    const {
      attemptSubmit,
      email,
      firstName,
      lastName,
      mdlCreation,
      errorMessages,
      isFetchingUsers,
      successMessages,
      users
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            lg="6"
            title="Users"
            subtitle="All"
            className="text-sm-left"
          />
          <Col lg="2" className="my-auto form-group text-right">
            <Button
              onClick={this._toggle}
              className="mr-2"
              size="sm"
              theme="success"
            >
              <i className="material-icons">person_add</i> Add Member
            </Button>
          </Col>
          <Col lg="4" className="d-flex ml-auto my-auto form-group">
            <InputGroup seamless>
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  <i className="material-icons">search</i>
                </InputGroupText>
              </InputGroupAddon>
              <FormInput
                placeholder="Search by name or email"
                onChange={this._handleSearch}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row form>
          <Col lg="12">
            <AlertMessages successMessages={successMessages} />
            <ManageUsersList
              events={{ resendVerification: this._resendVerification }}
              isFetching={isFetchingUsers}
              users={users}
            />
          </Col>
        </Row>
        <CreateFleetMemberModal
          attemptSubmit={attemptSubmit}
          data={{
            email,
            firstName,
            lastName
          }}
          errorMessages={errorMessages}
          events={{
            handleFirstName: this._handleFirstName,
            handleLastName: this._handleLastName,
            handleEmail: this._handleEmail,
            submit: this._submit
          }}
          open={mdlCreation}
          toggle={this._toggle}
        />
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  details: state.profilesReducer.details,
  user: state.authenticationReducer.user,
  users: state.usersReducer.users
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getAccountDetails, getUsers, registerFleetMember, resendVerification }
  )(UsersManagement)
);
