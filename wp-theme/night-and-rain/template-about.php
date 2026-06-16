<?php
/* Template Name: About */
if (!defined('ABSPATH')) exit;
get_header();
$t = get_template_directory_uri();
?>

<section class="stay-hero" id="top" style="min-height:62svh;">
  <div class="bg"><img src="<?php echo $t; ?>/assets/library/the-dome/24.jpg" alt="Night &amp; Rain — desert nightfall"></div>
  <div class="inner wrap">
    <p class="eyebrow" style="color:var(--gold-soft)">Our Story</p>
    <h1>Night, rain, and<br>everything rare.</h1>
    <p class="tagline">The two most magical things in the high desert — both unforgettable precisely because you can't take them for granted.</p>
  </div>
</section>

<section class="section wrap">
  <div class="overview">
    <div class="body reveal">
      <p>Night &amp; Rain is the desert arm of <strong>Knight &amp; Reign Properties</strong> — say them out loud and you'll hear the family resemblance.</p>
      <p>Where Knight &amp; Reign cares for homes across Southern California, Night &amp; Rain is something more specific: a small, hand-picked collection of experiential stays in Joshua Tree and Yucca Valley, built around the things people actually drive to the desert for. Saltwater pools for the hundred-degree afternoons. Saunas and hot tubs for the surprisingly cold nights. A bubble dome for falling asleep beneath the Milky Way. Pickleball at golden hour, firepits after dark.</p>
      <p>Every home is looked after by our own small team — the same people you'll message when you book. No call centers, no platform runaround. That's the whole point of booking direct: a better rate, and a real person on the other end.</p>
    </div>
    <aside class="facts-card reveal d1">
      <h3>What we're about</h3>
      <dl>
        <dt>Feel</dt><dd>Atmospheric</dd>
        <dt>Style</dt><dd>Minimal &amp; warm</dd>
        <dt>Care</dt><dd>Boutique, personal</dd>
        <dt>Where</dt><dd>Joshua Tree &amp; Yucca Valley</dd>
        <dt>Part of</dt><dd>Knight &amp; Reign</dd>
      </dl>
    </aside>
  </div>
</section>

<section class="section highlights">
  <div class="wrap">
    <p class="eyebrow">What's next</p>
    <h2 style="color:var(--ivory);font-size:clamp(1.8rem,4vw,3rem);max-width:20ch;">The collection is growing.</h2>
    <p style="color:rgba(246,242,234,.78);max-width:54ch;margin-top:1rem;">We're adding more experiential desert homes under the Night &amp; Rain flag. Join the list and you'll hear about new stays before anyone else.</p>
    <div style="margin-top:2rem;"><a class="btn btn-light" href="<?php echo esc_url(home_url('/#join')); ?>">Join the List</a></div>
  </div>
</section>

<section class="section more-stays wrap">
  <p class="eyebrow">The Stays</p>
  <h2 style="font-size:clamp(1.8rem,4vw,3rem);">Find your desert home.</h2>
  <div class="more-grid" style="grid-template-columns:repeat(4,1fr);">
    <?php foreach (nr_stays() as $o): ?>
      <a class="more-card" href="<?php echo esc_url(home_url('/stays/' . $o['slug'] . '/')); ?>"><img src="<?php echo $t; ?>/assets/library/<?php echo esc_attr($o['slug']); ?>/<?php echo esc_attr($o['hero']); ?>" alt="<?php echo esc_attr($o['name']); ?>" loading="lazy"><span><?php echo esc_html($o['name']); ?></span></a>
    <?php endforeach; ?>
  </div>
</section>

<?php get_footer(); ?>
