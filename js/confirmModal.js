ConfirmModal = function (identifier, success) {
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
    $(modal).hide();
    $(backdrop).hide();
  });

  $(confirm).click(function () {
    success();
    $(modal).hide();
    $(backdrop).hide();
  });

};