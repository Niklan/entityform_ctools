<?php

/**
 * @file
 *   Filter implementation.
 */

/**
 * Implements hook_filter_info().
 */
function entityform_ctools_filter_info() {
  return array(
    'filter_entityform_ctools' => array(
      'title' => 'Entityform Ctools embed',
      'description' => 'Replace [entityform:ENTITYFORM_NAME] with entityform embed form.',
      'process callback'  => 'entityform_ctools_filter_process',
      'tips callback' => 'entityform_ctools_filter_tips',
    ),
  );
}

/**
 * Filter process callback.
 */
function entityform_ctools_filter_process($text, $filter, $format, $langcode, $cache, $cache_id) {
  if (preg_match_all('/\[entityform:(.+)\]/', $text, $matches_all, PREG_SET_ORDER)) {

    foreach ($matches_all as $matches) {
      $form = entityform_ctools_get_ajax_form($matches[1]);
      $form_rendered = drupal_render($form);
      $text = str_replace($matches[0], $form_rendered, $text);
    }
  }

  return $text;
}

/**
 * Filter tips callback.
 */
function entityform_ctools_filter_tips($filter, $format, $long) {
  return 'You can insert entityform to page using [entityform:ENTITYFORM_NAME]';
}
