# Body presets

## Moon Go Kaboom
``` js
const planet = [...Array(500)].map(() => {
        let radSize = 35
        let randRad = Math.random() * radSize
        let circPos = Math.random() * 2 * Math.PI

        let randX = Math.sin(circPos) * Math.log(randRad) * radSize / 5
        let randY = Math.cos(circPos) * Math.log(randRad) * radSize / 5

        return new Atom(
                randX,
                randY,
                (radSize - randRad) / 8 + 5,
                Math.sin(circPos + Math.PI / 2) * randRad / 25,
                Math.cos(circPos + Math.PI / 2) * randRad / 25,
                "brown"
        )
})

const moon = [...Array(50)].map(() => {
        let radSize = 8
        let randRad = Math.random() * radSize
        let circPos = Math.random() * 2 * Math.PI

        let randX = Math.sin(circPos) * Math.log(randRad) * 5
        let randY = Math.cos(circPos) * Math.log(randRad) * 5

        return new Atom(
                randX + 100,
                randY,
                (radSize - randRad) / 2 + 2,
                Math.sin(circPos + Math.PI / 2) * randRad / 25,
                Math.cos(circPos + Math.PI / 2) * randRad / 25 - 4,
                "grey"
        )
})

const asteroid = [...Array(75)].map(() => {
        let radSize = 8
        let randRad = Math.random() * radSize
        let circPos = Math.random() * 2 * Math.PI

        let randX = Math.sin(circPos) * Math.log(randRad) * 5
        let randY = Math.cos(circPos) * Math.log(randRad) * 5

        return new Atom(
                randX + 500,
                randY - 500,
                (radSize - randRad) / 2 + 2,
                Math.sin(circPos + Math.PI / 2) * randRad / 25 - 21,
                Math.cos(circPos + Math.PI / 2) * randRad / 25 + 21,
                "black"
        )
})
```

What this does is that an asteroid will hit the planet's moon, and thus, will hit the planet. I expected the asteroid to hit the plaet first, but this was WAY cooler.

## Colorful Matter

```js
const colors = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "pink",
        "brown",
        "grey",
        "white"
]

for (let i = 0; i < colors.length; i++) {
        ogAtoms.push(...[...Array(100)].map(() => {
                let maxRad = 15
                let randRad = Math.random() * maxRad
                let circPos = Math.random() * 2 * Math.PI

                let randX = Math.sin(i / 10 * 2 * Math.PI) + Math.sin(circPos) * Math.log(randRad) * maxRad
                let randY = Math.cos(i / 10 * 2 * Math.PI) + Math.cos(circPos) * Math.log(randRad) * maxRad

                return new Atom(
                        randX,
                        randY,
                        Math.random() * 9 + 1,
                        Math.sin(circPos + Math.PI / 2) * randRad / 5,
                        Math.cos(circPos + Math.PI / 2) * randRad / 5,
                        colors[i]
                )
        }))
}
```

Try exploding it and turn it into a big bang