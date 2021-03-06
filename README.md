# entityform_ctools
Entityform with ctools example and helpers.



# Examples

A few examples of the use of the module.

## Example 1

HTML + CSS only @TODO

## Example 2

Generate link with PHP.

~~~php
// Listing.
entityform_ctools_add_link((string) $link_title, (string) $entityform_name, (string) $class, (array) $options);

// Just simple link. This will add html link with text 'Demo 1', and when user click it, CTools create modal window
// width 'service_order' entityform.
print entityform_ctools_add_link('Demo 1', 'service_order');

// Link with 'mytheme' theme for CTools modal. You must define this theme before using it, or will be loaded default
// CTools theme.
// default will be rendered as - ctools-modal-default.
print entityform_ctools_add_link('Demo 2', 'service_order', 'entityform');

// More complex example with adding extra attributes. $options array will be send to l() function. So read documentation
// if you not familiar with it https://api.drupal.org/api/drupal/includes%21common.inc/function/l/7
print entityform_ctools_add_link('Demo 2', 'service_order', 'entityform', array(
  'attributes' => array(
    'id' => 'my-id',
    'class' => 'extra-class'
  ),
));
~~~

## Example 3: Pass some data to form for using it later.

The easiest way to do it by using query. You can pass query data with link generator.

~~~php
print entityform_ctools_add_link('Demo 2', 'service_order', 'entityform', array(
  'attributes' => array(
    'id' => 'my-id',
    'class' => 'extra-class'
  ),
  'query' => array(
    // Or you can pass Entity ID and then load data.
    'node_title' => 'Service 1',
  ),
));
~~~

Then you must alter form and you can use this value.

~~~php
/**
 * Implements hook_form_FORM_ID_alter().
 */
function hook_form_FORM_ID_alter(&$form, &$form_state) {
  $query = drupal_get_query_parameters();
  if (isset($query['node_title'])) {
    $form['field_service_name']['und'][0]['value']['#value'] = $query['node_title'];
  }
  // Make this field only readable.
  $form['field_service_name']['und'][0]['value']['#attributes']['readonly'] = 'readonly';
}
~~~

You will get something like this.

![Example 3 image](http://i.imgur.com/TwRmcp8.png)

## Example 4: hook_entityform_ctools_ENTITYFORM_NAME_commands_alter()

You can alter AJAX commands for extra staff.

ENTITYFORM_NAME must be replaced by machine name of the entityform, **not** the
FORM ID.

~~~php
function hook_entityform_ctools_ENTITYFORM_NAME_commands_alter(&$commands, $form_state) {
  // Close modal window after successful submission.
  if ($form_state['executed']) {
    $commands[] = ctools_modal_command_dismiss();
  }
}
~~~

## Example 5: get entityform with AJAX submit.

Looking for `drupal_get_form`, but for entityform and AJAX submit? Easy peasy.

~~~php
$form = entityform_ctools_get_ajax_form('ENTITYFORM_NAME');
print drupal_render($form);
~~~

## Example 6: AJAX form submission on form pages.

Want to make form submission via AJAX on default form page, or, maybe, you print form in some places and want to make them AJAX? No the problem.

Go to entityform settings, now you will see new extra tabs called 'AJAX', next is like block visibility settings, you just enter paths whatever you want to make form AJAX submit.

![Example 6 image](http://i.imgur.com/wzfQ3lW.png)


## Example 7: Use it like text filter.

You can place entityform to page with AJAX submission with enabling Entityfrom Ctools embed filter.

~~~
[entityform_ctools:ENTITYFORM_NAME]
~~~

This code above in text, where enabled this filter, will be converted to AJAX Entityform.
