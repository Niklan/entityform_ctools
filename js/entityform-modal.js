(function ($) {
  Drupal.theme.prototype.entityform_ctools_modal = function () {
    var html = '';
    html += '  <div id="ctools-modal">';
    html += '    <div class="wrapper">';
    html += '      <div class="header">';
    html += '        <span id="modal-title" class="title"> </span>';
    html += '        <a class="close" href="#">';
    html +=             Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '        </a>';
    html += '      </div>';
    html += '      <div id="modal-content" class="content">';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    return html;
  };

  Drupal.theme.prototype.entityform_ctools_throbber = function () {
    var html = '';
    html += '  <div id="modal-throbber">';
    html += '    <div class="modal-throbber-wrapper">';
    html +=        Drupal.CTools.Modal.currentSettings.throbber;
    html += '    </div>';
    html += '  </div>';

    return html;
  };
})(jQuery);