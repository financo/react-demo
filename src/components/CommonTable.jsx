/**
 * Created by Administrator on 2017/9/6.
 */
import React, {Component} from 'react';
import 'epm-ui-css/dist/css/epm-ui.css';

class CommonTable extends Component {
    handleSort(dataIndex, sortFlag) {
        this.setState({
            "sortData": {
                sortAttribute: dataIndex,
                sortType: sortFlag
            }
        }, () => {
            this.props.receiveSortData(this.state.sortData);
        });

    }

    handleUpdate(rowData){
        this.props.handleUpdate(rowData);
    }

    handleDelete(rowData) {
        let id = rowData.id;
        this.props.handleDelete(id);
    }
}

export default CommonTable;