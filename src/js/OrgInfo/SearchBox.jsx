import React from 'react';
import CommonSearchBox from '../../components/CommonSearchBox'
import {
    Page,
    Row,
    Container,
    Button,
    Col,
    Divider,
    Form,
    FormItem,
    Label,
    Select,
    Input,
} from 'epm-ui';

class SearchBox extends CommonSearchBox {
    constructor(props) {
        super(props);
        this.state = {
            orgName: "",
            orgtypeName: "",
        };
        this.handleOrgNameChange = this.handleOrgNameChange.bind(this);
        this.handleOrgTypeNameChange = this.handleOrgTypeNameChange.bind(this);
    }

    handleOrgNameChange(data) {
        this.setState({"orgName": data});
    }

    handleOrgTypeNameChange(data) {
        this.setState({"orgtypeName": data});
    }

    render() {
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
                                    <Label>机构类型：</Label>
                                    <Select placeholder="请选择" dataSource={  this.props.orgTypeData }
                                            onChange={this.handleOrgTypeNameChange.bind(this)} />
                                </FormItem>
                                <FormItem>
                                    <Label style={{color: '#67696a'}}>机构名称：</Label>
                                    <Input type="text" value={this.props.searchData.orgName} placeholder="请输入组织机构名"
                                           onChange={this.handleOrgNameChange.bind(this)}/>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col size={2}>
                            <Button type="info" style={{width: '92px'}} onClick={this.handleSubmit.bind(this)}>查询</Button>
                        </Col>
                    </Row>
                    <Divider fitted/>
                </Container>
            </Page>
        );
    }
}

export default  SearchBox;