/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require("react-native");
const LoginComponent = require("./components/LoginComponent");
const RootTab = require("./components/RootTab");
const CommonComponents = require("../MEDI/js/common/CommonComponents");
const OSCService = require("./service/OSCService");
const ShakeComponent = require('./components/ShakeComponent');
const codePush = require('react-native-code-push');
const constant = require('./config').constant;
const Toast = require('@remobile/react-native-toast');

const {
    AppRegistry,
    } = React;

const OSCGit = React.createClass({
    getInitialState() {
        return {loading: true}
    },

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    _query() {
        OSCService.getUserFromCache()
            .then(() => {
                this.setState({loading: false});
            });
    },
    componentWillMount() {
        this._query();

        OSCService.addListener('didLogout', () => {
            Toast.showLongBottom("用户登出.");
            this.setState(this.getInitialState());
            this._query();
        });

        const random = this.getRandomInt(1, 10);
        const cpKey = random % 2 == 0 ? constant.code_push_android.STAGING_KEY : constant.code_push_android.PRODUCTION_KEY;
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey:cpKey
        });
    },

    componentDidMount() {

    },

    componentWillUnmount: function() {
        OSCService.removeListener('didLogout');
    },

    render() {
        if(this.state.loading) {
            return CommonComponents.renderLoadingView();
        }

        return  <RootTab />;
    }
});
AppRegistry.registerComponent('OSCGit', () => OSCGit);
