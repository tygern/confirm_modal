ConfirmModal = function (page, identifier, options) {
  var confirm, cancel, $page, $backdrop, $modal, $trigger, $confirm, $cancel;

  options = options || {};
  confirm = options['confirm'] || $.noop;
  cancel = options['cancel'] || $.noop;

  $page = $(page);
  $backdrop = $page.find('.modal-backdrop');
  $modal = $page.find('[data-modal="' + identifier + '"]');

  $trigger = $page.find('[data-trigger="' + identifier + '"]');
  $confirm = $page.find('[data-confirm="' + identifier + '"]');
  $cancel = $page.find('[data-cancel="' + identifier + '"]');

  if ($backdrop.length == 0) {
    $backdrop = $("<div class='modal-backdrop'></div>").appendTo(page);
  }

  function showModal() {
    $modal.add($backdrop).show();
  }

  function hideModal(e) {
    var callback = e.data || $.noop;
    callback();
    $modal.add($backdrop).hide();
  }

  $trigger.click(showModal);
  $confirm.click(confirm, hideModal);
  $cancel.add($backdrop).click(cancel, hideModal);
};