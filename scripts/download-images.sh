#!/bin/bash
# Downloads curated property images from Hospitable's CDN into site/assets/img/<slug>/
# Re-runnable; skips files that already exist and are >20KB.
set -e
cd "$(dirname "$0")/.."

dl() { # dl <slug> <nn> <url>
  local dir="site/assets/img/$1"
  local out="$dir/$2.jpg"
  mkdir -p "$dir"
  if [ -s "$out" ] && [ "$(stat -f%z "$out")" -gt 20480 ]; then return; fi
  curl -sL -o "$out" "$3"
}

B="https://assets.hospitable.com/property_images"

# The Night House (8878daf6, tiny home, Yucca Valley)
dl night-house 01 "$B/1574126/1HKDOBwwirdfvtDwoXMNc9jzZlskI4YAOWh0eqiI.jpg"  # pool sunset hero
dl night-house 02 "$B/1574126/I5T1IjKfxLDZXmcnsr0JRo1aHFsG6agpwAMq2HmR.jpg"  # studio interior
dl night-house 03 "$B/1574126/gE6KtO02v5iApNBz5UFgUW24q9ZLdN06aSDtTeQo.jpg"  # pool + hot tub stars
dl night-house 04 "$B/1574126/ZUtbCE4ryIsHAusrkKgCpFsQSC8qeDuWcyiOGCz7.jpg"  # stylish studio
dl night-house 05 "$B/1574126/lXM68jZ0K67F0ULThBXilAWKXbgcUXdG7OMmloso.jpg"  # exterior night lights
dl night-house 06 "$B/1574126/zfvvThQBawJJZ2Nl35gTzPHmpWOS8jSSO4DtVIfE.jpg"  # fire pit
dl night-house 07 "$B/1574126/j87RffBTYoEoE8AhGneQ7HH1fGD4X70imSzvBfts.jpg"  # sauna
dl night-house 08 "$B/1574126/kWPMPJlBriFjIHkiqEVDigtqavPKJeWk3RR28c6B.jpg"  # mini golf
dl night-house 09 "$B/1574126/NcGwArdF1mYBiSgNl1bZu8aWeMlAhVd4inrktFDY.jpg"  # hot tub
dl night-house 10 "$B/1574126/P2vRt1WZIl17EJIwzldQ2wSFgIbjv6GCsceV8sI5.jpg"  # kitchen

# The Rain House (e82db06c, anime tiny home, Yucca Valley)
dl rain-house 01 "$B/1495408/VtJ5sCN3dnCIXUZwZa2jcxT0Hmn83xogb9BtPxqS.jpg"  # pool mountain sunset hero
dl rain-house 02 "$B/1495408/97KvZnBf5wsVPfJuBlZGOuQtCdibt6VNfqIBqyKj.jpg"  # outdoor movie mural
dl rain-house 03 "$B/1495408/PKtGrKSbmvo9XP1yoeleSwOPxOgZjzec5wSUSqSK.jpg"  # king room
dl rain-house 04 "$B/1495408/oXJAWb1FmlBWdgCTCKdMCl9ZWABpya7GOBKFa5bC.jpg"  # living room
dl rain-house 05 "$B/1495408/YTX5jXGkLjfuoAJqBzJNzD7pE0MnivdhoYm3ubPA.jpg"  # grill
dl rain-house 06 "$B/1495408/9ka1t5oryGYRSPfieJhZwkGYnjJEaLsI324j6fJD.jpg"  # mini golf
dl rain-house 07 "$B/1495408/CO22nSBg0ehlawB07nX3igIh6atYz2noJZ604N3r.jpg"  # anime mural
dl rain-house 08 "$B/1495408/GTOpvIBQ1StuBZh4kMRGVUjR34VtVYr8a33ayN1c.jpg"  # jacuzzi
dl rain-house 09 "$B/1495408/WTJVL2CW18GvRCywQnGngi6wQVcwIDmwFLvENBRm.jpg"  # sauna mural
dl rain-house 10 "$B/1495408/cUlSKA2VZjFFCrTNRnsdqJ7sWvrvSsbVJ8l3UMNn.jpg"  # kitchenette

