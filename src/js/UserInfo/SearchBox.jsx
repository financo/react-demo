import React, {Component, PropTypes} from 'react';
import CommonSearchBox from '../../components/CommonSearchBox'
import {
    Page,
    Row,
    Container,
    Label,
    Form,
    FormItem,
    Button,
    Col,
    Divider,
    Input,
    Select,
    TreeSelect,

} from 'epm-ui';

class SearchBox extends CommonSearchBox {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            loginId: "",
            org: "",
            role: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLoginIdChange = this.handleLoginIdChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    handleNameChange(data) {
        this.setState({"name": data});
    }

    handleLoginIdChange(data) {
        this.setState({"loginId": data});
    }

    handleRoleChange(data) {
        this.setState({"role": data});
    }

    handleSelect(node, isSelected, selectedNodes, event) {
        this.setState({"org": node.name});
    }

    render() {
        const roleData = this.props.roleData;
        roleData.id = roleData.roleName;
        return (
            <Page>
                <Container type="fluid">
                    <Divider/>
                    <Row>
                        <Col size={20}>
                            <Form type="inline" action="#">
                                <Row>
                                </Row>
                                <FormItem>
                                    <Label>登录名：</Label>
                                    <Input type="text" value={this.props.searchData.loginId} placeholder="请输入登录名"
                                           onChange={this.handleLoginIdChange}/>
                                </FormItem>
                                <FormItem>
                                    <Label style={{color: '#67696a'}}>姓名：</Label>
                                    <Input type="text" value={this.props.searchData.name} placeholder="请输入姓名"
                                           onChange={this.handleNameChange}/>
                                </FormItem>
                                <FormItem>
                                    <Label>角色：</Label>
                                    <Select placeholder="请选择角色" dataSource={  this.props.roleData }
                                            onChange={this.handleRoleChange} />
                                </FormItem>
                                <FormItem name="treeselect">
                                    <Label>组织机构：</Label>
                                    <TreeSelect
                                        dataSource={ this.props.orgData }
                                        dataValueMapper={ 'id' }
                                        checkable={ false }
                                        placeholder="请选择组织机构"
                                        onSelect={this.handleSelect.bind(this)}
                                    />
                                </FormItem>
                            </Form>
                        </Col>
                        <Col size={2}>
                            <Button type="info" style={{width: '92px'}} onClick={this.handleSubmit}>查询</Button>
                        </Col>
                    </Row>
                    <Divider fitted/>
                </Container>
            </Page>
        );
    }
}

export default  SearchBox;