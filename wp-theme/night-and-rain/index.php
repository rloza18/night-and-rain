<?php if (!defined('ABSPATH')) exit; get_header(); ?>
<main class="section wrap" style="padding-top:8rem;">
  <?php while (have_posts()) : the_post(); ?>
    <h1 style="font-size:clamp(2rem,5vw,3.4rem);margin-bottom:1.5rem;"><?php the_title(); ?></h1>
    <div class="lede" style="max-width:70ch;"><?php the_content(); ?></div>
  <?php endwhile; ?>
</main>
<?php get_footer(); ?>
