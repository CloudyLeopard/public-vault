---
layout: pages
share: true
tags:
  - me
---
arguably the best fruit in the world because of three things
1. great taste and texture
2. many different kinds
3. requires *practically* zero prep time

so erm im going to try out every apple i can find and rate them on four scales

| scale     | definition                                                              |
| --------- | ----------------------------------------------------------------------- |
| crunchy   | rating from sandy to crunchy. sandy is *objectively* terrible i'm sorry |
| sweet     | rating from sour to sweet. note that sometimes sour is actually *good*  |
| juiciness | rating from desert to rainforest                                        |
| size      | kinda self explanatory                                                  |

> [!tip] freezing the apple
> sometimes if an apple is too sandy or not sweet enough, refrigerating the apple helps. cold apples generally got that nice crunchy texture (at least on the outside). but also refrigerating it sometimes reduces the sweetness, so ehh make your pick.

```dataview
TABLE 
	crunch,
	sweet,
	juice,
	size,
	overall
FROM 
	#apples and -"templates"
SORT
	overall DESC
```
