<?php if (!defined('ABSPATH')) exit; $t = get_template_directory_uri(); ?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<header class="site-header" id="header">
  <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Night &amp; Rain — Joshua Tree Vacation Rentals">
    <img class="logo logo-light" src="<?php echo $t; ?>/assets/brand/logo-light.png" alt="Night &amp; Rain">
    <img class="logo logo-dark" src="<?php echo $t; ?>/assets/brand/logo-dark.png" alt="" aria-hidden="true">
  </a>
  <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
  <nav class="nav" id="nav">
    <a href="<?php echo esc_url(home_url('/#stays')); ?>">The Stays</a>
    <a href="<?php echo esc_url(home_url('/#why')); ?>">Book Direct</a>
    <a href="<?php echo esc_url(home_url('/about/')); ?>">About</a>
    <a class="nav-cta" href="<?php echo esc_url(home_url('/#stays')); ?>">Book Your Stay</a>
  </nav>
</header>
