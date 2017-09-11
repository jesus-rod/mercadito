/*!
 *
 * Angle - Bootstrap Admin App + ReactJS
 *
 * Version: 3.7.5
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, useRouterHistory, IndexRedirect } from 'react-router';
import { createHistory } from 'history';

import initTranslation from './components/Common/localize';
import initLoadThemes from './components/Common/load-themes';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
import BaseHorizontal from './components/Layout/BaseHorizontal';

import SingleView from './components/SingleView/SingleView';
import SubMenu from './components/SubMenu/SubMenu';

// ecommerce imports
import EcommerceOrder from './components/Ecommerce/EcommerceOrders';
import EcommerceOrderView from './components/Ecommerce/EcommerceOrderView';
import EcommerceProduct from './components/Ecommerce/EcommerceProducts';
import EcommerceProductView from './components/Ecommerce/EcommerceProductView';
import EcommerceCheckout from './components/Ecommerce/EcommerceCheckout';


// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'


// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadThemes();

// Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.async = true;
});

// specify basename below if running in a subdirectory or set as "/" if app runs in root
const appHistory = useRouterHistory(createHistory)({
  basename: WP_BASE_HREF
})

ReactDOM.render(
    <Router history={appHistory}>
        <Route path="/" component={Base}>

            {/* Default route*/}
            <IndexRedirect to="/singleview" />

            <Route path="singleview" component={SingleView}/>
            <Route path="submenu" component={SubMenu}/>

            <Route path="ecommerce-orders" component={EcommerceOrder}/>
            <Route path="ecommerce-order-view" component={EcommerceOrderView}/>
            <Route path="ecommerce-products" component={EcommerceProduct}/>
            <Route path="ecommerce-product-view" component={EcommerceProductView}/>
            <Route path="ecommerce-checkout" component={EcommerceCheckout}/>

        </Route>

        {/* Not found handler */}
        {/*<Route path="*" component={NotFound}/>*/}

    </Router>,
    document.getElementById('app')
);

// Auto close sidebar on route changes
appHistory.listen(function(ev) {
    $('body').removeClass('aside-toggled');
});
