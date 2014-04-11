ConfirmModal = function (identifier, options) {
  options = options || {};
  var modal = '[data-modal="' + identifier + '"]';
  var trigger = '[data-trigger="' + identifier + '"]';
  var confirm = '[data-confirm="' + identifier + '"]';
  var cancel = '[data-cancel="' + identifier + '"]';
  var backdrop = '.modal-backdrop';

  $(trigger).click(function () {
    $(modal).show();
    $(backdrop).show();
  });

  $([cancel, backdrop].join(",")).click(function () {
    if (options['cancel']) {
      options['cancel']();
    }
    $(modal).hide();
    $(backdrop).hide();
  });

  $(confirm).click(function () {
    if (options['confirm']) {
      options['confirm']();
    }
    $(modal).hide();
    $(backdrop).hide();
  });

};