<?php
get_header();
pageBanner(array(
  'title' => 'Our Campuses',
  'subtitle' => 'We have several campuses in North America.'

));
?>

<div class="container container--narrow page-section">

  <ul class="link-list min-list">

    <div class="acf-map">
      <?php
          while (have_posts()) {
            the_post();
            $mapLocation = get_field('google_map');
            ?>
            <div class="marker" data-lat="<?php echo $mapLocation['lat']; ?>" data-lng="<?php echo $mapLocation['lng']; ?>">
              <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
              <?php echo $mapLocation['address']; ?>
            </div>
      <?php }
      echo paginate_links();
      ?>
    </div>
  </ul>
</div>
<?php get_footer();

?>
