// if (thisFolder.inGithub == true) {me.happiness = 1 / (1e-63)}

// sim info
let gravConst = parseFloat(document.getElementById("grav-const").value)
let fricConst = parseFloat(document.getElementById("fric-const").value)
let collRad = parseFloat(document.getElementById("collrad-const").value)
// NOTE: i think it's best we keep it at one otherwise... o ├───┤ o

const version = "v1.0"

document.getElementById("title").innerHTML = `Particle Space ${version}`


const delta = 1000 / 60
const deltaSec = delta / 1000

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")



// camera
class Camera {
        constructor(x, y, zoom){
                this.x = x
                this.y = y
                this.zoom = zoom
        }
}

let camera = new Camera(0, 0, 1)
const keys = {}



// zooming & movement
document.addEventListener("keydown", (ev) => {
        keys[ev.key] = true
})

document.addEventListener("keyup", (ev) => {
        keys[ev.key] = false
})




// atom
class Atom {
        constructor(x, y, mass, vx, vy, color) {
                this.x = x
                this.y = y

                this.mass = mass

                this.vx = vx
                this.vy = vy

                this.accX = 0
                this.accY = 0

                // if (document.getElementById("draw-type").value == "color") {
                //         if (color != null) {
                //                 this.color = color
                //         } else {
                //                 this.color = "grey"
                //         }
                // } else if (document.getElementById("draw-type").value == "dynamic") {
                //         this.color = (color != null) ? color : `rgb(${
                //                 Math.hypot(this.vx, this.vy) * 5
                //         }, 0, ${
                //                 this.mass * 20
                //         })`
                // } 

                this.color = color
        }

        draw() {
                context.beginPath()

                let drawType = document.getElementById("draw-type").value
                context.fillStyle = (drawType === "color") ? this.color : `rgb(${
                                Math.hypot(this.vx, this.vy) * 5
                        }, 0, ${
                                this.mass * 20
                        })`

                context.strokeStyle = (document.getElementById("outline").checked) ? "white" : "rgba(0,0,0,0)"
                context.lineWidth = Math.ceil(camera.zoom / 3)
                context.arc(
                        (this.x - camera.x) * camera.zoom + canvas.width / 2,
                        (this.y - camera.y) * camera.zoom + canvas.height / 2,
                        camera.zoom, 0, 2 * Math.PI
                )
                context.fill()
                context.stroke()
        }
}



// updating velocities
const updateVels = (atom1, atom2) => {
        // distance calcs
        let distX = atom2.x - atom1.x
        let distY = atom2.y - atom1.y

        let dist = Math.hypot(distX, distY)
        let distSquared = dist * dist

        if (distSquared < 1e-6) return;

        // force & acceleration
        let forceMag = (gravConst * atom1.mass * atom2.mass) / distSquared

        // cosines of distance
        let cosX = distX / dist
        let cosY = distY / dist

        // set acceleration. this only applies to atom 1.
        if (dist > collRad * 2) {
                atom1.accX += forceMag * cosX
                atom1.accY += forceMag * cosY

                atom2.accX -= forceMag * cosX
                atom2.accY -= forceMag * cosY
        } else {
                let sepDist = collRad * 2 - dist

                atom1.vx -= (distX / dist) * 0.5
                atom1.vy -= (distY / dist) * 0.5

                atom1.x -= (distX / dist) * (sepDist / 2)
                atom1.y -= (distY / dist) * (sepDist / 2)

                atom2.vx += (distX / dist) * 0.5
                atom2.vy += (distY / dist) * 0.5

                atom2.x += (distX / dist) * (sepDist / 2)
                atom2.y += (distY / dist) * (sepDist / 2)
        }
}




// friction damping
const frictionDamp = (atom1, atom2) => {
        // NOTE: the "d" in this case is NOT an infinetly small number.
        // instead, it means "change in", like the Δ symbol

        let distX = atom2.x - atom1.x
        let distY = atom2.y - atom1.y

        let dist = Math.hypot(distX, distY)
        let distSquared = dist * dist

        let dvx = atom2.vx - atom1.vx
        let dvy = atom2.vy - atom1.vy

        // normals
        let cosX = distX / dist
        let cosY = distX / dist

        if (dist <= 2) {
                atom1.vx *= fricConst * dvx * cosX
                atom1.vy *= fricConst * dvy * cosY

                atom2.vx *= fricConst * dvx * cosX
                atom2.vy *= fricConst * dvy * cosY
        }
}


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

let ogAtoms = []

ogAtoms.push(...[...Array(500)].map(() => {
        let maxRad = 15
        let randRad = Math.random() * maxRad
        let circPos = Math.random() * 2 * Math.PI

        let points = 5
        let randX = (Math.cos(circPos) * (Math.sin(points * circPos) + 4) / 5) * randRad
        let randY = (Math.sin(circPos) * (Math.sin(points * circPos) + 4) / 5) * randRad

        return new Atom(
                randX,
                randY,
                Math.random() * 9 + 1,
                0,
                0,
                colors[2]
        )
}))

let atoms = ogAtoms

// const atoms = [
//         new Atom(-10, 0, 10, 0, 0),
//         new Atom(10, 0, 10, 0, 0)
// ]



setInterval(() => {
        // sidebar
        gravConst = parseFloat(document.getElementById("grav-const").value)
        fricConst = parseFloat(document.getElementById("fric-const").value)
        collRad = parseFloat(document.getElementById("collrad-const").value)

        document.getElementById("zoom-const").innerHTML = `zoom: ${camera.zoom.toFixed(2)}`
        document.getElementById("cam-pos").innerHTML = `camera position: (${
                camera.x.toFixed(2)
        }, ${camera.y.toFixed(2)})`

        // menu toggle
        if (document.getElementById("menu-toggle").checked) {
                document.getElementById("sidebar").style.visibility = "visible"
        } else {
                document.getElementById("sidebar").style.visibility = "hidden"
        }

        canvas.width = window.innerWidth - 2
        canvas.height = window.innerHeight - 2

        context.clearRect(0, 0, canvas.width, canvas.height)

        // movement & zooming
        if (camera.zoom >= 0.1) {
                if (keys["="]) {camera.zoom += 2 * deltaSec;}
                if (keys["-"]) {camera.zoom -= 2 * deltaSec;}
        } else {
                camera.zoom = 0.1
        }

        if (keys["w"]) {camera.y -= 32 * deltaSec / camera.zoom}
        if (keys["a"]) {camera.x -= 32 * deltaSec / camera.zoom}
        if (keys["s"]) {camera.y += 32 * deltaSec / camera.zoom}
        if (keys["d"]) {camera.x += 32 * deltaSec / camera.zoom}

        // reseting & saving
        if (keys["r"]) {
                atoms = ogAtoms
        }

        for (const atom of atoms) {
                atom.draw()
        
                atom.x += atom.vx * deltaSec
                atom.y += atom.vy * deltaSec
        
                atom.vx += atom.accX * deltaSec 
                atom.vy += atom.accY * deltaSec 

                atom.accX = 0
                atom.accY = 0
        }

        for (let i = 0; i < atoms.length; i++) {
                for (let j = i + 1; j < atoms.length; j++) {
                        updateVels(atoms[i], atoms[j])
                        // frictionDamp(atoms[i], atoms[j])
                        // TODO: try to fix the dang function
                        // so that particles wot surpass the 64-bit limit
                }
        }
}, delta)


