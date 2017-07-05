/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Routes = require('../components/Routes');
const Ionicons = require('react-native-vector-icons/Ionicons');
const constant = require('../config').constant;

const TabBarDic = [constant.scene.project.key, constant.scene.famous.key, constant.scene.personal.key];//
const {
    TabBarIOS
    } = React;

const RootTab = React.createClass({
    getInitialState() {
        return {
            selectedTab:TabBarDic[0],
        }
    },
    componentDidMount() {
    },
    render() {
        let cp = TabBarDic.map((v, i) => {
            var routeCfg = Routes.getRouteCfg(v);

            return <Ionicons.TabBarItem
                key={'iconTabBarItem_' + v}
                iconName={routeCfg.iconName}
                selectedIconName={routeCfg.selectedIconName}
                title={routeCfg.tabName}
                selected={this.state.selectedTab === v}
                onPress={() => {
                    this.setState({
                      selectedTab: v,
                    });

                    //Pop to the first scene in the stack, unmounting every other scene
                    this.refs["navigator_" + v] && this.refs["navigator_" + v].popToTop();
                  }}>
                {Routes.navigator(v)}
            </Ionicons.TabBarItem>
            }
        );
        return <TabBarIOS>{cp}</TabBarIOS>
    }
});
module.exports = RootTab;