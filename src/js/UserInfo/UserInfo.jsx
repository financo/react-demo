import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Common from '../../components/Common'
import './UserInfo.css';
import UserInfoTable from './Table';
import  SearchBox from './SearchBox';
import  Add from './Add';
import PageController from '../../components/PageController'
import {
    Divider,
    Row,
    Col,
    fetch,
    Button
} from 'epm-ui';

class UserInfo extends Common {
    constructor(props) {
        super(props);
        this.state = {
            sortData: {
                sortAttribute: "",
                sortType: ""
            },
            searchData: {
                name: "",
                loginId: "",
                org: "",
                role: ""
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
                first: false
            },
            status: "list",
            currentData: {},
            roleInfoData: [],
            orgInfoData: [],
            sexData: [],
            requestPath: `http://127.0.0.1:8080/security/api/userInfo/`,
        };

        this.getData();
        this.getRoleInfoData();
        this.getOrgInfoData();
        this.getSexData();
    }

    getRoleInfoData() {
        const url = "http://127.0.0.1:8080/security/api/roleInfos";   //获取角色的数据
        let role = [];
        fetch(url, {
            mode: 'cors',
            method: 'GET'
        })
            .then((res) => res.json())
            .then((responseData) => {
                for (let i = 0; i < responseData.length; i++) {
                    let obj = new Object();
                    obj.value = responseData[i].roleName;
                    obj.text = responseData[i].roleName;
                    obj.roleCode = responseData[i].roleCode;
                    obj.createTime = responseData[i].createTime;
                    obj.creatUser = responseData[i].creatUser;
                    obj.roleInfo = responseData[i].roleInfo;
                    obj.roleName = responseData[i].roleName;
                    obj.id = responseData[i].id;

                    role.push(obj);
                }
                this.setState({roleInfoData: role});
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
    }

    getOrgInfoData() {
        const url = "http://127.0.0.1:8080/security/api/orgInfos";   //获取组织机构的数据
        fetch(url, {
            mode: 'cors',
            method: 'GET'
        })
            .then((res) => res.json())
            .then((responseData) => {
                const tree = this.arrayToTree(responseData, "orgInfo");
                const formatData = this.formatData(tree);
                this.setState({orgInfoData: tree});
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
    }

    getSexData(){
        const url = "http://127.0.0.1:8080/security/api/sexs";   //获取性别的数据
        fetch(url, {
            mode: 'cors',
            method: 'GET'
        })
            .then((res) => res.json())
            .then((responseData) => {
                this.setState({sexData: responseData});
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
    }

    formatData(tree) {
        for (let i = tree.length - 1; i >= 0; i--) {
            tree[i].name = tree[i].orgName;
            tree[i].data = {"id": tree[i].id, "text": tree[i].orgName, "tid": tree[i].id};
            if (tree[i].children.length > 0) {
                this.formatData(tree[i].children);
            } else {
                delete tree[i].children;
            }
        }
        return tree;
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
        if (this.state.searchData.name !== "") {
            URL = URL + "&userName=" + this.state.searchData.name;
        }
        if (this.state.searchData.loginId !== "") {
            URL = URL + "&loginId=" + this.state.searchData.loginId;
        }
        if (this.state.searchData.role !== "") {
            URL = URL + "&roles[0].roleName=" + this.state.searchData.role;
        }
        if (this.state.searchData.org !== "") {
            URL = URL + "&orgs[0].orgName=" + this.state.searchData.org;
        }
        this.state.requestPath = URL;
        this.getData();
        this.state.requestPath = originURL;

    }

    render() {
        if (this.state.status === "add"){
            return (
                <Add handleAddDone={this.handleAddDone.bind(this)}
                     handleUpdateDone={this.handleUpdateDone.bind(this)}
                     handleCancel={this.handleCancel.bind(this)}
                     orginfoData={this.state.orgInfoData}
                     roleinfoData={this.state.roleInfoData}
                     sexData={this.state.sexData}/>
            );
        }else if (this.state.status === "update"){
            return (
                <Add currentData={ this.state.currentData}
                     handleAddDone={this.handleAddDone.bind(this)}
                     handleUpdateDone={this.handleUpdateDone.bind(this)}
                     handleCancel={this.handleCancel.bind(this)}
                     orginfoData={this.state.orgInfoData}
                     roleinfoData={this.state.roleInfoData}
                     sexData={this.state.sexData}/>
            );
        }else{
            return (
                <div className="app">
                    <div className="rightWrap">
                        <div className="box-title">
                            <h4 style={{'fontWeight': 'bold'}}>用户列表</h4>
                        </div>
                        <div className="right-box">
                            <Row>
                                <Col size={20}>
                                    <SearchBox searchData={this.state.searchData}
                                               receiveSearchData={this.receiveSearchData.bind(this)}
                                               orgData={this.state.orgInfoData}
                                               roleData={this.state.roleInfoData}/>
                                </Col >
                                <Col size={4}>
                                    <Button onClick={this.handleAdd.bind(this)}>新增</Button>
                                </Col>
                            </Row>
                            <Divider/>
                            <UserInfoTable tableData={this.state.tableData.content}
                                           receiveSortData={this.receiveSortData.bind(this)}
                                           handleUpdate={this.handleUpdate.bind(this)}
                                           handleDelete={this.handleDelete.bind(this)}/>
                            <Divider/>
                            <PageController pageData={this.state.pageData}
                                            receivePageData={this.receivePageData.bind(this)}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

ReactDOM.render(<UserInfo />, document.getElementById('root'));