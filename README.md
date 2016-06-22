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
print entityform_ctools_add_link('Demo 2', 'service_order', 'default');

// More complex example with adding extra attributes. $options array will be send to l() function. So read documentation
// if you not familiar with it https://api.drupal.org/api/drupal/includes%21common.inc/function/l/7
print entityform_ctools_add_link('Demo 2', 'service_order', 'default', array(
  'attributes' => array(
    'id' => 'my-id',
    'class' => 'extra-class'
  ),
));
~~~

## Example 3: Pass some data to form for using it later.

The easiest way to do it by using query. You can pass query data with link generator.

~~~php
print entityform_ctools_add_link('Demo 2', 'service_order', 'default', array(
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

## Example 4: hook_entityform_ctools_FORM_ID_executed_commands()

~~~php
function hook_entityform_ctools_FORM_ID_executed_commands(&$commands, $form_state) {
  // Close modal window after successful submission.
  $commands[] = ctools_modal_command_dismiss();
}
~~~
