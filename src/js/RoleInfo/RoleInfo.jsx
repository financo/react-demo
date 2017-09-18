/**
 * Created by Administrator on 2017/9/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Common from '../../components/Common'
import RoleInfoTable from './Table';
import SearchBox from './SearchBox';
import PageController from '../../components/PageController';
import  Add from './Add';
import './RoleInfo.css';
import {
    Divider,
    Row,
    Col,
    Button,
} from 'epm-ui';

class RoleInfo extends Common{
    constructor(props) {
        super(props);
        this.state = {
            sortData: {
                sortAttribute: "",
                sortType: ""
            },
            searchData: {
                roleName: "",
            },
            pageData: {
                page: 0,
                size: 10,
                total: 0
            },
            tableData: {
                content: [],
                last: false,
                totalElements: 0,
                totalPages: 0,
                number: 0,
                size: 10,
                first: false,
                sort:[],
                numberOfElements:1
            },
            status: "list",
            currentData: {},
            orgTypeData: [],
            requestPath: `http://127.0.0.1:8080/security/api/roleInfo/`,
        }

        this.getData();
    }

    handlePage() {
        let originURL = this.state.requestPath;
        let URL = originURL + "?currentPage=" + this.state.pageData.page + "&pageSize=" + this.state.pageData.size;
        if (this.state.sortData.sortAttribute !== "") {
            URL = URL + "&sortAttribute=" + this.state.sortData.sortAttribute;
        }
        if (this.state.sortData.sortType !== "") {
            URL = URL + "&sortType=" + this.state.sortData.sortType;
        }
        if (this.state.searchData.orgName !== ""){
            URL = URL + "&roleName=" + this.state.searchData.roleName;
        }
        this.state.requestPath = URL;
        this.getData();
        this.state.requestPath = originURL;

    }

    render(){
        if (this.state.status === "add"){
            return (
                <Add handleAddDone={this.handleAddDone.bind(this)}
                     handleUpdateDone={this.handleUpdateDone.bind(this)}
                     handleCancel={this.handleCancel.bind(this)}/>
            );
        }else if (this.state.status === "update"){
            return (
                <Add currentData={ this.state.currentData}
                     handleAddDone={this.handleAddDone.bind(this)}
                     handleUpdateDone={this.handleUpdateDone.bind(this)}
                     handleCancel={this.handleCancel.bind(this)}/>
            );
        }else {
            return (
                <div className="app">
                    <div className="rightWrap">
                        <div className="box-title">
                            <h4 style={{'fontWeight': 'bold'}}>角色列表</h4>
                        </div>
                        <div className="right-box">
                            <Row>
                                <Col size={20}>
                                    <SearchBox searchData={this.state.searchData}
                                               receiveSearchData={this.receiveSearchData.bind(this)}/>
                                </Col >
                                <Col size={4}>
                                    <Button onClick={this.handleAdd.bind(this)}>新增</Button>
                                </Col>
                            </Row>
                            <Divider/>
                            <RoleInfoTable tableData={this.state.tableData.content}
                                          receiveSortData={this.receiveSortData.bind(this)}
                                          handleUpdate={this.handleUpdate.bind(this)}
                                          handleDelete={this.handleDelete.bind(this)}/>
                            <Divider/>
                            <PageController pageData={this.state.pageData}
                                            receivePageData={this.receivePageData.bind(this)}/>
                        </div>
                    </div>
                </div>
            )
        }
    };
}

ReactDOM.render(<RoleInfo/>, document.getElementById('root'));