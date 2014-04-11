ConfirmModal = function (page, identifier, options) {
  var confirm, cancel, $page, $modal, $modalContent, $trigger, $confirm, $cancel;

  options = options || {};
  confirm = options['confirm'] || $.noop;
  cancel = options['cancel'] || $.noop;

  $page = $(page);
  $modal = $page.find('[data-modal="' + identifier + '"]');
  $modalContent = $modal.find('.modal-content');

  $trigger = $page.find('[data-trigger="' + identifier + '"]');
  $confirm = $page.find('[data-confirm="' + identifier + '"]');
  $cancel = $page.find('[data-cancel="' + identifier + '"]');

  function showModal() {
    $modal.addClass('show');
  }

  function hideModal(e) {
    var callback = e.data || $.noop;
    callback();
    $modal.removeClass('show');
  }

  $modalContent.click(function (e) {
    e.stopPropagation();
  });

  $trigger.click(showModal);
  $confirm.click(confirm, hideModal);
  $cancel.add($modal).click(cancel, hideModal);
};