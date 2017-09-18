import React, {Component, PropTypes} from 'react';
import {
    Page,
    Alert,
    fetch,
    Row,
    Container,
    Pagination,
    PagiTable,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    Form,
    FormItem,
    Button,
    Col,
    Divider,
    Table,
    Icon,
    Column,
    context,
    Input,
    Dropdown,
    Select,
    Option,
    TreeSelect,
    DateTimePicker,
    Textarea,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Upload,
} from 'epm-ui';

class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            submitData: "",
            requestPath: `http://127.0.0.1:8080/security/api/userInfo/`,
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.formGetter = this.formGetter.bind(this);
        this.handleValue = this.handleValue.bind(this)


    }

    treeIterator(orgId, tree) {
        var obj = null;
        for (let j = 0; j < tree.length; j++) {
            if (tree[j].id == orgId) {
                // delete tree[j].children;
                obj = tree[j];
                return obj;
            }
            if (tree[j].children != null && tree[j].children.length > 0) {
                obj = this.treeIterator(orgId, tree[j].children);
                if (obj != null) {
                    return obj;
                }
            }
        }
        return obj;
    }

    handleValue() {
        const that = this;
        const data = this.getValue();
        data.email = typeof data.email === 'string' && data.email.length === 0 ? null : data.email;
        data.mobile = typeof data.mobile === 'string' && data.mobile.length === 0 ? null : data.mobile;
        data.roles = typeof data.roles === 'string' && data.roles.length === 0 ? [] : data.roles;
        data.orgs = typeof data.orgs === 'string' && data.orgs.length === 0 ? [] : data.orgs;

        for (let i = 0; i < data.orgs.length; i++) {
            //console.log("data.orgs===>",data.orgs);
            let obj = this.treeIterator(data.orgs[i], this.props.orgData)
            data.orgs.splice(i, 1, obj);

        }
        for (let i = 0; i < data.orgs.length; i++) {
            delete data.orgs[i].name;
            delete data.orgs[i].data;
            delete data.orgs[i].children;
        }
        for (let i = 0; i < data.roles.length; i++) {
            for (let j = 0; j < this.props.roleData.length; j++) {
                if (this.props.roleData[j].roleName == data.roles[i]) {
                    data.roles.splice(i, 1, this.props.roleData[j]);
                    delete this.props.roleData[j].text;
                    delete this.props.roleData[j].value;
                    break;
                }
            }
        }
        console.log("data=============>", data);

        let str = JSON.stringify(data, null, 2);
        console.log(str);
        this.setState({
            submitData: str
        })
        console.log(1112222222221, this.state.submitData);


        const url = this.state.requestPath;
        fetch(url, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data, null, 2),
            headers: {
                "Content-type": "application/json"
            }

        })
            .then((res) => res.json())
            .then(function () {

                that.props.refData();
            })
            .then((responseData) => {
                console.log("responseData=====================");
                console.log(responseData);
                this.setState({
                    visible: false,
                })

                //this.setState({submitData:responseData},()=>{console.log("========");console.log(this.state);this.assignPageData()});
                // console.log("this.state.tableData  ==========  show");
                // console.log(this.state.tableData);

            })
            .then()
            .catch((error) => {
                console.log("Error fetching and parsing data", error);


            });

    }


    handleAdd() {
        this.setState({

            visible: !this.state.visible
        })
    }

    handleClose() {
        console.log(this.state.visible);
        this.setState({
            visible: !this.state.visible,
        })
    }


    formGetter(getter) {
        this.getValue = getter.value;
    }

    handleSelect(node, isSelected, selectedNodes) {
        //  console.log('select', arguments);
    }


    render() {

        const data = [
            {
                'data': {
                    'tid': '1',
                    'text': '1'
                },
                'name': '1',
                'icon': 'fa',
                'expanded': 'true',
                'children': [{
                    'data': {
                        'tid': '1-1',
                        'text': '1-1'
                    },
                    'name': '1-1',
                    'icon': 'flash',
                    'children': [{
                        'data': {
                            'tid': '1-1-1',
                            'text': '1-1-1'
                        },
                        'name': '1-1-1',
                        'icon': 'heart',
                        'checked': true,
                        'children': [{
                            'data': {
                                'tid': '1-1-1-1',
                                'text': '1-1-1-1'
                            },
                            'name': '1-1-1-1'
                        }]
                    },
                        {
                            'data': {
                                'tid': '1-1-2',
                                'text': '1-1-2'
                            },
                            'name': '1-1-2',
                            'selected': 'true',
                            'icon': 'info',
                            'children': [{
                                'data': {
                                    'tid': '1-1-2-1',
                                    'text': '1-1-2-1'
                                },
                                'name': '1-1-2-1'
                            }]
                        }]
                }]
            },
        ];
        return (

            <Page>
                <Container type="fluid">
                    <Divider/>
                    <Button type="info" style={{width: '92px'}} onClick={this.handleAdd}>新增</Button>
                    {
                        this.state.visible ?
                            <Modal visible={ true } onClose={ this.handleClose} size="large">

                                <ModalHeader>
                                    信息
                                </ModalHeader>
                                <ModalBody>
                                    <Form
                                        getter={ this.formGetter }
                                        method="post"
                                        type="horizontal"
                                        async={ true }
                                        onSubmit={ this.handleValue }
                                    >
                                        <Row>
                                            <Col size={12}>

                                                <Row>

                                                    <FormItem type="" name="name" required>
                                                        <Col size={4}>
                                                            <h4>姓名：</h4>
                                                        </Col>
                                                        <Col size={10}>
                                                            <Input name="userName" placeholder="请输入姓名"/>
                                                        </Col>
                                                    </FormItem>
                                                </Row>
                                                <Divider/>
                                                <Row>

                                                    <FormItem type="" name="name" required>
                                                        <Col size={4}>
                                                            <h4>登录名：</h4>
                                                        </Col>
                                                        <Col size={10}>
                                                            <Input name="loginId" placeholder="请输入登录名"/>
                                                        </Col>
                                                    </FormItem>

                                                </Row>
                                                <Divider/>
                                                <Row>

                                                    <FormItem type="" name="name">
                                                        <Col size={4}>
                                                            <h4>密码：</h4>
                                                        </Col>
                                                        <Col size={10}>
                                                            <Input name="passWord" type="password" placeholder="请输入密码"/>
                                                        </Col>
                                                    </FormItem>

                                                </Row>
                                                <Divider/>

                                                <Divider/>
                                                <Row>

                                                    <FormItem type="" name="name">
                                                        <Col size={4}>
                                                            <h4>手机号：</h4>
                                                        </Col>
                                                        <Col size={10}>
                                                            <Input name="mobile" placeholder="请输入手机号"
                                                                   pattern={ /^1\d{10}$/ }/>
                                                        </Col>
                                                    </FormItem>

                                                </Row>
                                                <Divider/>
                                                <Row>

                                                    <FormItem type="" name="name">
                                                        <Col size={4}>
                                                            <h4>邮箱：</h4>
                                                        </Col>
                                                        <Col size={10}>
                                                            <Input name="email" placeholder="请输入 邮箱 地址"
                                                                   pattern={ /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/ }/>
                                                        </Col>
                                                    </FormItem>

                                                </Row>
                                            </Col>
                                            <Col size={12}>
                                                <Row>

                                                    <FormItem type="" name="roles">
                                                        <Col size={4}>
                                                            <h4>角色：</h4>
                                                        </Col>
                                                        <Col size={10}>
                                                            <Select multiple={ true } placeholder="请选择角色"
                                                                    dataSource={ this.props.roleData }/>
                                                        </Col>
                                                    </FormItem>
                                                </Row>
                                                <Row>
                                                    <FormItem type="" name="orgs">
                                                        <Col size={4}>
                                                            <h4>组织机构：</h4>
                                                        </Col>
                                                        <Col size={10}>
                                                            <TreeSelect
                                                                dataSource={ this.props.orgData }
                                                                dataValueMapper={ 'id' }
                                                                checkable={ false }
                                                                placeholder="请选择组织机构"
                                                                multiple={ true }

                                                                onSelect={ this.handleSelect.bind(this) }
                                                            />
                                                        </Col>
                                                    </FormItem>


                                                </Row>
                                                <Row>
                                                    <FormItem type="" name="">
                                                        <Col size={4}>
                                                            <h4>日期：</h4>
                                                        </Col>
                                                        <Col size={10}>
                                                            <DateTimePicker showIcon/>
                                                        </Col>
                                                    </FormItem>


                                                </Row>
                                                <Row>
                                                    <FormItem type="" name="">
                                                        <Col size={4}>
                                                            <h4>日期：</h4>
                                                        </Col>
                                                        <Col size={10}>
                                                            <DateTimePicker showTime={ true }/>
                                                        </Col>
                                                    </FormItem>


                                                </Row>
                                                <Divider/>

                                                <Row>


                                                </Row>
                                            </Col>


                                        </Row>

                                        <Divider/>
                                        <Divider/>
                                        <Divider/>
                                        <Row>
                                            <Col size={19}>

                                                <Row>

                                                    <FormItem type="" name="name">
                                                        <Col size={2} style={{marginLeft: '2%'}}>
                                                            <h4>文本：</h4>
                                                        </Col>
                                                        <Col size={20}>
                                                            <Textarea name="textarea" rows={ 3 }
                                                                      placeholder="风絮飘残已化萍，泥莲刚倩藕私萦"/>
                                                        </Col>
                                                    </FormItem>
                                                </Row>
                                            </Col>
                                        </Row>


                                        <FormItem name="roles" style={{marginLeft: '-9%'}}>

                                            <Label>角色选择：</Label>


                                            <CheckboxGroup name="roles" type="inline">
                                                <Checkbox value="管理员角色">管理员角色</Checkbox>
                                                <Checkbox value="市场管理员">市场管理员</Checkbox>
                                                <Checkbox value="产品管理员">产品管理员</Checkbox>
                                                <Checkbox value="后勤管理员">后勤管理员</Checkbox>
                                                <Checkbox value="产品经理">产品经理</Checkbox>
                                                <Checkbox value="产品研发">产品研发</Checkbox>
                                                <Checkbox value="市场主管">市场主管</Checkbox>
                                                <Checkbox value="市场跑腿儿">市场跑腿儿</Checkbox>
                                            </CheckboxGroup>

                                        </FormItem>
                                        <Divider/>

                                        <Button type="success" htmlType="submit" onClick={this.handleClose}>是</Button>
                                        <Button type="info" onClick={this.handleClose}>否</Button>

                                    </Form>
                                </ModalBody>
                                <ModalFooter>

                                </ModalFooter>

                            </Modal> : null
                    }
                    <Divider/>

                </Container>
            </Page>

        );
    }

}

export default  AddUser;