/**
 * @file
 *
 * Implement a modal form.
 */

(function ($) {
  /**
   * Provide the HTML to create the modal dialog.
   */
  Drupal.theme.prototype.entityform_ctools_modal = function () {
    var html = '';
    html += '  <div id="ctools-modal">';
    html += '    <div class="modal-wrapper">';
    html += '      <div class="modal-header">';
    html += '        <span id="modal-title" class="modal-title"> </span>';
    html += '        <a class="close" href="#">';
    html += Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '        </a>';
    html += '      </div>';
    html += '      <div id="modal-content" class="modal-content">';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    return html;
  };

  /**
   * Provide the HTML to create the throbber.
   */
  Drupal.theme.prototype.entityform_ctools_throbber = function () {
    var html = '';
    html += '  <div id="modal-throbber">';
    html += '    <div class="modal-throbber-wrapper">';
    html += Drupal.CTools.Modal.currentSettings.throbber;
    html += '    </div>';
    html += '  </div>';

    return html;
  };

  /**
   * On Ctools Modal show.
   */
  var modal_show = Drupal.CTools.Modal.show;
  Drupal.CTools.Modal.show = function (choice) {
    modal_show.call(this, choice);
    $('body').addClass('modal-open');
  };

  /**
   * On Ctools Modal close.
   */
  Drupal.behaviors.entityform_ctools_on_close = {
    attach: function (context, settings) {
      $(document).on("CToolsDetachBehaviors", function () {
        $('body', context).removeClass('modal-open');
      });
    }
  };
})(jQuery);

