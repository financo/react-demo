/**
 * Created by Administrator on 2017/9/6.
 */
import React, {Component} from 'react';
import 'epm-ui-css/dist/css/epm-ui.css';

class Common extends Component {

    constructor(props){
        super(props);
    }

    //用于获取数据
    getData() {
        const url = this.state.requestPath;
        fetch(url, {
            mode: 'cors',
            method: 'GET'
        })
            .then((res) => res.json())
            .then((responseData) => {
                this.setState({tableData: responseData}, () => {
                    this.assignPageData();
                });
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
    }

    deleteData(id) {
        let url = this.state.requestPath;
        if (!url.endsWith("/")){
            url = url +"/"+id;
        }else {
            url = url +id;
        }
        fetch(url, {
            mode: 'cors',
            method: 'DELETE'
        })
        //.then((res) => res.json())
            .then((responseData) => {
                this.getData();
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
    }

    updateData(data, id) {
        let url = this.state.requestPath;
        if (!url.endsWith("/")){
            url = url +"/"+id;
        }else {
            url = url +id;
        }
        fetch(url, {
            mode: 'cors',
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((responseData) => {
                this.getData();
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
    }

    postData(data) {
        let url = this.state.requestPath;
        fetch(url, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((responseData) => {
                this.getData();
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
    }

    //提取网络请求返回数据的分页信息，并将其放入pageData当中
    assignPageData() {
        this.setState({
            "pageData": {
                page: this.state.tableData.number,
                size: this.state.tableData.size,
                total: this.state.tableData.totalElements
            }
        });
    }

    //接收table组件中传来的排序信息
    receiveSortData(sortData) {
        if (sortData.sortAttribute !== this.state.sortData.sortAttribute
            || sortData.sortType !== this.state.sortData.sortType
        ) {
            let nextData = {
                page: 0,
                size: 10,
                total: 0
            };
            this.setState({"pageData": nextData})
        }
        this.setState({"sortData": sortData}, () => {
            this.handlePage()
        });
    }

    //接收searchBox组件中传来的条件查询信息
    receiveSearchData(searchData) {
        let nextData = {
            page: 0,
            size: 10,
            total: 0
        };
        this.setState({"pageData": nextData});
        this.setState({"searchData": searchData}, () => {
            this.handlePage()
        });
    }

    //接收pageController组件中传来的分页信息，用于分页查询参数
    receivePageData(index, size) {
        let nextData = {
            page: index,
            size: size,
            total: this.state.pageData.total
        };
        this.setState({"pageData": nextData}, () => {
            this.handlePage()
        })
    }

    //控制翻页
    handlePage() {
        let originURL = this.state.requestPath;
        let URL = originURL + "?currentPage=" + this.state.pageData.page + "&pageSize=" + this.state.pageData.size;
        if (this.state.sortData.sortAttribute !== "") {
            URL = URL + "&sortAttribute=" + this.state.sortData.sortAttribute;
        }
        if (this.state.sortData.sortType !== "") {
            URL = URL + "&sortType=" + this.state.sortData.sortType;
        }
        this.state.requestPath = URL;
        this.getData();
        this.state.requestPath = originURL;

    }

    //此方法用于将数据转换成树，array是传入数组，parentField是数组中对象的父属性名，例如：角色中roleInfo属性指向父角色
    arrayToTree(array, parentField) {
        //array数组中的元素添加子元素集合
        for (let i = 0; i < array.length; i++) {
            array[i].children = [];
        }
        //将array数组调整成树状结构
        for (let i = array.length - 1; i >= 0; i--) {
            let temp = array[i];
            if (Object.getOwnPropertyDescriptor(array[i], parentField).value != null) {
                array.splice(i, 1, {});
                if (!this.recursion(array, temp, parentField)) {
                    array.splice(i, 1, temp);
                }
            }
        }
        //删除树状结构中的空元素
        for (let i = array.length - 1; i >= 0; i--) {
            if (JSON.stringify(array[i]) === "{}") {
                array.splice(i, 1);
            }
        }
        return array;
    }

    recursion(array, treeNode, parentField) {
        let flag = false;
        for (let i = array.length - 1; i >= 0; i--) {
            if (JSON.stringify(array[i]) !== "{}") {
                //若找到treeNode的父节点，则插入其父节点的children数组
                if (Object.getOwnPropertyDescriptor(treeNode, parentField).value.id === array[i].id) {
                    array[i].children.push(treeNode);
                    flag = true;
                    continue;
                }
                if (array[i].children.length > 0) {
                    if (this.recursion(array[i].children, treeNode, parentField)) {
                        flag = true;
                    }
                }
            }
        }
        return flag;
    }

    //点击更新时，调用本方法。用于获取被点击行的数据，将其写入state，并将当前页面切换到修改组件
    handleUpdate(data){
        this.setState({currentData: data},()=>{
            this.setState({status: "update"});
        });
    }

    //点击新增时触发，并将当前页面切换到新增组件
    handleAdd(){
        this.setState({status: "add"});
    }

    //点击删除时触发，获取被点击行的id值，调用删除接口，最后将页面切回列表展示
    handleDelete(id){
        this.deleteData(id);
        this.setState({status: "list"});
    }

    //新增保存时触发
    handleAddDone(data){
        this.postData(data);
        this.setState({status: "list"});
    }

    //修改保存时触发
    handleUpdateDone(data, id){
        this.updateData(data, id);
        this.setState({status: "list"});
    }

    //取消新增或修改时触发
    handleCancel(){
        this.setStatus({status: "list"});
    }
}

export default Common;