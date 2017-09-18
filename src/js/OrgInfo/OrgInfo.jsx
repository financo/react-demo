/**
 * Created by Administrator on 2017/9/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Common from '../../components/Common'
import OrgInfoTable from './Table';
import SearchBox from './SearchBox';
import PageController from '../../components/PageController';
import  Add from './Add';
import './OrgInfo.css';
import {
    Divider,
    Row,
    Col,
    Button,
} from 'epm-ui';

class OrgInfo extends Common{
    constructor(props) {
        super(props);
        this.state = {
            sortData: {
                sortAttribute: "",
                sortType: ""
            },
            searchData: {
                orgName: "",
                orgtypeName: "",
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
            requestPath: `http://127.0.0.1:8080/security/api/orgInfo/`,
        }

        this.getData();
        this.getOrgTypeData();
    }

    getOrgTypeData(){
        const url = "http://127.0.0.1:8080/security/api/orgTypes";   //获取组织机构的数据
        let orgType = [];
        fetch(url, {
            mode: 'cors',
            method: 'GET'
        })
            .then((res) => res.json())
            .then((responseData) => {
                for (let i = 0; i < responseData.length; i++) {
                    let obj = new Object();
                    obj.value = responseData[i].orgtypeName;
                    obj.text = responseData[i].orgtypeName;
                    obj.orgtypeName = responseData[i].orgtypeName;
                    obj.id = responseData[i].id;

                    orgType.push(obj);
                }
                this.setState({orgTypeData: orgType});
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
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
            URL = URL + "&orgName=" + this.state.searchData.orgName;
        }
        if (this.state.searchData.orgtypeName !== ""){
            URL = URL + "&orgType.orgtypeName=" + this.state.searchData.orgtypeName;
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
                     handleCancel={this.handleCancel.bind(this)}
                     orginfoData={this.state.orginfoData}
                     roleinfoData={this.state.roleinfoData}
                     sexData={this.state.sexData}/>
            );
        }else if (this.state.status === "update"){
            return (
                <Add currentData={ this.state.currentData}
                     handleAddDone={this.handleAddDone.bind(this)}
                     handleUpdateDone={this.handleUpdateDone.bind(this)}
                     handleCancel={this.handleCancel.bind(this)}
                     orginfoData={this.state.orginfoData}
                     roleinfoData={this.state.roleinfoData}
                     sexData={this.state.sexData}/>
            );
        }else {
            return (
                <div className="app">
                    <div className="rightWrap">
                        <div className="box-title">
                            <h4 style={{'fontWeight': 'bold'}}>组织机构列表</h4>
                        </div>
                        <div className="right-box">
                            <Row>
                                <Col size={20}>
                                    <SearchBox searchData={this.state.searchData}
                                               orgTypeData={this.state.orgTypeData}
                                               receiveSearchData={this.receiveSearchData.bind(this)}/>
                                </Col >
                                <Col size={4}>
                                    <Button onClick={this.handleAdd.bind(this)}>新增</Button>
                                </Col>
                            </Row>
                            <Divider/>
                            <OrgInfoTable tableData={this.state.tableData.content}
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

ReactDOM.render(<OrgInfo/>, document.getElementById('root'));