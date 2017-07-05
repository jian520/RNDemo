/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Routes = require('../components/Routes');
const constant = require('../config').constant;
const ScrollableTabView = require('react-native-scrollable-tab-view');
const TabBar = require('./TabBar.android');
const TabBarDic = [constant.scene.project.key, constant.scene.famous.key, constant.scene.personal.key];//
const {
    View,
    } = React;

const RootTab = React.createClass({
    getInitialState() {
        return {
            selectedTab:0,
        }
    },
    componentDidMount() {
    },
    render() {
        let cp = TabBarDic.map((v, i) => Routes.navigator(v));

        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <ScrollableTabView
                    renderTabBar={() => <TabBar />}
                    initialPage = {this.state.selectedTab}
                    tabBarPosition={'bottom'}
                >
                    {cp}
                </ScrollableTabView>
            </View>
        )
    }
});
module.exports = RootTab;