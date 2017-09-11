import React from 'react';
import { Router, Route, Link, History, withRouter } from 'react-router';
import pubsub from 'pubsub-js';
import { Collapse } from 'react-bootstrap';
import SidebarRun from './Sidebar.run';

class Sidebar extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            userBlockCollapse: false,
            collapse: {
                singleview: this.routeActive(['singleview']),
                submenu: this.routeActive(['submenu'])
            }
        };
        this.pubsub_token = pubsub.subscribe('toggleUserblock', () => {
            this.setState({
                userBlockCollapse: !this.state.userBlockCollapse
            });
        });
    };

    componentDidMount() {
        // pass navigator to access router api
        SidebarRun(this.navigator.bind(this));
    }

    navigator(route) {
        this.props.router.push(route)
    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
        pubsub.unsubscribe(this.pubsub_token);
    }

    routeActive(paths) {
        paths = Array.isArray(paths) ? paths : [paths];
        for (let p in paths) {
            if (this.props.router.isActive(paths[p]) === true)
                return true;
        }
        return false;
    }

    toggleItemCollapse(stateName) {
        var newCollapseState = {};
        for (let c in this.state.collapse) {
            if (this.state.collapse[c] === true && c !== stateName)
                this.state.collapse[c] = false;
        }
        this.setState({
            collapse: {
                [stateName]: !this.state.collapse[stateName]
            }
        });
    }

    render() {
        return (
            <aside className='aside'>
                { /* START Sidebar (left) */ }
                <div className="aside-inner">
                    <nav data-sidebar-anyclick-close="" className="sidebar">
                        { /* START sidebar nav */ }
                        <ul className="nav">
                            { /* START user info */ }
                            <li className="has-user-block">
                                <Collapse id="user-block" in={ this.state.userBlockCollapse }>
                                    <div>
                                        <div className="item user-block">
                                            { /* User picture */ }
                                            <div className="user-block-picture">
                                                <div className="user-block-status">
                                                    <img src="img/user/02.jpg" alt="Avatar" width="60" height="60" className="img-thumbnail img-circle" />
                                                    <div className="circle circle-success circle-lg"></div>
                                                </div>
                                            </div>
                                            { /* Name and Job */ }
                                            <div className="user-block-info">
                                                <span className="user-block-name">Hello, Mike</span>
                                                <span className="user-block-role">Designer</span>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </li>
                            { /* END user info */ }
                            { /* Iterates over all sidebar items */ }
                            <li className="nav-heading ">
                                <span data-localize="sidebar.heading.HEADER">Main menu</span>
                            </li>

                            <li className={ this.routeActive('singleview') ? 'active' : '' }>
                                <Link to="singleview" title="Single View">
                                <em className="icon-grid"></em>
                                <span data-localize="sidebar.nav.SINGLEVIEW">Dashboard</span>
                                </Link>
                            </li>

                            <li className={ this.routeActive(['submenu']) ? 'active' : '' }>
                                <div className="nav-item" onClick={ this.toggleItemCollapse.bind(this, 'submenu') }>
                                    <div className="pull-right label label-info">1</div>
                                    <em className="icon-speedometer"></em>
                                    <span data-localize="sidebar.nav.MENU">Productos</span>
                                </div>
                                <Collapse in={ this.state.collapse.submenu } timeout={ 100 }>
                                    <ul id="submenu" className="nav sidebar-subnav">
                                        <li className="sidebar-subnav-header"></li>
                                        <li className={ this.routeActive('submenu') ? 'active' : '' }>
                                            <Link to="submenu" title="Submenu">
                                            <span data-localize="sidebar.nav.SUBMENU">Ventas</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Collapse>
                                
                            </li>
                            <li className={ this.routeActive(['ecommerce-orders', 'ecommerce-order-view', 'ecommerce-products', 'ecommerce-product-view']) ? 'active' : '' }>
                                <div className="nav-item" title="Ecommerce" onClick={ this.toggleItemCollapse.bind(this, 'ecommerce') }>
                                    <em className="icon-basket-loaded"></em>
                                    <span>eCommerce</span>
                                </div>
                                <Collapse in={ this.state.collapse.ecommerce }>
                                    <ul id="" className="nav sidebar-subnav">
                                        <li className="sidebar-subnav-header">eCommerce</li>
                                        <li className={ this.routeActive('ecommerce-orders') ? 'active' : '' }>
                                            <Link to="ecommerce-orders" title="Orders">
                                            <div className="pull-right label label-info">10</div>
                                            <span>Orders</span>
                                            </Link>
                                        </li>
                                        <li className={ this.routeActive('ecommerce-order-view') ? 'active' : '' }>
                                            <Link to="ecommerce-order-view" title="Order View">
                                            <span>Order View</span>
                                            </Link>
                                        </li>
                                        <li className={ this.routeActive('ecommerce-products') ? 'active' : '' }>
                                            <Link to="ecommerce-products" title="Products">
                                            <span>Products</span>
                                            </Link>
                                        </li>
                                        <li className={ this.routeActive('ecommerce-product-view') ? 'active' : '' }>
                                            <Link to="ecommerce-product-view" title="Product View">
                                            <span>Product View</span>
                                            </Link>
                                        </li>
                                        <li className={ this.routeActive('ecommerce-checkout') ? 'active' : '' }>
                                            <Link to="ecommerce-checkout" title="Checkout">
                                            <span>Checkout</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li>
                        </ul>
                        { /* END sidebar nav */ }
                    </nav>
                </div>
                { /* END Sidebar (left) */ }
            </aside>
            );
    }

}

export default withRouter(Sidebar);

