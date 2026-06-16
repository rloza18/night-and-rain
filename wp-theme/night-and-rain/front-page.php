<?php if (!defined('ABSPATH')) exit; get_header(); $t = get_template_directory_uri(); ?>

<!-- ============ HERO ============ -->
<section class="hero" id="top">
  <div class="hero-media">
    <video autoplay muted loop playsinline poster="<?php echo $t; ?>/assets/library/the-dome/24.jpg">
      <source src="<?php echo $t; ?>/assets/video/hero.mp4" type="video/mp4">
    </video>
  </div>
  <div class="stars"></div>
  <div class="hero-inner wrap">
    <p class="eyebrow reveal in">Joshua Tree Vacation Rentals</p>
    <h1 class="reveal in d1">Where Desert<br>Meets <em>Moonlight.</em></h1>
    <p class="lede reveal in d2">A small collection of experiential desert stays — designed for slow mornings, starry nights, and everything in between.</p>
    <div class="reveal in d3"><a class="btn btn-light" href="#stays">Book Your Stay</a></div>
  </div>
  <div class="scroll-cue">Scroll</div>
</section>

<!-- ============ STORY ============ -->
<section class="section story wrap">
  <svg class="divider-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
  <p class="eyebrow reveal">Our Collection</p>
  <h2 class="reveal d1">Thoughtful stays in Joshua Tree.</h2>
  <p class="lede reveal d2">Night &amp; Rain offers thoughtfully curated Joshua Tree vacation rentals designed for rest, inspiration, and connection. Experience the quiet beauty of the desert in spaces that feel like home.</p>
</section>

<!-- ============ THE STAYS ============ -->
<section class="stays" id="stays">
  <div class="section-head reveal">
    <p class="eyebrow">The Stays</p>
    <h2>Four desert homes.</h2>
  </div>

  <article class="stay reveal">
    <div class="stay-media"><span class="tag">Tiny Home · Yucca Valley</span><img src="<?php echo $t; ?>/assets/library/night-house/01.jpg" alt="The Night House"></div>
    <div class="stay-body">
      <p class="kicker">01 — Yucca Valley</p>
      <h3>The Night House</h3>
      <ul class="stay-meta"><li>Sleeps 4</li><li>1 Bedroom</li><li>1 Bath</li></ul>
      <p>A pool-and-sauna hideaway under wide desert skies — saltwater pool, hot tub, sauna, mini-golf, and Joshua trees right in the yard.</p>
      <div class="stay-actions">
        <a class="btn btn-solid" href="<?php echo esc_url(home_url('/stays/night-house/#book')); ?>">Book This Stay</a>
        <a class="btn btn-ghost" href="<?php echo esc_url(home_url('/stays/night-house/')); ?>">View Home</a>
      </div>
    </div>
  </article>

  <article class="stay reveal">
    <div class="stay-media"><span class="tag">Tiny Home · Yucca Valley</span><img src="<?php echo $t; ?>/assets/library/rain-house/01.jpg" alt="The Rain House"></div>
    <div class="stay-body">
      <p class="kicker">02 — Yucca Valley</p>
      <h3>The Rain House</h3>
      <ul class="stay-meta"><li>Sleeps 4</li><li>1 Bedroom</li><li>1 Bath</li></ul>
      <p>An artful, mural-wrapped escape with a private pool, sauna, and mini-golf — color and character around every corner.</p>
      <div class="stay-actions">
        <a class="btn btn-solid" href="<?php echo esc_url(home_url('/stays/rain-house/#book')); ?>">Book This Stay</a>
        <a class="btn btn-ghost" href="<?php echo esc_url(home_url('/stays/rain-house/')); ?>">View Home</a>
      </div>
    </div>
  </article>

  <article class="stay reveal">
    <div class="stay-media"><span class="tag">Desert Home · Joshua Tree</span><img src="<?php echo $t; ?>/assets/library/the-oasis/02.jpg" alt="The Oasis"></div>
    <div class="stay-body">
      <p class="kicker">03 — Joshua Tree</p>
      <h3>The Oasis</h3>
      <ul class="stay-meta"><li>Sleeps 6</li><li>2 Bedrooms</li><li>1 Bath</li></ul>
      <p>A private pickleball court, a glittering pool, and panoramic high-desert views — room to gather, play, and unwind.</p>
      <div class="stay-actions">
        <a class="btn btn-solid" href="<?php echo esc_url(home_url('/stays/the-oasis/#book')); ?>">Book This Stay</a>
        <a class="btn btn-ghost" href="<?php echo esc_url(home_url('/stays/the-oasis/')); ?>">View Home</a>
      </div>
    </div>
  </article>

  <article class="stay reveal">
    <div class="stay-media"><span class="tag">Desert Home · Joshua Tree</span><img src="<?php echo $t; ?>/assets/library/the-dome/01.jpg" alt="The Dome"></div>
    <div class="stay-body">
      <p class="kicker">04 — Joshua Tree</p>
      <h3>The Dome</h3>
      <ul class="stay-meta"><li>Sleeps 6</li><li>2 Bedrooms</li><li>1 Bath</li></ul>
      <p>Fall asleep counting stars from a private bubble dome, beside a glowing pool, firepit, and pickleball court.</p>
      <div class="stay-actions">
        <a class="btn btn-solid" href="<?php echo esc_url(home_url('/stays/the-dome/#book')); ?>">Book This Stay</a>
        <a class="btn btn-ghost" href="<?php echo esc_url(home_url('/stays/the-dome/')); ?>">View Home</a>
      </div>
    </div>
  </article>
