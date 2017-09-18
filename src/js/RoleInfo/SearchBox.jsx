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
    Input,
} from 'epm-ui';

class SearchBox extends CommonSearchBox {
    constructor(props) {
        super(props);
        this.state = {
            roleName: "",
        };
        this.handleRoleNameChange = this.handleRoleNameChange.bind(this);
    }

    handleRoleNameChange(data) {
        this.setState({"roleName": data});
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
                                    <Label style={{color: '#67696a'}}>角色名称：</Label>
                                    <Input type="text" value={this.props.searchData.roleName} placeholder="请输入角色名"
                                           onChange={this.handleRoleNameChange.bind(this)}/>
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