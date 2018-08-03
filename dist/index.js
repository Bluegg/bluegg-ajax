'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var ajaxForms = document.querySelectorAll('[data-ajax]');
    ajaxForms.forEach(function (v, i, o) {
        initAjaxForm(v);
    });
};

var axios = require('axios');

function initAjaxForm(nodeObj) {
    nodeObj.addEventListener('submit', function (e) {
        handleAjaxFormSubmit(e, nodeObj);
    });
}

function handleAjaxFormSubmit(e, nodeObj) {
    e.preventDefault();

    var action = nodeObj.getAttribute('action');
    var data = getFormFieldsData(nodeObj);
    var callback = nodeObj.getAttribute('data-ajax-callback');

    axios.post(action, data).then(function (response) {
        window[callback](response);
    }).catch(function (error) {
        console.log(error);
    });
}

function getFormFieldsData(nodeObj) {
    var dataObj = {};
    var fieldElNames = ['input', 'textarea', 'select'];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = fieldElNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var fieldElName = _step.value;

            var fields = nodeObj.getElementsByTagName(fieldElName);
            for (var i = 0; i < fields.length; i++) {
                var field = fields.item(i);
                dataObj[field.getAttribute('name')] = field.value;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return dataObj;
}

module.exports = exports['default'];

