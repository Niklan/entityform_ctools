<?php

/**
 * Implements hook_entityform_ctools_FORM_ID_executed_commands().
 *
 * Allow you to change and add new ajax commands after form was successful
 * submitted.
 */
function hook_entityform_ctools_FORM_ID_executed_commands(&$commands, $form_state) {
  // Close modal window after successful submission.
  $commands[] = ctools_modal_command_dismiss();
}
