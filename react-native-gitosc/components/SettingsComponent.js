/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const DXRNUtils = require('../utils/DXRNUtils');
const GFDiskCache = require('../utils/GFDiskCache');
const OSCService = require('../service/OSCService');
const CommonComponents = require('../../MEDI/js/common/CommonComponents');
const SettingsCell = require('../common/SettingsCell');
const CommonStyles = require('../common/CommonStyles');
const constant = require('../config').constant;
const Toast = require('@remobile/react-native-toast');
const Share = require('react-native-share');

const {
    TouchableHighlight,
    ActionSheetIOS,
    Text,
    View,
    Alert,
    ScrollView
    } = React;

const SettingComponent = React.createClass({
    PropTypes: {},
    getInitialState() {
        return {
            cachedSize:0,
            appVersion: "",
        }
    },
    componentWillMount() {
        GFDiskCache.getDiskCacheCost((size) => {
            this.setState({
                cachedSize: size,
            });
        });

        DXRNUtils.appInfo((appInfo) => {
            this.setState({
                appVersion: appInfo.appVersion,
            });
        });
    },

    onShare() {
        let message = '分享这款ReactNative OSCGit客户端,开源的.';
        let url = 'https://github.com/rplees/react-native-gitosc';
        Share.open({
            share_text: message,
            share_URL:url,
            title:'Share RNGit@OSC'
        }, (e) => {
            console.log(e);
        });
        if (Platform.OS === 'android') {//TODO:android分享
            //ActivityView.show({
            //    text: message,
            //    url: url,
            //    imageUrl: 'http://git.oschina.net/uploads/71/95171_rplees.jpeg?1459482338',
            //});
        } else {
            //ActionSheetIOS.showShareActionSheetWithOptions({
            //        message: message,
            //        url: url,
            //    },
            //    () => {},
            //    () => {});
        }
    },

    clearCache() {
        GFDiskCache.clearDiskCache((size) => {
            Toast.showLongBottom("已经清空缓存:" + GFDiskCache.bytesToSize(size));
            this.setState({
                cachedSize: this.state.cachedSize - size,
            })
        });
    },

    render() {
        let currentVersion = "分享这款App! v: " + this.state.appVersion;
        let cachedSize = '清空缓存, 当前: ' + GFDiskCache.bytesToSize(this.state.cachedSize);

        let paddingTop = 64;
        if (Platform.OS == 'android') {
            paddingTop = 64;
        }
        return (
            <View style={{flexDirection:"column", flex:1, paddingTop:paddingTop, backgroundColor:Colors.backGray}}>
                <ScrollView>
                    <SettingsCell
                        style={{marginTop:20, marginBottom:20}}
                        iconName={'quote-left'}
                        iconColor={Colors.blue}
                        settingName={"摇一摇"}
                        onPress = {() => {
                            this.props.navigator.push({id: constant.scene.shake.key});
                        }}
                    />

                    <SettingsCell
                        iconName={'trash'}
                        iconColor={Colors.blue}
                        settingName={cachedSize}
                        onPress={this.clearCache} />

                    <SettingsCell
                        iconName={'share'}
                        iconColor={Colors.blue}
                        settingName={currentVersion}
                        onPress = {this.onShare}
                    />

                    <SettingsCell
                        iconName={'comment'}
                        iconColor={Colors.blue}
                        settingName={"意见反馈"}
                        onPress = {() => {
                            this.props.navigator.push({id: constant.scene.feedback.key});
                        }}
                    />

                    <SettingsCell
                        iconName={'info'}
                        iconColor={Colors.blue}
                        settingName={"关于作者"}
                        onPress = {() => {
                            this.props.navigator.push({id: constant.scene.personal.key, obj:
                                     {"name":"rplees","username":"rplees","id":95171}
                                });
                        }}
                    />

                    <TouchableHighlight style={[CommonStyles.btn, {backgroundColor:Colors.red,borderColor:Colors.red}]}
                                        onPress={() => {
                                            Alert.alert(
                                                "确认操作",
                                                '确定要退出登陆么?',
                                                [
                                                    {text:"确定", onPress: function(){ OSCService.logout(); }},
                                                    {text:"不了", onPress: function(){}},
                                                ]
                                            );
                                        }}
                                        underlayColor={Colors.backGray}
                    >
                        <Text style={[{color: Colors.white, fontWeight: "bold",textAlign:"center"}]}> 注销登陆 </Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
});
module.exports = SettingComponent;