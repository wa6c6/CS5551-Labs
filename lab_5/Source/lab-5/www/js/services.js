angular.module('starter.services', [])

.service('formData', function () {
    return {
        form: {},
        getForm: function () {
            return this.form;
        },
        updateForm: function (form) {
            this.form = form;
        }
    }
})