# The Oasis (bf0f6e37, 2bd, Joshua Tree)
dl the-oasis 01 "$B/1528000/LiTSDaGuUqUsaRxflECVjGYeQsP698pxCaFqnTe3.jpg"  # hero
dl the-oasis 02 "$B/1528000/uoJVHTMjoEx4P2Hd5EBMKX2J1ZDpozlALVcPSXRI.jpg"  # pool + jacuzzi sunset
dl the-oasis 03 "$B/1528000/jgpwXAMzi32RlifO7ecHzvP1MivxXX1JSCr3p12g.jpg"  # stargazing day beds
dl the-oasis 04 "$B/1528000/vBOgYkDz0yiRS2RxNNBfBXAK2ShOfRHnAHGvULd5.jpg"  # living area fireplace
dl the-oasis 05 "$B/1528000/PotwEUV6dEKtZUCY6fgz5ylT6kbiRVm6c9uzVNUF.jpg"  # bedroom 1 king
dl the-oasis 06 "$B/1528000/b07tI41nbQIQttrnZlYYSW03Q7XSWwWW5P7INMr5.jpg"  # bedroom 2 king
dl the-oasis 07 "$B/1528000/zqoZWa2gUoGM4couJYyj8TXjpCLWhVA8Fgj1g05I.jpg"  # kitchen
dl the-oasis 08 "$B/1528000/BN3z0i41JKBybhUn94NXxF0YxzuUXTFrXIZLmfHI.jpg"  # pickleball court
dl the-oasis 09 "$B/1528000/EW3gJO0oVn43FIWZSFElQqD40QuQ9p9q3QPiTKpz.jpg"  # bbq outdoor dining
dl the-oasis 10 "$B/1528000/gUrLQEazcQyupSZFpMdCPhAiITG2H3mgGkzL05sT.jpg"  # outdoor bar + tv

# The Dome (547bbb9c, 2bd + stargazing dome, Joshua Tree)
dl the-dome 01 "$B/1528002/fy3t9OEYlRKTuWQhulIywMnmrgElZtBsFU3JnDij.jpg"  # hero
dl the-dome 02 "$B/1528002/9mwA9okUNC45gOJS4XPvtyvfaHOXv1e1nk2jtgez.jpg"  # bubble dome
dl the-dome 03 "$B/1528002/g55YODf9iCaPP2kz0RQyGnm8McFJH5Sw4cQXNxm5.jpg"  # backyard starry night
dl the-dome 04 "$B/1528002/fZSbhe0GEac7FV2VFBhcc3vdFnt27uPeNoJ7HGEa.jpg"  # aerial night sky
dl the-dome 05 "$B/1528002/IKaJbU2cJKf6iQn7iHL3sOHWMN3PeaK08u1A9APE.jpg"  # outdoor star beds
dl the-dome 06 "$B/1528002/YawR0H3ZiWGEoirfBlcf0kfzrMXUdkjBNbG5zf5V.jpg"  # fireplace + 65in tv
dl the-dome 07 "$B/1528002/72lLPnuMJpzdXFWqoUQkeP72E4TvYgVBUbOSllpG.jpg"  # king bed
dl the-dome 08 "$B/1528002/kjGG5u2l1xhnaxLhcnIAWI3H4euzDMlnFP5pQ87t.jpg"  # kitchen pool access
dl the-dome 09 "$B/1528002/wEmDcIBBWuNvCcv1JU4dePrxMx48CQxbNkX8zWhC.jpg"  # pickleball
dl the-dome 10 "$B/1528002/qTxsZGnapu5PuIUuYSYRXNL3baM33TeGPEMAE7F7.jpg"  # pool sun chairs

echo "Done. Sizes:"
find site/assets/img -name "*.jpg" -size -20k -print | sed 's/^/SMALL-FILE-WARNING: /'
du -sh site/assets/img/* 2>/dev/null
