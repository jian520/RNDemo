/**
 * Created by rplees on 3/8/16.
 */
const React = require('react-native');
const Platform = require('Platform');
const Colors = require('../common/Colors');
const GFDiskCache = require('../utils/GFDiskCache');
const OSCService = require('../service/OSCService');
const CommonComponents = require('../../MEDI/js/common/CommonComponents');
const RepoCell2 = require('../components/repo/RepoCell2');
const OSCRefreshListView = require('../components/OSCRefreshListView');

const {
    View,
    } = React;

const SearchComponent = React.createClass({
    getInitialState() {
        return {
            query:""
        }
    },

    componentWillMount() {
        const route = this.props.route;
        route.sp = this;
    },

    componentWillUnmount() {
        const route = this.props.route;
        route.sp = null;
    },
    onChangeText(text) {
        this.setState({query: text});
    },
    onSubmitEditing(text) {
        this._listview.forceRefresh();
    },

    reloadPath(page = 1) {
        let query = this.state.query;
        if(!query) {
            return Promise.resolve(null);//返回空数据
        }

        return OSCService.searchProjects(query, page);
    },

    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <RepoCell2 key={rowID} repo={rowData} navigator={this.props.navigator}/>
        )
    },

    render() {
        let paddingTop = 64, marginBottom = 49;
        if (Platform.OS == 'android') {
            paddingTop = 64;
            marginBottom = 0;
        }

        return (
            <View style={{flexDirection:"column", flex:1, paddingTop:paddingTop, marginBottom: marginBottom, backgroundColor:Colors.white}}>
                <OSCRefreshListView
                                    ref={(c) => this._listview=c}
                                    renderRow={this.renderRow}
                                    reloadPromise={(page) => this.reloadPath(page)}
                />
            </View>
        );
    }
});
module.exports = SearchComponent;