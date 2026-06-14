#!/usr/bin/env python3
"""Turn the cream-background Night & Rain logo into clean transparent PNGs:
   - logo-dark.png  : original colors (navy + gold) on transparent  -> use on LIGHT backgrounds
   - logo-light.png : dark ink recolored to ivory, gold kept         -> use on DARK backgrounds
Both auto-cropped to the logo content with a little padding.
"""
from PIL import Image

SRC = "site/assets/brand/logo-primary.png"
OUT_DARK = "site/assets/brand/logo-dark.png"
OUT_LIGHT = "site/assets/brand/logo-light.png"
IVORY = (246, 242, 234)

img = Image.open(SRC).convert("RGBA")
px = img.load()
w, h = img.size

# background = average of the four corners
corners = [px[0, 0], px[w-1, 0], px[0, h-1], px[w-1, h-1]]
bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))

def dist(c, d):
    return ((c[0]-d[0])**2 + (c[1]-d[1])**2 + (c[2]-d[2])**2) ** 0.5

T0, T1 = 22.0, 62.0  # fully transparent below T0, fully opaque above T1

dark = Image.new("RGBA", (w, h), (0, 0, 0, 0))
light = Image.new("RGBA", (w, h), (0, 0, 0, 0))
dpx, lpx = dark.load(), light.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        d = dist((r, g, b), bg)
        if d <= T0:
            alpha = 0
        elif d >= T1:
            alpha = 255
        else:
            alpha = int(255 * (d - T0) / (T1 - T0))
        if alpha == 0:
            continue
        dpx[x, y] = (r, g, b, alpha)
        # luminance to tell dark ink from gold
        lum = 0.299*r + 0.587*g + 0.114*b
        if lum < 95:                      # navy / charcoal ink -> ivory
            lpx[x, y] = (IVORY[0], IVORY[1], IVORY[2], alpha)
        else:                             # gold / lighter accents -> keep
            lpx[x, y] = (r, g, b, alpha)

def autocrop(im, pad_frac=0.04):
    bbox = im.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    pad = int(max(im.size) * pad_frac)
    l = max(0, l-pad); t = max(0, t-pad)
    r = min(im.size[0], r+pad); b = min(im.size[1], b+pad)
    return im.crop((l, t, r, b))

dark = autocrop(dark)
light = autocrop(light)
dark.save(OUT_DARK)
light.save(OUT_LIGHT)
print("dark  ->", OUT_DARK, dark.size)
print("light ->", OUT_LIGHT, light.size)
print("bg sampled:", bg)
