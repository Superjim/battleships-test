# battleships-test

[Live Demo](https://superjim.github.io/battleships-test/)

First attempt at making a battleships game in html, css and js

press F12 for cheats

big WIP

currently:

places 5 battleships in random locations

they dont get placed out of bounds

they dont overlap! though my code isnt elegant

im trying to pretend theres a client and a server side to this project

the "rendering" is a DOM table, cells get assigned classes by a function that communicates with a "server" side grid array. Each cell has an onclick event listener.
Classes have seperate css values, miss = white, hit = red.

I want to finish this project as a multiplayer app using React
