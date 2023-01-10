const functions = require("firebase-functions");

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const express = require("express");

const cors = require("cors");

// main app
const app = express();
app.use(cors({ origin: true }));
app.get("/", (req, res) => {
    return res.status(200).send("how are you doing...");
});

//main database reference
const db = admin.firestore();

// get user
app.get("/api/users/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("users").doc(req.params.id);
            let userDetail = await reqDoc.get();
            let response = userDetail.data();

            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// read all user
// get
app.get("/api/users", (req, res) => {
    (async () => {
        try {
            let query = db.collection("users");
            let response = [];

            await query.get().then((data) => {
                let docs = data.docs; // query results

                docs.map((doc) => {
                    const selectedData = {
                        id: doc.data().id,
                        fullname: doc.data().fullname,
                        email: doc.data().email,
                        password: doc.data().password,
                        username: doc.data().username,
                        avatar: doc.data().avatar,
                        status: doc.data().status,
                        role: doc.data().role,
                        createdAt: doc.data().createdAt,
                    };

                    response.push(selectedData);
                });
                return response;
            });

            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// read all post
// get
app.get("/api/posts", (req, res) => {
    (async () => {
        try {
            let query = db.collection("posts");
            let response = [];

            await query.get().then((data) => {
                let docs = data.docs; // query results

                docs.map((doc) => {
                    const selectedData = {
                        id: doc.data().id,
                        title: doc.data().title,
                        slug: doc.data().slug,
                        image: doc.data().image,
                        category: doc.data().category,
                        status: doc.data().status,
                        hot: doc.data().hot,
                        user: doc.data().user,
                        comment: doc.data().comment,
                        createdAt: doc.data().createdAt,
                    };

                    response.push(selectedData);
                });
                return response;
            });

            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// get post id
app.get("/api/posts/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("posts").doc(req.params.id);
            let userDetail = await reqDoc.get();
            let response = userDetail.data();

            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// get category id
app.get("/api/categories/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("categories").doc(req.params.id);
            let userDetail = await reqDoc.get();
            let response = userDetail.data();

            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// read all category
// get
app.get("/api/categories", (req, res) => {
    (async () => {
        try {
            let query = db.collection("categories");
            let response = [];

            await query.get().then((data) => {
                let docs = data.docs; // query results

                docs.map((doc) => {
                    const selectedData = {
                        id: doc.data().id,
                        name: doc.data().name,
                        slug: doc.data().slug,
                        status: doc.data().status,
                        createdAt: doc.data().createdAt,
                    };

                    response.push(selectedData);
                });
                return response;
            });

            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// get feedback id
app.get("/api/feedbacks/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("feedbacks").doc(req.params.id);
            let userDetail = await reqDoc.get();
            let response = userDetail.data();

            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// read all feedbacks
// get
app.get("/api/feedbacks", (req, res) => {
    (async () => {
        try {
            let query = db.collection("feedbacks");
            let response = [];

            await query.get().then((data) => {
                let docs = data.docs; // query results

                docs.map((doc) => {
                    const selectedData = {
                        id: doc.data().id,
                        fullname: doc.data().fullname,
                        email: doc.data().email,
                        message: doc.data().message,
                        user: doc.data().user,
                        createdAt: doc.data().createdAt,
                    };

                    response.push(selectedData);
                });
                return response;
            });

            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// create user
app.post("/users/create", (req, res) => {
    (async () => {
        try {
            const time = Date.now();
            await db.collection("users").doc(`/${time}/`).create({
                id: time,
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                avatar: req.body.avatar,
                status: req.body.status,
                role: req.body.role,
                description: req.body.description,
                dateOfBirth: "",
                mobileNumber: "",
                createdAt: Date.now(),
            });

            return res
                .status(200)
                .send({ statue: "Success", msg: "data saved" });
        } catch (error) {
            return res.status(500).send({ statue: "Failed", msg: error });
        }
    })();
});

// create post
app.post("/posts/create", (req, res) => {
    (async () => {
        try {
            const time = Date.now();
            await db.collection("posts").doc(`/${time}/`).create({
                id: time,
                title: req.body.title,
                slug: req.body.slug,
                image: req.body.image,
                category: req.body.category,
                status: req.body.status,
                hot: req.body.hot,
                content: req.body.content,
                user: req.body.user,
                comment: req.body.comment,
                createdAt: Date.now(),
            });

            return res
                .status(200)
                .send({ statue: "Success", msg: "data saved" });
        } catch (error) {
            return res.status(500).send({ statue: "Failed", msg: error });
        }
    })();
});

//create category
app.post("/categories/create", (req, res) => {
    (async () => {
        try {
            const time = Date.now();
            await db.collection("categories").doc(`/${time}/`).create({
                id: time,
                name: req.body.name,
                slug: req.body.slug,
                status: req.body.status,
                createdAt: Date.now(),
            });

            return res
                .status(200)
                .send({ statue: "Success", msg: "data saved" });
        } catch (error) {
            return res.status(500).send({ statue: "Failed", msg: error });
        }
    })();
});

//create feedback
app.post("/feedbacks/create", (req, res) => {
    (async () => {
        try {
            const time = Date.now();
            await db.collection("feedbacks").doc(`/${time}/`).create({
                id: time,
                fullname: req.body.fullname,
                email: req.body.email,
                message: req.body.message,
                user: req.body.user,
                createdAt: Date.now(),
            });

            return res
                .status(200)
                .send({ statue: "Success", msg: "data saved" });
        } catch (error) {
            return res.status(500).send({ statue: "Failed", msg: error });
        }
    })();
});

//create comment
// app.post("/comments/create", (req, res) => {
//     (async () => {
//         try {
//             const time = Date.now();
//             await db.collection("comments").doc(`/${time}/`).create({
//                 id: time,
//                 comment: req.body.comment,
//                 user: req.body.user,
//                 createdAt: Date.now(),
//             });

//             return res
//                 .status(200)
//                 .send({ statue: "Success", msg: "data saved" });
//         } catch (error) {
//             return res.status(500).send({ statue: "Failed", msg: error });
//         }
//     })();
// });

// // update users
app.put("/users/update/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("users").doc(req.params.id);
            await reqDoc.update({
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                avatar: req.body.avatar,
                status: req.body.status,
                role: req.body.role,
                description: req.body.description,
                dateOfBirth: req.body.dateOfBirth,
                mobileNumber: req.body.mobileNumber,
            });
            return res
                .status(200)
                .send({ status: "Success", msg: "Data Updated" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// // update posts
app.put("/posts/update/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("posts").doc(req.params.id);
            await reqDoc.update({
                title: req.body.title,
                slug: req.body.slug,
                image: req.body.image,
                category: req.body.category,
                status: req.body.status,
                hot: req.body.hot,
                content: req.body.content,
                user: req.body.user,
                comment: req.body.comment,
            });
            return res
                .status(200)
                .send({ status: "Success", msg: "Data Updated" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// update categories
app.put("/categories/update/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("categories").doc(req.params.id);
            await reqDoc.update({
                name: req.body.name,
                slug: req.body.slug,
                status: req.body.status,
            });
            return res
                .status(200)
                .send({ status: "Success", msg: "Data Updated" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// update feedback
app.put("/feedbacks/update/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("feedbacks").doc(req.params.id);
            await reqDoc.update({
                fullname: req.body.fullname,
                email: req.body.email,
                message: req.body.message,
                user: req.body.user,
            });
            return res
                .status(200)
                .send({ status: "Success", msg: "Data Updated" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// update feedback
app.put("/posts/update/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("posts").doc(req.params.id);
            await reqDoc.update({
                fullname: req.body.fullname,
                email: req.body.email,
                message: req.body.message,
                user: req.body.user,
            });
            return res
                .status(200)
                .send({ status: "Success", msg: "Data Updated" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// delete user by id
app.delete("/users/delete/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("users").doc(req.params.id);
            await reqDoc.delete();
            return res
                .status(200)
                .send({ status: "Success", msg: "Data Removed" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// delete post by id
app.delete("/posts/delete/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("posts").doc(req.params.id);
            await reqDoc.delete();
            return res
                .status(200)
                .send({ status: "Success", msg: "Data Removed" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// delete categories by id
app.delete("/categories/delete/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("categories").doc(req.params.id);
            await reqDoc.delete();
            return res
                .status(200)
                .send({ status: "Success", msg: "Data Removed" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// delete feedbacks by id
app.delete("/feedbacks/delete/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection("feedbacks").doc(req.params.id);
            await reqDoc.delete();
            return res
                .status(200)
                .send({ status: "Success", msg: "Data Removed" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "Failed", msg: error });
        }
    })();
});

// exports the api
exports.app = functions.https.onRequest(app);
