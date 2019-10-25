# wordmap-react-toolkit

[![npm version](https://badge.fury.io/js/wordmap-react-toolkit.svg)](https://badge.fury.io/js/wordmap-react-toolkit)

A React toolkit for the wordMAP prediction engine. 

## Install

```bash
yarn add wordmap-react-toolkit
```

## Usage

The quickest way to get started it into set up the `Playground`.
This will display a basic UI where you can perform some predictions.

```jsx
import React from "react";
import {Playground} from "wordmap-react-toolkit";

function MyComponent() {
    return (
        <Playground
          sourceText="περὶ δὲ τῶν νεκρῶν, ὅτι ἐγείρονται, οὐκ ἀνέγνωτε ἐν τῇ βίβλῳ Μωϋσέως ἐπὶ τοῦ βάτου, πῶς εἶπεν αὐτῷ ὁ Θεὸς λέγων, ἐγὼ ὁ Θεὸς Ἀβραὰμ, καὶ ὁ Θεὸς Ἰσαὰκ, καὶ ὁ Θεὸς Ἰακώβ?"
          targetText="But concerning the dead that are raised, have you not read in the book of Moses, in the account about the bush, how God spoke to him, saying, ‘I am the God of Abraham and the God of Isaac and the God of Jacob’?"
          memory={[['Θεὸς', 'the God']]}
        />
    );
}
```