</section>

<!-- ============ WHY BOOK DIRECT ============ -->
<section class="section why" id="why">
  <div class="wrap">
    <div class="section-head reveal" style="text-align:left;max-width:38ch;margin-left:0;padding:0;">
      <p class="eyebrow">Why Book Direct</p>
      <h2>The same desert. A better way to stay.</h2>
    </div>
    <div class="why-grid">
      <div class="why-item reveal">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
        <h3>Best rate, guaranteed</h3>
        <p>Book straight through us and skip the platform fees. The price you see is the lowest you'll find anywhere.</p>
      </div>
      <div class="why-item reveal d1">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2l2.4 6.9H21l-5.3 4 2 6.6L12 15.8 6.3 19.5l2-6.6L3 8.9h6.6L12 2z"/></svg>
        <h3>Hosted by real people</h3>
        <p>Message the actual team who cares for each home — no call centers, no runaround. Just us.</p>
      </div>
      <div class="why-item reveal d2">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 22V8m0 0l-3-3m3 3l3-3M12 8L9.5 4M12 8l2.5-4"/></svg>
        <h3>Desert perks, direct only</h3>
        <p>Flexible stays, early check-in when we can, and the occasional surprise reserved for direct guests.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ JOSHUA TREE / AREA ============ -->
<section class="area" id="area">
  <div class="area-media"><img src="<?php echo $t; ?>/assets/library/the-oasis/01.jpg" alt="The high desert around Joshua Tree at golden hour"></div>
  <div class="area-inner wrap">
    <p class="eyebrow reveal" style="color:var(--gold-soft)">The High Desert</p>
    <h2 class="reveal d1">A landscape worth the drive.</h2>
    <p class="lede reveal d2">Minutes from Joshua Tree National Park — boulder trails and twisting trees by day, some of the darkest, most star-filled skies in California by night. Our homes are your basecamp for all of it.</p>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="section cta" id="join">
  <div class="wrap">
    <p class="eyebrow reveal">Stay in the loop</p>
    <h2 class="reveal d1">Stay under the stars.</h2>
    <p class="reveal d2">Join the list for new homes, last-minute desert weekends, and direct-only rates you won't find on the booking sites.</p>
    <form class="email-capture reveal d2" onsubmit="return false">
      <input type="email" placeholder="you@email.com" aria-label="Email">
      <button class="btn btn-solid" type="submit">Join the List</button>
    </form>
  </div>
</section>

<?php get_footer(); ?>
