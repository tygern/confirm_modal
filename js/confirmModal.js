ConfirmModal = function (page, identifier, options) {
  options = options || {};
  var $page = $(page);
  var modal = '[data-modal="' + identifier + '"]';
  var trigger = '[data-trigger="' + identifier + '"]';
  var confirm = '[data-confirm="' + identifier + '"]';
  var cancel = '[data-cancel="' + identifier + '"]';
  var backdrop = '.modal-backdrop';

  if ($page.find('.modal-backdrop').length == 0) {
    $page.append("<div class='modal-backdrop'></div>");
  }

  $page.find(trigger).click(function () {
    $page.find(modal).show();
    $page.find(backdrop).show();
  });

  $page.find([cancel, backdrop].join(",")).click(function () {
    if (options['cancel']) {
      options['cancel']();
    }
    $page.find(modal).hide();
    $page.find(backdrop).hide();
  });

  $page.find(confirm).click(function () {
    if (options['confirm']) {
      options['confirm']();
    }
    $page.find(modal).hide();
    $page.find(backdrop).hide();
  });

};