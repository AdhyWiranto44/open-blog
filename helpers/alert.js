const showAlert = function(color, message) {
    return `<div class="alert ${color} alert-dismissible fade show shadow-sm" role="alert">${message}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
}

module.exports = showAlert;