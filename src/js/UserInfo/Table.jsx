import React, {Component} from 'react';
import CommonTable from '../../components/CommonTable'
import {
    Page,
    Table,
    Column,
    Button,
} from 'epm-ui';
import './Table.css';

class UserinfoTable extends CommonTable {
    constructor(props) {
        super(props);
        this.state = {
            sortData: {
                sortAttribute: "",
                sortType: ""
            },
        };
    }

    render() {
        return (
            <Page>
                <Table
                    dataSource={ this.props.tableData } selectable
                    style={{'borderLeft': '1px #DDD solid', 'borderRight': '1px #DDD solid'}}
                    bordered={ true }
                    headBolder={ true }
                    striped={ true }
                    bodyHeight={ '200px' }
                    onSort={ this.handleSort.bind(this) }
                >
                    <Column title="姓名" dataIndex="userName" sortable={ true }/>
                    <Column title="登录名" dataIndex="loginId" sortable={ true }/>
                    <Column title="角色" >
                        {
                            (rowData) => {
                                let temp = rowData.roles;
                                let rolenames="";
                                for (let i=0; i < temp.length; i++) {
                                    rolenames = rolenames + temp[i].roleName + ",";
                                }
                                return rolenames.substring(0, rolenames.length-1);
                            }
                        }
                    </Column>
                    <Column title="组织机构">
                        {
                            (rowData) => {
                                let temp = rowData.orgs;
                                let orgnames="";
                                for (let i=0; i < temp.length; i++) {
                                    orgnames = orgnames + temp[i].orgName + ",";
                                }
                                return orgnames.substring(0, orgnames.length-1);
                            }
                        }
                    </Column>
                    <Column title="邮箱" dataIndex="email"/>
                    <Column title="操作">
                        {(value, index, rowData) =>
                            <div>
                                <Button type="primary"
                                        onClick={this.handleUpdate.bind(this, rowData)}>修改</Button>
                                <Button type="info" onClick={this.handleDelete.bind(this, rowData)}>删除</Button>
                            </div>
                        }
                    </Column>
                </Table>
            </Page>
        )
    }
}

export default UserinfoTable;