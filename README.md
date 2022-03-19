# Rising Constellations Mods

Unofficial modding for the 4X strategy game [Rising Constellations](https://rising-constellation.com/).

# Steam Modding
Currently, I have found promising data and a useful injection point inside of a javascript file in the Steam version of the game.

To find where the bulk of the game's logic is, I recommend looking inside `SteamLibrary\steamapps\common\Rising Constellation\dist\main`. 19.js is the file with much of the game logic.

The most important global we care about is `y.a.state.game`. This seems to contain nearly everything about the game state, and is updated regularly.

Note, the game does not seem to send data for things the current player can't see, which is a good thing. That also means any data files you get from others will inevitably be from that user's perspective and what that user can see.

With this, I have exported data, which the following sections break down.

# Debugger on the Running Game
* Download [NW](https://dl.nwjs.io/v0.54.0/)
* Unzip the contents
* Copy the contents into the Steam directory for where Rising Constellations in installed
* Run the game
* Hit F12 once its loaded to get the debug window open

## Exported Data
It is recommended to blank out the auth object after exporting y.a.state.game. I don't know if that can be used to auth as another user, but better safe than sorry.

`y.a.state.game` and `state.game` will be treated synonymously in this document. In code it will always appear as its full form.

Exporting the entire `state.game` object is massive. Even for a small 1v1 tactics game the total data exported was 1.7MB of JSON compacted, and 3.5MB of JSON after run through a beuatify tool like https://codebeautify.org/jsonviewer

### 1v1 Tactics Game Data
`alldata formatted tactics game 1v1.json` is all of the data from `state.game` as a JSON blob. The exported game is from a tactics game with myself (player Granite) and another player (Slaught). This snapshot was taken near the start before much was built and before any systems were taken.

Interesting findings:
* state.game.galaxy - Describes positions of black holes, systems, and edges between systems. Appears to also contain some ownership information. By size, this is 90% of the file size.
* state.game.player - All the data of the current player. Tech, policies, characters, owned systems, their overview


# Re-Used Terms
I have noticed that some things in code are named differently from what they are in game. Here is a mapping of what I think they go to.

* Speaker = Siderian
* Spy = Erased
* Admiral = Navarch

# Getting Data Out
Copy 19.js into your game's install directory and replace the existing 19.js file. Start the server, receiver.mjs, and
then start the game. Data will be streamed to the receiver and if you have access to the Google Sheets, data will
be dumped into them.