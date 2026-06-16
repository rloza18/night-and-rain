<?php
/* Template Name: Stay */
if (!defined('ABSPATH')) exit;
get_header();
$t = get_template_directory_uri();
$slug = get_post_field('post_name', get_post());
$s = nr_stay_by_slug($slug);
if (!$s) { echo '<div style="padding:9rem 2rem;text-align:center;font-family:var(--display)">Stay not found.</div>'; get_footer(); return; }
$imgs = nr_gallery($s['slug']);
$hero = $t . '/assets/library/' . $s['slug'] . '/' . $s['hero'];
$bd = $s['bedrooms'] > 1 ? 's' : '';
$others = array_filter(nr_stays(), function ($o) use ($s) { return $o['slug'] !== $s['slug']; });
?>

<section class="stay-hero" id="top">
  <div class="bg"><img src="<?php echo esc_url($hero); ?>" alt="<?php echo esc_attr($s['name']); ?>"></div>
  <div class="inner wrap">
    <a class="back" href="<?php echo esc_url(home_url('/#stays')); ?>">← All Stays</a>
    <h1><?php echo esc_html($s['name']); ?></h1>
    <p class="tagline"><?php echo esc_html($s['tagline']); ?></p>
    <ul class="facts">
      <li><?php echo esc_html($s['type']); ?></li>
      <li><?php echo esc_html($s['town']); ?></li>
      <li>Sleeps <?php echo (int) $s['sleeps']; ?></li>
      <li><?php echo (int) $s['bedrooms']; ?> Bedroom<?php echo $bd; ?></li>
      <li><?php echo (int) $s['baths']; ?> Bath</li>
    </ul>
    <a class="btn btn-light" href="#book">Book Your Stay</a>
  </div>
</section>

<section class="section wrap">
  <div class="overview">
    <div class="body reveal">
      <?php foreach ($s['intro'] as $p) echo '<p>' . esc_html($p) . '</p>'; ?>
    </div>
    <aside class="facts-card reveal d1">
      <h3>The details</h3>
      <dl>
        <dt>Type</dt><dd><?php echo esc_html($s['type']); ?></dd>
        <dt>Location</dt><dd><?php echo esc_html($s['town']); ?>, CA</dd>
        <dt>Guests</dt><dd>Sleeps <?php echo (int) $s['sleeps']; ?></dd>
        <dt>Bedrooms</dt><dd><?php echo (int) $s['bedrooms']; ?></dd>
        <dt>Beds</dt><dd><?php echo esc_html($s['bedsLabel']); ?></dd>
        <dt>Bath</dt><dd><?php echo (int) $s['baths']; ?></dd>
        <dt>Check-in</dt><dd><?php echo esc_html($s['checkin']); ?></dd>
      </dl>
    </aside>
  </div>
</section>

<section class="section highlights">
  <div class="wrap">
    <p class="eyebrow">What you'll love</p>
    <h2 style="color:var(--ivory);font-size:clamp(1.8rem,4vw,3rem);">The good stuff.</h2>
    <ul>
      <?php foreach ($s['highlights'] as $h) echo '<li>' . esc_html($h) . '</li>'; ?>
    </ul>
  </div>
</section>

<section class="section book" id="book">
  <div class="wrap">
    <p class="eyebrow">Reserve</p>
    <h2>Book <?php echo esc_html($s['name']); ?> direct.</h2>
    <p>Real-time availability and the best rate, straight from us — no platform fees. Check your dates below.</p>
    <div class="widget-slot">
      <?php
      // Boostly Connect booking widget (renders when plugin is connected & this property is mapped).
      $widget = do_shortcode('[bly_booking_sidebar]');
      if (trim(strip_tags($widget)) !== '') {
          echo $widget;
      } else {
          echo 'Booking opens here once the property is synced. Meanwhile, email <a href="mailto:rafa@knightandreign.com" style="color:var(--midnight);text-decoration:underline;">rafa@knightandreign.com</a> to reserve.';
      }
      ?>
    </div>
  </div>
</section>

<section class="section gallery-sec">
  <div class="section-head reveal">
    <p class="eyebrow">The Gallery</p>
    <h2>Every corner of <?php echo esc_html($s['name']); ?>.</h2>
  </div>
  <div class="gallery">
    <?php foreach ($imgs as $i => $src): ?>
      <img src="<?php echo esc_url($src); ?>" alt="<?php echo esc_attr($s['name']); ?>" loading="<?php echo $i < 3 ? 'eager' : 'lazy'; ?>">
    <?php endforeach; ?>
  </div>
</section>

<section class="section more-stays wrap">
  <p class="eyebrow">More desert stays</p>
  <h2 style="font-size:clamp(1.8rem,4vw,3rem);">Keep exploring.</h2>
  <div class="more-grid">
    <?php foreach ($others as $o): ?>
      <a class="more-card" href="<?php echo esc_url(home_url('/stays/' . $o['slug'] . '/')); ?>"><img src="<?php echo $t; ?>/assets/library/<?php echo esc_attr($o['slug']); ?>/<?php echo esc_attr($o['hero']); ?>" alt="<?php echo esc_attr($o['name']); ?>" loading="lazy"><span><?php echo esc_html($o['name']); ?></span></a>
    <?php endforeach; ?>
  </div>
</section>

<?php get_footer(); ?>
