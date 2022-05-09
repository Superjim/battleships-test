# battleships-test

https://superjim.github.io/battleships-test/

First attempt at making a battleships game in html, css and js

big WIP

currently:

places 5 battleships in random locations

they dont get placed out of bounds

they _DO_ overlap

im trying to pretend theres a client and a server side to this project

the "rendering" is a DOM table, cells get assigned classes by a function that communicates with a "server" side grid array.
Classes have seperate css values, miss = white, hit = red.
