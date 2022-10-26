const Games = require("./assets/games-list")
const express = require("express")
const cors = require('cors');
const app = express();

require('dotenv').config()

app.use(cors());

app.get("/games", (req, res) => {
    if (req.query.page) {
        const page = req.query.page;
        const limit = 8;
        const All = Games.length;
        const start = page * limit;
        const end = start + limit;
        const Page = Games.slice(start, end)

        if (req.query.category) {
            const category = Games.filter((items) => items.category === req.query.category)
            const Page = category.slice(start, end)
            const AllPage = Page.length
            if (req.query.sort) {
                if (req.query.sort === "price") {
                    Page.sort((a, b) => { return b.price - a.price })
                    if (req.query.search) {
                        const name = req.query.search.toLocaleLowerCase()
                        const Search = Page.filter((items) => items.title.toLocaleLowerCase().includes(name))
                        const all = Search.length
                        res.send({ Search, all, limit })
                    } else {
                        res.send({ Page, AllPage, limit })
                    }
                } else if (req.query.sort === "rating") {
                    Page.sort(function (a, b) { return b.rating - a.rating })
                    if (req.query.search) {
                        const name = req.query.search.toLocaleLowerCase()
                        const Search = Page.filter((items) => items.title.toLocaleLowerCase().includes(name))
                        const all = Search.length
                        res.send({ Search, all, limit })
                    } else {
                        res.send({ Page, AllPage, limit })
                    }
                } else if (req.query.sort === "title") {
                    Page.sort(function (a, b) {
                        var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
                        if (nameA < nameB) //сортируем строки по возрастанию
                            return -1
                        if (nameA > nameB)
                            return 1
                        return 0 // Никакой сортировки
                    })
                    if (req.query.search) {
                        const name = req.query.search.toLocaleLowerCase()
                        const Search = Page.filter((items) => items.title.toLocaleLowerCase().includes(name))
                        const all = Search.length
                        res.send({ Search, all, limit })
                    } else {
                        res.send({ Page, AllPage, limit })
                    }
                }
            } else if (req.query.search) {
                const name = req.query.search.toLocaleLowerCase()
                const Search = Page.filter((items) => items.title.toLocaleLowerCase().includes(name))
                const all = Search.length
                res.send({ Search, all, limit })
            }
            else {
                res.send({ Page, All, limit })
            }
        } else if (req.query.sort) {
            if (req.query.sort === "price") {
                Page.sort((a, b) => { return b.price - a.price })
                if (req.query.search) {
                    const name = req.query.search.toLocaleLowerCase()
                    const Search = Page.filter((items) => items.title.toLocaleLowerCase().includes(name))
                    const all = Search.length
                    res.send({ Search, all, limit })
                } else {
                    res.send({ Page, All, limit })
                }
            } else if (req.query.sort === "rating") {
                Page.sort(function (a, b) { return b.rating - a.rating })
                if (req.query.search) {
                    const name = req.query.search.toLocaleLowerCase()
                    const Search = Page.filter((items) => items.title.toLocaleLowerCase().includes(name))
                    const all = Search.length
                    res.send({ Search, all, limit })
                } else {
                    res.send({ Page, All, limit })
                }
            } else if (req.query.sort === "title") {
                Page.sort(function (a, b) {
                    var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
                    if (nameA < nameB) //сортируем строки по возрастанию
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0 // Никакой сортировки
                })
                if (req.query.search) {
                    const name = req.query.search.toLocaleLowerCase()
                    const Search = Page.filter((items) => items.title.toLocaleLowerCase().includes(name))
                    const all = Search.length
                    res.send({ Search, all, limit })
                } else {
                    res.send({ Page, All, limit })
                }
            }
        } else if (req.query.search) {
            const name = req.query.search.toLocaleLowerCase()
            const Search = Games.filter((items) => items.title.toLocaleLowerCase().includes(name))
            const All = Search.length
            res.send({ Search, All, limit })
        }
        else {
            res.send({ Page, All, limit })
        }
    } else if (req.query.id) {
        const description = Games.find((items) => items.id === +req.query.id)
        res.send(description)
    } else {
        res.send(Games)
    }
})

// Поиск 
// app.get("/search/:name", (req, res) => {
//     const name = req.params.name.toLocaleLowerCase()
//     const Search = Games.filter((items) => items.title.toLocaleLowerCase().includes(name))
//     res.send(Search)
// })
// Поиск 

// Сортировка 
// app.get("/sort/:name", (req, res) => {
//     try {
//         if (req.params.name === "price") {
//             Games.sort((a, b) => { return b.price - a.price })
//             res.send(Games)
//         } else if (req.params.name === "rating") {
//             Games.sort(function (a, b) { return b.rating - a.rating })
//             res.send(Games)
//         } else if (req.params.name === "title") {
//             Games.sort(function (a, b) {
//                 var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
//                 if (nameA < nameB) //сортируем строки по возрастанию
//                     return -1
//                 if (nameA > nameB)
//                     return 1
//                 return 0 // Никакой сортировки
//             })
//             res.send(Games)
//         }
//     } catch (error) {
//         res.send(console.log(error))
//     }
// })
// Сортировка 

// Фильтер
// app.get("/filter/RPG", (req, res) => {
//     const RPG = Games.filter((items) => items.category === "RPG")
//     res.send(RPG)
// })
// Фильтер

// Пагинация 
// app.get('/games/:page', (req, res) => {
//     // destructure page and limit and set default values
//     const page = req.params.page;
//     const limit = 8;
//     const start = page * limit;
//     const end = start + limit;
//     console.log(start, end)
//     const Page = Games.slice(start, end)
//     res.send(Page)
// });
// Пагинация 

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log("Port 4000")
})