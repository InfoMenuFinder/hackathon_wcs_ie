const express = require('express');
const path = require('path');
const server = express();
const port = process.env.PORT || 8000;
const connection = require('./conf');
const cookieParser = require("cookie-parser"); // Necesario para que se pueda leer la cookies

server.use('/', express.static(path.join(__dirname, '/build')));
server.use('/map', express.static(path.join(__dirname, '/build')));
server.use('/menu', express.static(path.join(__dirname, '/build')));
server.use(cookieParser());


server.set("port", port); 




// TODOS LOS MENUS
server.get('/api/menus', (req, res) => {
    console.log("GET /api/menus")
    connection.query('SELECT * FROM menus LIMIT 20', (err, results) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log(req.cookies)
                //identificación del usuario a través de cookies del navegador 
                if (!req.cookies || !req.cookies.uid)
                    res.cookie('uid', Math.floor(Math.random() * Number.MAX_SAFE_INTEGER), {
                        httpOnly: true 
                    })
                res.json(results);
            }
        });
    }
);


// UN MENU
server.get('/api/menus/:id', (req, res) => {
    connection.query('SELECT * FROM menus WHERE id = ?',[req.params.id], (err, results) => {
        // PASO 1: Si hay "err", haz console.log() y manda 500    
        if (err||!results) {
                res.sendStatus(500)
        }
        // PASO 2: Si el array de results esta vacio, manda 404
        if(results.length === 0){
            res.sendStatus(404)
        }
         else {
        // PASO 3: Si todo va bien, manda el primer objeto del array
            res.json(results[0]);
            }
        });
    }
);


server.patch('/api/menus/:id', (req, res) => {
    const data = {
        menu_espanol: req.body.menu_espanol,
        menu_english: req.body.menu_english
    }
    const secreto = req.body.secreto;
    const id = req.params.id;
    connection.query('UPDATE restaurante_menu SET ? WHERE id = ? AND secreto = ?',[data,id,secreto], (err, results) => {
            if (err) {
                res.sendStatus(500);
            } if (!results.affectedRows) {
                res.sendStatus(403);
            } else {
                res.json(results);
            }
        });
    }
);

// // UN USUARIO
// server.get('/api/usuarios/:id', (req, res) => {
//     connection.query('SELECT * FROM usuarios WHERE id = ?',[req.params.id] (err, results) => {
//             if (err) {
//                 res.sendStatus(500);
//             } else {
//                 res.json(results);
//             }
//         });
//     }
// );




// TODO: Documentar mas
server.get('/api', (req, res) => {
    res.write('GET    /api/menus                   List of menus\n');
    res.write('GET    /api/menus/:id               Un menu\n');
    res.write(                                                  '\n');
    res.write('POST   /api/logout                  Log out profile \n');
    res.write('POST   /api/login                   Log in profile.\n');
    res.write('GET    /api/users/me                User details (logged in).\n');
    // res.write('Hola soy eva');
    res.end();
})




server.listen(port, () => { 
    console.log('This is on port ' + port);
}
)