<?php
/**
 * Night & Rain theme functions
 */
if (!defined('ABSPATH')) exit;

function nr_assets() {
    $t = get_template_directory_uri();
    $ver = '1.0.' . filemtime(get_template_directory() . '/css/styles.css');
    wp_enqueue_style('nr-fonts', 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600&display=swap', array(), null);
    wp_enqueue_style('nr-main', $t . '/css/styles.css', array(), $ver);
    wp_enqueue_script('nr-main', $t . '/js/main.js', array(), $ver, true);
}
add_action('wp_enqueue_scripts', 'nr_assets');

add_theme_support('title-tag');
add_theme_support('post-thumbnails');
add_theme_support('html5', array('style', 'script'));

/** Load the stays data baked into the theme. */
function nr_stays() {
    static $d = null;
    if ($d === null) {
        $f = get_template_directory() . '/data/stays.json';
        $d = file_exists($f) ? json_decode(file_get_contents($f), true) : array();
    }
    return $d ?: array();
}
function nr_stay_by_slug($slug) {
    foreach (nr_stays() as $s) {
        if ($s['slug'] === $slug) return $s;
    }
    return null;
}

/** Gallery image URLs for a stay slug, ordered. */
function nr_gallery($slug) {
    $dir = get_template_directory() . '/assets/library/' . $slug;
    if (!is_dir($dir)) return array();
    $files = glob($dir . '/*.jpg');
    natsort($files);
    $base = get_template_directory_uri() . '/assets/library/' . $slug . '/';
    return array_map(function ($f) use ($base) { return $base . basename($f); }, array_values($files));
}

/** Cleaner page titles. */
add_filter('document_title_separator', function () { return '·'; });
