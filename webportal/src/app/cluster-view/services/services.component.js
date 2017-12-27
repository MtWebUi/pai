// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


// module dependencies
const servicesComponent = require('./services.component.ejs');

$("#sidebar-menu--cluster-view").addClass("active");
$("#sidebar-menu--cluster-view--services").addClass("active");

const breadcrumbComponent = require('../../job/breadcrumb/breadcrumb.component.ejs');
const loadingComponent = require('../../job/loading/loading.component.ejs');
const serviceTableComponent = require('./service-table.component.ejs');
const serviceViewComponent = require('./services.component.ejs');
const loading = require('../../job/loading/loading.component');
//const webportalConfig = require('../../../config/webportal.config.json');
const userAuth = require('../../user/user-auth/user-auth.component');


const serviceViewHtml = serviceViewComponent({
  breadcrumb: breadcrumbComponent,
  loading: loadingComponent,
  serviceTable: serviceTableComponent
});


const loadServices = () => {
  loading.showLoading();
  $.ajax({
    //url: `${webportalConfig.restServerUri}/api/v1/job`,
    //type: 'GET',
    success: (data) => {
      loading.hideLoading();
      if (data.error) {
        alert(data.message);
      } else {
        $('#service-table').html(serviceTableComponent({
          services: data      
        }));
      }
    },
    error: (xhr, textStatus, error) => {
      const res = JSON.parse(xhr.responseText);
      alert(res.message);
    }
  });
};


window.loadServices = loadServices;


$('#content-wrapper').html(serviceViewHtml);
$(document).ready(() => {
  loadServices();
});

module.exports = { loadservices }