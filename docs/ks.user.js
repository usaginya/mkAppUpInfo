// ==UserScript==
// @name         com.chd.ks.pxsys
// @namespace    http://116.181.18.145:8888/jsaas/index.do
// @version      0.2
// @description  http://116.181.18.145:8888/jsaas/index.do
// @author       You
// @match        *://116.181.18.145:8888/jsaas/sys/customform/sysCustomFormSetting/*
// @icon         http://116.181.18.145:8888/jsaas/styles/images/index/icon4.ico
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    // ======= RESOURCE =================
    const avatarImg = 'data:image/webp;base64,UklGRsAaAABXRUJQVlA4ILQaAAAwbgCdASrIAMgAPpFAmkolo6IiJ5QMYLASCWUAyQkBK0BS4Qdj71B7jTnbtOwoJXzmeWX6Hxf85PuL229jPNf2MYK/671yf1ffv8hdQX13/s9+tAD+ff1b/iemB+J5q/Zz2AP1w/5vG3+j+wH/PP75/6f8p7wH97/6/9Z/nfUZ+lf6H/yf6z4C/51/bv+l/hvbS///uV/bv/2+6V+0X//Ngg5H7gHD+3EXEOxf8//PQCv2ByS2qh1vuQGpygB/vyHnNLgnz6f9g0Om5QRfyUauIM1noQ2w6wdZvpUeVEXunL4dp5u6GSJkopLj9GaVHlyWXy/SWxMfRLrda+e6Hk8nbdnt7Mai9CjHYlAPNnZdeztjEMtz9K9E8tmmW/eKD12U1hB2SPI/hR1oGHumNe/WAabK/w41fWxwKpEL9/5SDTph3yd0GZEZsf1jtqByRA3xOrkM8k9qmTUi7Xlt0XS5aNLITnD7JVja4Tk8SSC+Jzw9ztTxQPT+FcGnyOxbc1K5119wxYpJVAinZZr9bw8rZFstLgKZKxPL2wPszU4jDYwQ9yWi99Edzq0S33hd5uTAXhKXpNhpIVwACoi0AGBgRs8ZN/4dO5GZAexL8ySdc+qv/6dV53fT57MtxWTQ8BwZTm2etrkHmG/DTmnf7r7T2QK7Jt+o3g6TU/C6LsZBKyaxXlUNwIY5rSYICM+YqQvC9CmrqgZXXt3xKxK8R2N+RMlo1xzi6bWbvm4Y1ZOD9+39o2BFijfXc+Nt1goL+zJoWVbCMfqUR7p69qR+V/QEQPJnkY1dkOK+AV4BPkzgtUNOqDnvKmTqUkklaq7U4LKkmZ4BR7AwbGu2HPS7rth9K5peLZx7AEcobm3nGTifODaX+dEnAFh82PieuJPlbzQgAlZZ/YV9nDztqJ//TAfVr55a+gIhPgr83kEsDrUxM8KW/YInVCu6B0KIiERFjxI7kF/MFb9qpMVhrEJ43otg3+Q/A+9gcvj1StTo8w8WKfZetxIEMQurX9dmlOmYikBHD9qnlQzXxtGy5wnEXI0Ht7k4fmHEl6LqLmi+n9Vy5my3EG574xhiYt5xAyAswL+vl3Yla27633zCjNTU5GU1Hn2PsZjJ8TiHFOU+5LE+Mpcr9QJIEjenlLw7rKRke/226zO4ENUqxfowPAeUJiR471SdRyQMMAMCAAD+/EAggN7B3kkHFVBtd+1allvtUtVUtviXUmOGt/Hpp8m/xKVEpwOg5avGTe9N0/4UXLZZTzJatjO5aXlqrgEfWZ7uhXLfca1SOcLweYMLGOK0PA5U7TBPD1UlxxBPFvFra1o6/nZMcOUwku0szgEup8ttfMgUrM3NzlkbP27pudFplRX5RwHOzoiT+OGXPjDp/pIqW0zlSQ6fZK7jW1i5V97CMU7Bo4/v1q/d+slwbl58h1oscTPhlZ4C25CAnebqexJLynmuEo37VK5G3PgQ+5LpfyUN885u+jjwSOU7dVF5h8Enk8Nw6syu7BXMZ0sSFOfw3H0/YiapbSxAYisJFqOmICqVwsKERmQVgWHpr2N7fFYygt0haHk16fT5Y0zzyYxGm1/SrIm1x4Jvft0gbgGmAJ7dR2YURS/YSPIwTofI4LIkqrJfSrFdKB65WwsXmRK40ep25n9Jxg0CBZgoZIr+8cqdFR0GKOMHDVzSV3jCw3mB8Yio6XwaCrIpfZAp94TG7dV1X4KffaBH/DHsZEs357YlZzXdZG4RlwneThmsxdpDRTbAWjZCBdo62IqXEe3+msaWmBIw96p/TEiaNfqnIMBQ+t/REfEGui1WEFRahIRFbou0m0JWXLn6cLqsPhZhBdJXx/Oyb8uEunAyXPJeNpCZersVLcDP1dYAiW9xlSkVb9m+BENrGDHZvq0sgg6y86IGrB6tiyZZWrSnAX4C1mBLAfArruZxGaJcsW/KAArot1al2z7lWwEUtEIcWW7iHwrEjEJu+GyBWvPgwdIc3T6j3Cgj1N0x6UoS7c6qbFdbFSSskD014RNGDR9msaU87gF39cgTUvJERSJCtk/Aekh+3JCf2qix2IhcA4lC6JR1KiDNILv2yYvYTqVszU7pSJScKliskZaHPZos43KRiHmFDmKwCfU3iYcQqrL3jYHnzar/9Jkaxv3zhZP6I5WYy5VC9SBihRy1cqhYBjU5Z0qploHCqUd2b9PgaAf5U5AYoNlNBALCXL9YBYte/nFnEhvIbRlhCPQftm2CK3IHesrfN8vAr25uJ145Tm3Qh1eoUIkxABRI3sFAKMl1qsyUbs+q7grUIYEuILuvsPIESaG981Txk6aTbLOLClteVvCxnXGsQ7ORU+mH0bOuoMoFyaFDkWAZnEX8JPcybig5xHLmhWlxCRsXjqvSy8MuwBhGjeZiijNgY6Tm30ohk9RbztNk4oMoH3qjbYPZ9OKFZjf/ldg9GC+oVQVDNKvaY6U3aVIE557nOTTPNc3IDqnQjtIICvLaQby4JR8DkaQ/5mDWyMsJqLiyDx6ehdrfdaWw/SO9PMXpocvyZyVGr1AO6oth+F5Fsy7nfoCvma0RJt1Ui4tWlJHFGr3A8NWuNVGcDcR5UGvELA1Hn9oL17TvhlTMYgxmzemoppDLyM4H8dGbdSqufH6YPKem1RJU0KWDGxn5v17jjaJw35Iae7aos++JyFqXlZ1M8MX4I7HFCFsf3mX/KOfKMDfWkVZp2yWxV+MckPCG8XMNJygKG0JU+ifDPMUY3BirL6LPlwRRjIxnenj3CAlF4mhElCWIsIaPK0OAe1p/Nul06yAiMm5xWfGT6hih/kVg2TKmHCfWv1Qt5fYCrBAbuDpADdqmFHS9TrVgyXR2fA5mBPACWu0hxkkgNr+A0TxcfxwdNAy/eIKYbgcF9k2HNnDnhwq0eD3bpGUYLq6xpBuhBoS+z6T452/zk4v1Tyfin4zX+UIbZy9KcuXVdx6TO9Td9uDQJB+r32a+83XayTSqW4SE6aWFy8QkadxRM1mwa6SRTPlpLZBF+O8bjWOCoMvrv1CR8SgG4eHftgiWTslJ9xjnn8SLmjzOJsoGDcNOzjivEfD1OHrsjXmWMRAbpDNYki6KnoFxKu4wYbXnp+0WJ84YeKMFBtdygbupliMX80GX43fgbKDR69kvLGHSy5+tOEJqgPgHZR4vj4jERSEA7Fi4MG0wwny/17lLViKbSR5+WPZmbuPWS3tmzf5i5C97TTGjrhJQp8sBlL5xmA+z+FSF6Pi0VrhL6aQvp5ObB/muHo4O1AEmuXhg1ar50Dq0MKHXSwhlXXv8TKVlQYO+yGEdk6B4oe37poveZzMfqQJEYXI3Gk0ONA8m2rHi1ZKziD7dvCKOGMYeYuHWvHwHpzfG/pi0wCKuLGRKeOS+pmc1HNoNx3o9Gh9EctYDtgfL579sXewqWyFMWTuU9PkAygBm9ECWTXt4TNLtqBSvjUgtti/AbYG3hOflYV0bWow8OMj7Nr85GUxiroGnuWQRCA3cfS9lP+Pu28R2DEvKN2WO5BtehieWIrKkB/bZ1GmR48flHtfVc4SwEX33m0MfovKBGYkSmRdXb+x/Zdif/VHE6APSuMaubjLTU/GHV6QeDNwdDpZwF5aiDvFu4d4tRoBRS1+GmF534hI7pghgN9/sG5elV0/Qo7yqtC43UiXHbXOPc012g6TJZ2OLElwEHVwQ76jqdFFu2qgf2Gw5yKAPkHH3sWSogLltM/CXJ9bgjn3Xk5GCiGG7zXrNb+WATR8ohTvWQQA8fUhZuEbRf7JiPeTEDavCwLAvxWQ3qmyMPZyqJytY4BgbW4714fIGpRHfZGBM2YbR7q3h2YR+cJuHWJPoaxUASMzn1aQw2WnzgwPql5mHEEA1TuDG2OZHT6UlzGwU7RPPq/MHYfd7O9Sfv/KkIpFgu9RrCm+JV/ndl+ARjcRVBuOwjuwa6832AnON8PXAAS4fs05xacwRU7c3Gck3PdArWkvhDomR+ApToUmqwRMPxfdGiTrQKAGsUMxOy61pO0BbIShxKeWKrNdyFB4ZPgoeCchpp6KQJRNAfAmWaiux1SBmIYhw9XwEQkCsuX/DWygU/a99UbZb+M2f7VdyM2ZPzzGSFY4II7IlbDIxl0JzTPiAGsr1aQNfCN0YSZZ0iIuEOZXwRzVFpLLCXYBF4+MaKHXBwhO+pTcsc7tDyqK8PT3Bt5rSqKM+A1vNrGO6Th/sw90IEandIHIyDldqy8pjlI0yLOdnhmUPI2iPoWhBfnSCNmW/I5dCBRq4QB6bYbQe6dtll801XF+OO8Q7ofCevvZrDyaZ8O1vUu2XYWfZ1GSmOpi4M4PCIpZW2AAitCso1dmpgWCfpXwLov6hgeYNNqgtdCmbJsTuc7qrKcqZ8uYdJ5aryweDkTKxKzqeYQlGjyGqscOj35RaBrJkTwzmeqS2tdVuwmJYlD2VTdimFZn5pPJdSCbZoET+2PSfG2/jkPJIJTHpEN5itEe2YsGMcILaBX4s1xD8Rrn65C56XGi8QWZP4MfsuEvbxJaNrLatusA6OD7BN3G+jk1dvdnDr1Ku0tMRwlx0yjPPqiWVGkbbSvKHPKg8yclaenv63e5DMTmQRAAnE7Ym16GyAaJyIhG66pUJQk9pOT0lULN3iccAvovuDvnAypaxiwmhZv91vHBliM9GcVQAwzKKFG2STQGlWUZi7VHAVJiP8B+J3NspXZ4vNHryGf+j9BLHK2xy7Dz0Mau2wYEyb6FPXUOPiEb1W7B7TrZpDVH3dp9+XEoHOXtujg+LZT7dSkSLXgW5ty1YWJv8m/SBIRuGoIZtNgIIwzwedDm/aktfOQvCXtm3tufTyrRI+Vyhlrf6xFvgPGt3bGvaXUJ9mIgSM9hbyEk0cX2bIizF6O/4bS0VR1FOqs2Eo0sWUzl0/bmJ76WEH/n09KlkR9ovRQ8/AM6EM2iJTuyc9FypK/kxMzGJh8O0Cb6HrJIqeY9JUbF9zxpMSgin4Kx6aJJ5D4FauurtcC2kSc59FAeFOcOV+xXqVznpAGgvc0MwIk1RlTA7b5Cc1NORnQxC6xhg8MNygWiT2yV5ps0OeTmajhifc2hgOBKs4Tnz+vafX8o68nKqSJyhwPdc/AXgxR0xQIU7s6JOgjeTLGQgnL9uceBOzeQDw4QV/DhCOs6YKcs5GUYOxiqKlCukYV84AhjFZCbM77NeA7V2KI8x2r9P8yVztmRz/KMIJCmz2yT1S9UCuJgG0kAlYcNIjUaFNbvWMbuAPTp221tfx6t1OdXsOD7lQqt+8e967PDgRzHKEfmSLzPp7pSa/CSsE9EC777dOZLNTJygvn8btRRZxRFOfz4uIU/jehcArn65H5KctHvO6GK5SCvIkGZi1eeLt5Z0THT+ISrSV0lN8RVU67T0/5yTXws31C9KOsjtfqQDol3ycG+TIwAoybtKRU9LZwsXBv/Oeh9N7iSaI3Bs3j+4QarEOQXG/qfRhktba27eA2biTQxn/24h3BO+j3j/UdBG2FLtcrA7OiSoK2NBFNkfpATrLRQMk9bIfG2giKMu+qEZNDaBK89BSHhRv9m+mlmgG3WEuHGv09XwvxMzXk87l+CRa17PueFaG9Sya5aaYLPsUl+qPQ8+NwYDa7bFEmV0vNH1LKnsxcx/0aTWtqHdHyFT/8R6ZicJPUN9sm4d1uY9YI/786Cb5GfO9jJrb+DKo9LpD+O8zqaxHMq6u4R7eB5EleENcDtEoxZLocYVn4TnxpFutcgwpODb6futSwhKmKKnKdEKTzPvTP0TnZT8yFbmAANpbSHxfgEo+Recc3prqeBJ5Q7LumJ9ElAKvxJDklJFQONUOK0ApcBLD9E9uySUqy68PnsYZ/+B3ZRLf6CyyROSEghgSuNGhszCoKkSS0v4mtIweKs6JV1EBhoUNWP5knYJjKxcchh/g+32sB1s3SYVILtDXfiGSi/LAJB6Beobvu801524zndFT+7AzQ0ApabTgU2yf06pleU8enE82Bo/2DkdDLB+qRjFvWOpQlk5XLjcZgrbmTaxi7GOs7amGVNPyccmN2Y0GaXcJpgV5Pj8ByfKcnWx7mi9SNw/pcFEKInEBLNKojt5UUlKyk/f8Fz90Z3wbvnk9FGN1ZCfaHoCgNI20XI9OPRGBDZYnx6Ix3+hKnDydITtOXyCJ29hwT/TuZ5n9v9mno3VUl5F8Efebri/xT0qg5Op1c/b+/c2kTkXLLSznF+/CujUTYX4NCQrvNKxWDpTSmYkRy4Nw9YU3zgCFQWWrSsnDFN1eeG1seUKTXAkVE8jH/t5o9e6nRUVAijXjmfspmSLb0q5oMIzU9y1qJMVMf7789EkdWcJk9XOWJUcfDu2Yy3Wui8tgqyvQUOTA0R6cEFeVoU9OErkivkvduph4XSLmw6rAdTcQmwTLzDaIpxWoYqwzWsbVj9wAatMruKRvXBGPaEptQczh0PSUfSjHuDI+Jw/r3Y3I9xStdDMtGTtc0IdGTgsEY7fXL1JoBifyEEknjnA3XTdM8iUxXNrWWddTQ/jEL4i+oFQQqTSrr5GQs20vJiD27oJDslIACNAia8SrqYDNUksbF18DASjsjFk/Hjq4Fnuaj8k6ISXJ3F2uif6sRcrmRuEzg7sujZ5hdNLbMNjEq7/83DWJygYiZ6OD0o2Uy/ZkNcyd0QnuTtnfNY88oVgBVK8fF8wUHUypC/DuvRmSfnlttqCAyeAx8888qtXBTaGPhIu7naS94shjeQFPp1PYeHJkctSIanUGVik8fAvkJ/zftaTTT35/0s6P4oJp5qhyErvK5MGFZ4Oa9X/Rp4IlnxfFJH4KsCAMmvmm9ELYPwoD0yOrWS7jmbfsTo2juOhTPKH0aIqM3xNizR7HPpBBvzdv2S//bx5IJAkfS97KtfFhh5Ewy7LcfYCc72JnMIf4FVVQURZ+X/vTftvuPOOJnrI2rtNLMhE80fH6cdGD0pnOTUSuGujiNczEo/EwCv+y9pEy0dG60pQ6LFACjoCVOQvGfgB2wonxwSm2TM7vHgoUmvbLINJ6HCLXRqgEWkcgSmJEwJ52LR8W6deoQJDDT8RLLIfLHsXM9ji8dOF8hg/9gDCEiDa/+Vi4HdV/46A7qVh+wRlGDzsrLehgb0JNiwbBAR8seEOOsIvMkxexIZgYdN6MYWiHqaKq+2b/glyGFQ4vv+fULrQluEJNKVgcFOyyLb3s4J9jwvDPxXJn8vvRilun9E1TgubqHR6QmNrSMJ6aiaHy5HQUroGiBN66IfSIMklySbPOi5H+zFx+X1mWqRrAGP7iRkRIe+gqwp7BP9dMhdDRUS/2MooVcb6ZmrYYy9spd+7TmZc6/sMGDcVoGDMLG/P1XBg98ULU/Ipo5RNR3m3aJq02cgMWcvi/XP23RnQRnYg/SCW/4Hl7yEGxKqBKgDrdcFycjVE8JGTKi1/6TR/ku+bbz+C0FMzRtge+HT6J/h5xx+1K7b3jWIanRODmvIotKR3qhlUfrKmVJ9BHpB453sUprRlEM6+3whYdL4XZ6d06Vq/v+hyNRPjBCNtxGN2leRv/r0bmrvmzmDCiC+zy/sketPKZsVyAgassSHs/q+4JczpXN8I5jxp5Vy8dYJB7Sfe4xRqDDjE0IfP6twZJcFxuFXtWebo1N+lhCdUFgreJIf/5/kytSG5SPBMX+zdWXI1qiVMDbOh5fF7oKUNpQNUUe4eu89aME1bmL2Cq7sx+963kI+zTfP00mGFmImBeLrhulcmLbtC0sUJ6iuGQcumdOSdCRGOyRP+MCKzlT+fx9Y8dVMhuiu8ICFyD4JOsnf4UiWBE+ScJ2noFxcB3jZWS9k0xgxZff4IlE1FAFGpHxvasNNYyNcIOeFTBpXfVNEDYWVj66f3CyFMVC3AUXRcsaUKjP12CEeadd/z1/TQQ57B5FP4A792vH/4PoAJQ+cvNMoIYsvZ4V3a5IBcI/B2f/OXChlPkScsWcap73loOMIHrGjkQ95LaCuf9oH+cNf5y+CXcBgiiFCpx88I3hoxVAep1NQBWH9sQ3JAaMn8jCGnZHTnLW12NjpTKfHn/A2x3xCiXtFgb7u+wgHt5l0JOJE/FfKwTJbhY8cyjCrgTDw5hhLVdb1FgtLtZVh9bOVsOvTYQy7u9TavbojEsD2bUhADna8vPQwQMnsdRq7ggveoGzY6JWYat9HPRkE0ww2IHl25F8Cm2JUu5zKNSg7oVyWZy7jXETXcHhhGYE52BP0rFAiJkiU3bmeRkYFLzHFyCvsIKNrKTK9t/jvIW27hcrB3YCmSOIZ+DTZTir5l/txzQfedz2y8R7pefsmt6u6KOLkztkv+7x2YdSyLYTp0mAJM86QA6OH1cFvnsf5tmLvxnQl6Y73b58shb8B4Gq4YF0m4agaclVrAgVeXUI6pMe9exFBsKNROTApYFpcbZLI4UzwIs1My4RaVhqmT0StG1FgcKc7TAw6/IOZ4+kFRx8gyMaG+dCWwa/f82u20Uou0GcpYfZRduJdZhZAeJPhSbCVFSATZpmFBDkx/J3XgUBJu6clb6s/bS4rOMMARMQIci0Z7Hkh7oUJPkvaON0IQ8Hwb2gOd8T54q+8JqPLGWdBI536u0L9WMnUAahS55HmmjB2kPaYByNA3lfgWmz7PObgwGSyyyMhItnzg4HN2cma2Sp3qqLj3zFn2IMUI4wtePK15K2YK6V7rm+aybFmToc7QgyQKMIF1igGsZsr+79GVjGnWEx7yRqvaoRYHTd2oDQXTEkb5SG+MxmopjlphOdSOD6JcH3GtCouJSa1d+TN5DjROVm8gmr078eJDM1SuElTLmOLVIUsYoMS0mEh6R4ErJzSbS5dL2d1KKErM3pYrgpNySKArhsRL1wd8FQFLJE+9v+qc5vK0B2tXFGnBPNmn1ROBNMgw4BlpjFn0mB744L+cNoeXrRC2fK34GWveQfV78DV23YigDMZaH1KbJ9NQoMKAkm7ZQ7cMX7R9vcZyqH2Mehe/Nui6EpkVX8i/P4IqdtdU1guWn/oaQ5PD8V1bhRM/8p00nyWOFXz2IJIkFOIDjSAzSzOyVSDPCyeJAPXkYOXS3QD/M/lCZxzlUafm/Xe0KsKD2TQ4HoiwnBBkDqYRYq7khAAAAA==';

    let antiCheatPatched;
    let searchAnswerEnd;
    let customStyle = `
        .customform {
            width: 100%;
        }
		.el-radio__input.gm-is-a .el-radio__inner:hover,
		.el-checkbox__input.gm-is-a .el-checkbox__inner:hover,
		.el-checkbox__input.is-indeterminate .el-checkbox__inner:hover {
		    border-color: #409eff;
		    background: #409eff;
		}
		.el-radio__input.gm-is-a .el-radio__inner:hover:after {
			-webkit-transform: translate(-50%,-50%) scale(1);
			transform: translate(-50%,-50%) scale(1);
		}
		.el-checkbox__input.gm-is-a .el-checkbox__inner:hover:after {
			-webkit-transform: rotate(45deg) scaleY(1);
			transform: rotate(45deg) scaleY(1);
		}
    `;

    // ======= 消息提示插件 ================================
    const mkStyle = `
       <style id="mk-style">
         .notification-container {
           display: none;
           position: fixed;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -40%);
           max-width: 460px;
           padding: 20px;
           background-color: #f9f9f9;
           border: 1px solid #ddd;
           box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
           z-index: 9999;
           opacity: 0;
         }
         .notification-show {
           opacity: 1;
           transform: translate(-50%, -50%);
           transition-property: opacity, transform;
           transition-duration: 0.2s;
           transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
         }
         .notification-hide {
           opacity: 0;
           transform: translate(-50%, -60%);
           transition-property: opacity, transform;
           transition-duration: 0.2s;
           transition-timing-function: cubic-bezier(0.55, 0.06, 0.68, 0.19);
         }
         .notification-container .notification-content {
           display: flex;
           align-items: center;
         }
         .notification-container .notification-image {
           min-width: 60px;
           min-height: 60px;
           background-size: cover;
           background-repeat: no-repeat;
           background-position: center center;
           border-radius: 50%;
           border: 1px solid #ff9cae8a;
           margin-right: 10px;
         }
         .notification-container .notification-text {
           flex-grow: 1;
         }
         .notification-container.closeable:hover {
           cursor: pointer;
         }
       </style>`;

    $('#mk-style').remove();
    $('.notification-container').remove();
    $('head').append(mkStyle);

    let notification = $('<div class="notification-container closeable"></div>');
    $('body').append(notification);

    function hideNotification() {
        let $notification = $('.notification-container');
        $notification.removeClass('notification-show').addClass('notification-hide');
        $notification.data('timeoutHide2', setTimeout(() => {
            $notification.hide().removeClass('notification-hide');
        }, 600));
    }

    function showNotification(htmlContent, duration = 3000) {
        let $notification = $('.notification-container');
        $notification.html(htmlContent).show();
        clearTimeout($notification.data('timeoutHide1'));
        clearTimeout($notification.data('timeoutHide2'));
        $notification.data('timeoutHide1', null);
        $notification.data('timeoutHide2', null);

        setTimeout(() => {
            $notification.addClass('notification-show');
            $notification.data('timeoutHide1', setTimeout(hideNotification, duration));
        }, 10);
    }

    $(document).on('click', '.notification-container', hideNotification);


    //查出答案并设 是答案的选项在鼠标悬浮在选择框中会显示选中状态效果
    function searchAnswer(questionType) {
        const questionTypes = ['singleContent', 'mutipleContent', 'judgmentContent'];
        const types = questionTypes.filter(item => item.includes(questionType));
        if (!types || types.length < 1) {
            console.warn('未找到匹配的题型');
            return;
        }

        const typeId = types[0];

        let questionArr;
        questionArr = typeId.includes('single') ? unsafeWindow.examInitJsonStr.singleChoiceArr : questionArr;
        questionArr = typeId.includes('mutiple') ? unsafeWindow.examInitJsonStr.multipleChoiceArr : questionArr;
        questionArr = typeId.includes('judgment') ? unsafeWindow.examInitJsonStr.judgmentArr : questionArr;
        if (!questionArr || questionArr.length < 1) {
            console.warn('未找到匹配题型的答案数据', typeId, questionArr);
            return;
        }

        $(`#${typeId}>div`).each(function (index) {
            const currentDiv = $(this);
            const optionsDiv = currentDiv.find('label');
            const question = questionArr[index];
            optionsDiv.each(function (index) {
                const optionDiv = $(this).find('span[class*=__input]').first();
                const answerValues = !question ? null : question.standardAnswervalue;
                if (!answerValues) return true;
                if (answerValues.includes(index.toString())) {
                    optionDiv.addClass('gm-is-a');
                }
            });
        });
    }


    // 查询并设置答案
    function searchAnswerAndSet() {
        if (searchAnswerEnd) return;
        searchAnswerEnd = true;

        searchAnswer('single');
        searchAnswer('mutiple');
        searchAnswer('judgment');
        console.info('答案已查询!');

        // 答案取得提示
        const GotTheAnswerNotificationHtml = `
                <div class="notification-content">
                <div class="notification-image" style="background-image: url(${avatarImg})"></div>
                <div class="notification-text">
                <strong>GO!!!</strong>
                <p style:"font-size:8pt">答案Get!!!</p>
                </div>
                </div>`;
        showNotification(GotTheAnswerNotificationHtml);
    }

    // 判断网页全屏状态并执行操作
    function onFullScreenChange() {
        // 网页进入全屏后的操作
        if (document.fullscreenElement && !antiCheatPatched) {
            antiCheatPatched = !0;
            document.onkeydown = null;
            unsafeWindow.isFullscreen = () => 1;
            unsafeWindow.top.document.querySelector('.mini-tools-max').click();
            console.info('网页已全屏! 补丁全屏检测函数!');
            // 答案查询
            searchAnswerAndSet();
        }
    }

    // 为了兼容不同的浏览器，监听多个可能的事件
    document.addEventListener('fullscreenchange', onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange);
    document.addEventListener('mozfullscreenchange', onFullScreenChange);
    document.addEventListener('MSFullscreenChange', onFullScreenChange);


    $(document).ready(function () {
        GM_addStyle(customStyle);

        let isExamPage = location.href.includes('Exam');
        isExamPage = isExamPage || location.href.includes('Answer');

        setTimeout(() => {
            if (unsafeWindow.examInitJsonStr) {
                searchAnswerAndSet();
                return;
            }

            if (isExamPage) {
                const noAnswerNotificationHtml = `
                    <div class="notification-content">
                    <div class="notification-image" style="background-image: url(${avatarImg})"></div>
                    <div class="notification-text">
                    <strong>NO...</strong>
                    <p style:"font-size:8pt">无法Get答案哦...</p>
                    </div>
                    </div>`;
                showNotification(noAnswerNotificationHtml);
                return;
            }
        }, 2000);
    });
})();