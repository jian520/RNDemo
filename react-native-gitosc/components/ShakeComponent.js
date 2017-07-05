/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const DXRNUtils = require('../utils/DXRNUtils');
const OSCService = require('../service/OSCService');
const RNShakeEventIOS = require('react-native-shake-event-ios');
const FontAwesome = require('react-native-vector-icons/FontAwesome');
const RepoCell2 = require('../components/repo/RepoCell2');
const Dimensions = require('Dimensions');
const Toast = require('@remobile/react-native-toast');

const {
    View,
    Alert,
    } = React;

const ShakeComponent = React.createClass({
    PropTypes: {},
    getInitialState() {
        return {repo: null}
    },
    componentWillMount() {
        RNShakeEventIOS.addEventListener('shake', () => {
            console.log('Device shake!');
            Toast.showLongBottom("摇摇更健康.");
            this._do();
        });
    },

    _do() {
        OSCService.getRandomProject()
            .then(repo => {
                this.setState({repo: repo});
            }).catch(err => {
                Alert.alert("Oops", "摇一摇获取数据异常[" + err + "],请重试.");
            });
    },

    componentWillUnmount() {
        RNShakeEventIOS.removeEventListener('shake');
    },

    render() {
        let paddingTop = 64, marginBottom = 54;
        if (Platform.OS == 'android') {
            paddingTop = 64;
            marginBottom = 6;
        }
        let cp;
        if(this.state.repo) {
            cp = (<View style={{width:Dimensions.get('window').width, backgroundColor:Colors.lightGray, marginBottom:marginBottom, borderRadius:8}}>
                    <RepoCell2  repo={this.state.repo} navigator={this.props.navigator}/>
                </View>);
        }
        return (
            <View style={{flex:1, marginTop:paddingTop,alignItems:"center",flexDirection:"column"}}>
                    <FontAwesome style={{flex:1}}
                        name={'search'}
                        size={100}
                        color={Colors.textGray}
                        onPress={this._do}
                    />
                {cp}
            </View>
        );
    }
});
module.exports = ShakeComponent;