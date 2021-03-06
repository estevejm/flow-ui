(function ($, PubSub) {

    var STATUS_INVALID = 'invalid',
        ICON_MAP = {
            'error': 'ban-circle',
            'warning': 'exclamation-sign',
            'notice': 'info-sign'
        };

    PubSub.subscribe('validation.load', function (msg, uri) {
        $.getJSON(uri, show);

        $(document).on('click', '.validation-item', function() {
            var nodeId = $(this).data('node-id');
            PubSub.publish('node.find', nodeId);
        });
    });

    function show(validation) {
        validation.status == STATUS_INVALID ? showViolations(validation.violations) : showSuccess();
    }

    function showViolations(items) {
        $('#validator').addClass('error-validation').html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Validation errors ' + getCounterHtml(items.length) + '<span class="caret"></a>' + getViolationListHtml(items));
    }

    function showSuccess() {
        $('#validator').addClass('success-validation').html('<a href="#">Validation errors ' + getCounterHtml(0)+ '</a>');
    }

    function getCounterHtml(count) {
        return '<span class="badge counter">' + count + '</span>';
    }

    function getViolationListHtml(items) {
        var violations = '';

        items.forEach(function(item) {
            violations += getViolationItemHtml(item);
        });

        return '<ul id="validation-list" class="dropdown-menu scrollable-menu">' + violations + '</ul>';
    }

    function getViolationItemHtml(item) {
        return '<li class="validation-item" data-node-id="'+ item.nodeId + '">' + getViolationIcon(item.severity) + item.message + '</li>';
    }

    function getViolationIcon(severity) {
        return '<span class="glyphicon glyphicon-' + ICON_MAP[severity] + '" aria-hidden="true"></span>';
    }

}(jQuery, PubSub));