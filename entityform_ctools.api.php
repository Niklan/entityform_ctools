<?php

/**
 * Implements hook_entityform_ctools_ENTITYFORM_NAME_commands_alter().
 *
 * Allow you to change and add new ajax commands after form was successful
 * submitted.
 */
function hook_entityform_ctools_ENTITYFORM_NAME_commands_alter(&$commands, $form_state) {
  // Close modal window after successful submission.
  if ($form_state['executed']) {
    $commands[] = ctools_modal_command_dismiss();
  }
}
