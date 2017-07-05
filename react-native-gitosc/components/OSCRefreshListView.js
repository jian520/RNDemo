const React = require('react-native');
const L = require('../utils/Log');
const CommonComponents = require('../../MEDI/js/common/CommonComponents');
const RefreshListView = require('../common/RefreshListView');
const PropTypes = React.PropTypes;
const OSCService = require('../service/OSCService');
const ErrorPlacehoderComponent = require('../common/ErrorPlacehoderComponent');
const Platform = require('Platform');

const {
    StyleSheet,
    Text,
    View,
    } = React;

const LISTVIEW_REF = 'listview';
const OSCRefreshListView = React.createClass({
    propTypes: {
        renderRow: PropTypes.func,
        reloadPromise: PropTypes.func,
        renderErrorPlaceholder: PropTypes.func,
    },
    getInitialState() {
        return {lastError: {isReloadError: false, noData:false, error: ""}};
    },

    listViewOnRefresh(page, callback) {
        this.props.reloadPromise(page)
            .then(data => {
                if(data == null) {
                    this.setState({lastError: {noData: true}});
                } else {
                    let pageSize = this.props.pageSize || 20;
                    if(data && data.length > pageSize) {//有可能每页显示数量跟服务器返回的不同
                        L.warn("服务器返回的数据{}长度大于设置的值{},请检查.", data.length, pageSize);
                    }
                    let allLoaded = data && (data.length < pageSize);
                    callback(data, {allLoaded: allLoaded});
                }
            })
            .catch(err => {
                this.setState({lastError: {isReloadError: true, error: err.message}});
            });
    },
    forceRefresh() {
        if(this.refs[LISTVIEW_REF]) {
            this.refs[LISTVIEW_REF].forceRefresh();
        } else {
            this.setState({lastError: {isReloadError: false, noData: false, error: ""}});
        }
    },

    render() {
        if (this.state.lastError.isReloadError) {
            const error = this.state.lastError.error;
            if (this.props.renderErrorPlaceholder) {
                return this.props.renderErrorPlaceholder(error);
            } else {
                return CommonComponents.errorPlaceholder(error, 'Oops, tap to reload', () => {
                    this.setState({lastError: {isReloadError: false, error: ""}});
                });
            }
        } else if(this.state.lastError.noData) {
            return <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                          }}>
                <Text style={{
                        fontSize: 18,
                        fontWeight: '500',
                        marginBottom: 10,
                      }}>
                    No Data
                </Text>
            </View>;
        } else {
            return <RefreshListView renderRow={this.renderRow}
                                    ref={LISTVIEW_REF}
                                    onRefresh={(page, callback) => this.listViewOnRefresh(page, callback)}
                                    style={styles.listview}
                {...this.props}
            />
        }
    }

});

var styles = StyleSheet.create({
    listview: {

    },
});

module.exports = OSCRefreshListView;