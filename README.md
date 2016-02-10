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
print entityform_ctools_add_link('Demo 2', 'service_order', 'mytheme');

// More complex example with adding extra attributes. $options array will be send to l() function. So read documentation
// if you not familiar with it https://api.drupal.org/api/drupal/includes%21common.inc/function/l/7
print entityform_ctools_add_link('Demo 2', 'service_order', 'mytheme', array(
  'attributes' => array(
    'id' => 'my-id',
    'class' => 'extra-class'
  ),
));
~~~

## Example 3: hook_FORM_ID_entityform_ctools_alter()

This hook is familiar with hook_form_FORM_ID_alter(), the main difference, it calls only when form loaded via AJAX. Here
a little trick why this hook born.

F.e. you have service page, the service has two variants, and you want to send selected variant with form submission.
You create field for it, and (f.e.) call it field_service_varaint (text).

~~~php
// Get node object for current page.
$node = menu_get_object();

// Then create two links.
print entityform_ctools_add_link('Variant 1', 'service_order', 'mytheme', array(
  'query' => array(
    'title' => $node->title,
    'variant' => 'Variant 1', // we will use it later.
  )
));

print entityform_ctools_add_link('Variant 2', 'service_order', 'mytheme', array(
  'query' => array(
    'title' => $node->title,
    'variant' => 'Variant 2', // we will use it later.
  )
));
~~~

Now implement hook and use this data.

~~~php
/**
 * Implements hook_FORM_ID_entityform_ctools_alter().
 * @form_id: service_order
 */
function MODULENAME_service_order_entityform_ctools_alter(&$form, &$form_state) {
  if (isset($_GET['title']) && isset($_GET['variant'])) {
    // We set this as default value for field. Result for variant 1 will: 'Node title: Variant 1'.
    $form['field_service_varaint']['und'][0]['value']['#default_value'] = $_GET['title'] . ': ' . $_GET['variant'];
    // And, you can disable edit possibility, but user still see this.
    $form['field_service_varaint']['und'][0]['value']['#attributes'] = array('disabled' => 'disabled');
  }
}
~~~

You will get something like this.

![Example 3 image](http://i.imgur.com/TwRmcp8.png)