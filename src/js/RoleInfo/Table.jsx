import React, {Component} from 'react';
import CommonTable from '../../components/CommonTable'
import {
    Page,
    Button,
    Table,
    Column,
} from 'epm-ui';

class RoleTypeTable extends CommonTable {
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
                    <Column title="编码" dataIndex="id" sortable={ true }/>
                    <Column title="角色名称" dataIndex="roleCode" sortable={ true }/>
                    <Column title="角色编码" dataIndex="roleName" sortable={ true }/>
                    <Column title="上级角色">
                        {
                            (rowData) => {
                                return rowData.roleInfo === null?"":rowData.roleInfo.roleName;
                            }
                        }
                    </Column>
                    <Column title="创建时间">
                        {
                            (rowDate)=>{
                                return JSON.stringify(new Date(rowDate.createTime))
                            }
                        }
                    </Column>
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
                <br />
                您选择的是：<span style={ {color: 'red'} }>{ this.state.data }</span>
            </Page>
        )
    }
}

export default RoleTypeTable;