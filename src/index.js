const axios = require('axios');

function initAjaxForm(nodeObj) {
    nodeObj.addEventListener('submit', function(e) {
        handleAjaxFormSubmit(e, nodeObj);
    });
}

function handleAjaxFormSubmit(e, nodeObj) {
    e.preventDefault();

    var action   = nodeObj.getAttribute('action');
    var data     = getFormFieldsData(nodeObj);
    var callback = nodeObj.getAttribute('data-ajax-callback');

    axios.post(action, data)
        .then(function(response) {
            window[callback](response);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function getFormFieldsData(nodeObj) {
    var dataObj      = {};
    var fieldElNames = [
        'input',
        'textarea',
        'select'
    ];

    for (const fieldElName of fieldElNames) {
        var fields = nodeObj.getElementsByTagName(fieldElName);
        for (var i = 0; i < fields.length; i++) {
            var field = fields.item(i);
            dataObj[field.getAttribute('name')] = field.value;
        }
    }

    return dataObj;
}

export default function() {
	var ajaxForms = document.querySelectorAll('[data-ajax]');
    ajaxForms.forEach(function(v, i, o) {
        initAjaxForm(v);
    });
}
