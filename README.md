# Bluegg Ajax

Ajax-ify your forms just by adding some data attributes.

## Usage

```shell
# install
npm install --save bluegg-ajax
```

Add the following data attributes to your form elements:

```html
<form action="/endpoint.php" method="post" data-ajax data-ajax-callback="myAjaxCallback">
```

Whilst submitting, a **data-ajax-submitting** attribute will be added to the relevant form element.

In this example, after the form submits the ajax request, it will attempt to call a function called **myAjaxCallback** (defined in the **data-ajax-callback** attribute), which needs to be defined in your js like this:

```javascript
window.myAjaxCallback = function(response) {
	// your callback code
}
```

A response object will be passed to your callback function. This object contains a **data** attribute that will contain whatever json is returned from the page defined in the **action** attribute of the form element.

To ajax-ify your forms, just require the module and run it as a function:

```javascript
// import - common.js
var ajax = require('bluegg-ajax');

// initiate forms
ajax();
```

This will find any forms on the current page that contain the **data-ajax** attribute and modify them so they submit using ajax instead of submitting normally.

All fields within the form will be passed as POST data to the page defined in the **action** attribute of the form element.
