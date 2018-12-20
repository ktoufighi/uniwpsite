<?php
get_header();
  while (have_posts()) {
    the_post();
    pageBanner();

    ?>

    <div class="container container--narrow page-section">
      <div class="metabox metabox--position-up metabox--with-home-link">
        <p><a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program'); ?>"><i class="fa fa-home" aria-hidden="true"></i> All Programs</a> <span class="metabox__main"><?php the_title(); ?></span></p>
      </div>

      <div class="generic-content"><?php the_content(); ?>

      <?php
      $relatedProfessors = new WP_Query(array(
        // setting posts to -1 will return all post queries
        'posts_per_page' => -1,
        'post_type' => 'professor',
        'orderby' => 'title',
        'order' => 'ASC',
        // ordering the date passed events should not show, we use array to give the custom query more than one parameter
        'meta_query' => array(
          array(
            'key' => 'related_programs',
            'compare' => 'LIKE',
            'value' => '"' . get_the_ID() . '"'
          )
        )

      ));

      if ($relatedProfessors->have_posts()) {
        echo '<hr class="section-break">';
        echo '<h3> ' . get_the_title() . ' Professors</h3>';

        while ($relatedProfessors->have_posts()) {
          $relatedProfessors->the_post(); ?>
          <li class="professor-card__list-item">
            <a class= "professor-card" href="<?php the_permalink(); ?>">
              <img class="professor-card__image" src="<?php the_post_thumbnail_url('professorImage'); ?>">
              <span class="professor-card__name"><?php the_title(); ?></span>
            </a>
          </li>
        <?php }
      }
        // WHENEVER YOU NEED TO RUN MULTIPLE CUSTOM QUEIRES ON A SINGLE PAGE
        // YOU WOULD NEED TO RESET THE GLOBAL PAGE ID BY RUNNING THIS FUNCTION
        // IN BETWEEN THE QUERIES.

        wp_reset_postdata();

          $today = date('Ymd');
          $homepageEvents = new WP_Query(array(
            // setting posts to -1 will return all post queries
            'posts_per_page' => 2,
            'post_type' => 'event',
            'orderby' => 'meta_value_num',
            'meta_key' => 'date',
            'order' => 'ASC',
            // ordering the date passed events should not show, we use array to give the custom query more than one parameter
            'meta_query' => array(
              array(
                'key' => 'date',
                'compare' => '>=',
                'value' => $today,
                'type' => 'numeric'
              ),
              array(
                'key' => 'related_programs',
                'compare' => 'LIKE',
                'value' => '"' . get_the_ID() . '"'
              )
            )

          ));

          if ($homepageEvents->have_posts()) {
            echo '<hr class="section-break">';
            echo '<h3>Upcoming ' . get_the_title() . ' Events</h3>';

            while ($homepageEvents->have_posts()) {
              $homepageEvents->the_post();
              get_template_part('template-parts/content-event');
             }
          }

          // to give us a clean slate we should run this wp function
          wp_reset_postdata();
          // a new variable to to go back to the campus that offer the program on the single-program page
          $relatedCampuses = get_field('related_campus');
          echo '<hr class="section-break">';
          if ($relatedCampuses) {
            echo '<h3>' . get_the_title() . ' is Available at These Campuses</h3>';
            echo '<ul class="min-list link-list">';
            foreach($relatedCampuses as $campus) {
              ?> <li><a href="<?php echo get_the_permalink($campus); ?>"><?php echo get_the_title($campus);  ?></a></li><?php
            }
            echo '</ul>';
          }

;        ?>


      </div>
    </div>

  <?php }
get_footer();

?>
