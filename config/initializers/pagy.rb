require "pagy/extras/overflow"
require "pagy/extras/size"

Pagy::DEFAULT[:items] = 20
Pagy::DEFAULT[:overflow] = :last_page
Pagy::DEFAULT[:size] = [1, 2, 2, 1] # [outer, before, after, outer]
