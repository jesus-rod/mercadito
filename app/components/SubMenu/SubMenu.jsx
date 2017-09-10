var React = require('react');
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';

class SubMenu extends React.Component {

    render() {
        return (
            <ContentWrapper>
                <h3> Products
                   <small> Codes </small>
                </h3>
                <Row>
                   <Col lg={12}>
                      <p>A row with content</p>
                   </Col>
                </Row>
            </ContentWrapper>
        );
    }

}

export default SubMenu;
