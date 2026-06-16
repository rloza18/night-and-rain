<?php if (!defined('ABSPATH')) exit; $t = get_template_directory_uri(); ?>
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="footer-brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Night &amp; Rain"><img src="<?php echo $t; ?>/assets/brand/logo-light.png" alt="Night &amp; Rain" style="height:70px;width:auto;"></a>
        <p style="color:rgba(246,242,234,.7);max-width:32ch;font-size:.9rem;margin-top:1.2rem;">Experiential desert stays in Joshua Tree &amp; Yucca Valley, cared for by a small team that loves the high desert.</p>
      </div>
      <div class="footer-col">
        <h4>The Stays</h4>
        <a href="<?php echo esc_url(home_url('/stays/night-house/')); ?>">The Night House</a>
        <a href="<?php echo esc_url(home_url('/stays/rain-house/')); ?>">The Rain House</a>
        <a href="<?php echo esc_url(home_url('/stays/the-oasis/')); ?>">The Oasis</a>
        <a href="<?php echo esc_url(home_url('/stays/the-dome/')); ?>">The Dome</a>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="<?php echo esc_url(home_url('/about/')); ?>">About</a>
        <a href="<?php echo esc_url(home_url('/#why')); ?>">Book Direct</a>
        <a href="<?php echo esc_url(home_url('/#join')); ?>">Join the List</a>
        <a href="mailto:rafa@knightandreign.com">Contact</a>
      </div>
    </div>
    <div class="footer-fine">
      <span>© <?php echo date('Y'); ?> Night &amp; Rain. All rights reserved.</span>
      <span>A Knight &amp; Reign Properties brand · Joshua Tree, California</span>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
