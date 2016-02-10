<?php

/**
 * Implements hook_FORM_ID_entityform_ctools_alter().
 *
 * Called when entityform loaded via AJAX. You can use it with $query parameter
 * of entityform_ctools_add_link() function. This allow you easily detect it and
 * use data from $_GET variable for your purposes.
 */
function hook_FORM_ID_entityform_ctools_alter(&$form, &$form_state) {
  if (isset($_GET['nid']) && is_int($_GET['nid'])) {
    $node = node_load($_GET['nid']);
    $form['field_name']['und'][0]['value']['#default_value'] = $node->title;
  }
}