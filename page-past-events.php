<?php
get_header();
pageBanner(array(
  'title' => 'Past Events',
  'subtitle' => 'A recap of all our past events.'
));

?>

<div class="container container--narrow page-section">
  <?php

    $today = date('Ymd');
    $pastEvents = new WP_Query(array(
      'paged' => get_query_var('paged', 1),
      'post_type' => 'event',
      'orderby' => 'meta_value_num',
      'meta_key' => 'date',
      'order' => 'ASC',
      'meta_query' => array(
        array(
          'key' => 'date',
          'compare' => '<',
          'value' => $today,
          'type' => 'numeric'
        )
      )
    ));

    while (have_posts()) {
      the_post();
      get_template_part('template-parts/content-event'); 
     }
    echo paginate_links(array(
      'total' => $pastEvents->max_num_pages,
    ));
  ?>
</div>

<?php get_footer();

?>
