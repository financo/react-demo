import React from 'react';
import CommonSearchBox from '../../components/CommonSearchBox'
import {
    Page,
    Row,
    Container,
    Button,
    Col,
    Divider,
} from 'epm-ui';

class SearchBox extends CommonSearchBox {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Page>
                <Container type="fluid">
                    <Divider/>
                    <Row>
                        <Col size={20}>

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