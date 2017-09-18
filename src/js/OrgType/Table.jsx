import React from 'react';
import CommonTable from '../../components/CommonTable'
import {
    Page,
    Button,
    Table,
    Column,
} from 'epm-ui';

class OrgTypeTable extends CommonTable {
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
                    <Column title="类型名称" dataIndex="orgtypeName" sortable={ true }/>
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

export default OrgTypeTable;