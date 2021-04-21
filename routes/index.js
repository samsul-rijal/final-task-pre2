const express = require("express");
const router = express.Router();
const dbConn = require("../lib/db");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get("/", (request, response, next) => {
//   dbConn.query("SELECT * FROM heroes ORDER BY id DESC", (error, rows) => {
//     if (error) {
//       request.flash("error", error);
//       response.render("index", { data: [] });
//     } else {
//       response.render("index", {
//         data: rows,
//       });
//     }
//   });
// });
  

router.get("/type", (request, response) => {
  response.render("index", {
    id: "",
    name: "",
  });
});

router.post("/type", (request, response) => {
  const { id, name } = request.body;
  let errors = false;
  let errorMesage;

  if (id.length === 0 || name.length === 0) {
    errors = true;
    if (id.length === 0) {
      errorMesage = "Please enter id";
    } else if (name.length === 0) {
      errorMesage = "Please enter type name";
    }

    request.flash("error", errorMesage);
    response.render("index", {
      id,
      name,
    });
  }

  if (!errors) {
    const formData = {
      id,
      name,
    };

    dbConn.query("INSERT INTO type SET ?", formData, (error, result) => {
      if (error) {
        request.flash("error", error);

        response.render("/", {
          id,
          name,
        });
      } else {
        request.flash("success", "type successfully added");
        response.redirect("/");
      }
    });
  }
});

router.get("/", (request, response, next) => {
  dbConn.query("SELECT heroes.id, heroes.photo, heroes.name, heroes.detail, type.name as type_name FROM heroes LEFT JOIN type ON heroes.type_id = type.id ORDER BY id DESC", (error, rows) => {
    if (error) {
      request.flash("error", error);
      response.render("index", { data: [] });
    } else {
      response.render("index", {
        data: rows,
      });
    }
  });
});

router.get("/", (request, response) => {
    response.render("index", {
      name: "",
      type_id: "",
      photo: "",
      detail: "",
    });
  });
  
  router.post("/", (request, response) => {
    const { name, type_id, photo, detail } = request.body;
    let errors = false;
    let errorMesage;
  
    if (name.length === 0 || type_id.length === 0 || photo.length === 0) {
      errors = true;
      if (name.length === 0) {
        errorMesage = "Please enter heroes name";
      } else if (type_id.length === 0) {
        errorMesage = "Please enter type id heroes";
      } else if (photo.length === 0) {
        errorMesage = "Please enter heroes image";
      } else if (detail.length === 0) {
        errorMesage = "Please enter detail heroes";
      }
  
      request.flash("error", errorMesage);
      response.render("index", {
        name,
        type_id,
        photo,
        detail,
      });
    }
  
    if (!errors) {
      const formData = {
        name,
        type_id,
        photo,
        detail,
      };
  
      dbConn.query("INSERT INTO heroes SET ?", formData, (error, result) => {
        if (error) {
          request.flash("error", error);
  
          response.render("index", {
            name,
            type_id,
            photo,
            detail,
          });
        } else {
          request.flash("success", "Heroes successfully added");
          response.redirect("/");
        }
      });
    }
  });



router.get("/edit/(:id)", (request, response) => {
  const { id } = request.params;

  dbConn.query("SELECT * FROM heroes WHERE id =" + id, (error, rows) => {
    if (error) throw error;

    if (rows.length <= 0) {
      request.flash("error", "heroes Not Found");
      response.redirect("/");
    } else {
      response.render("edit", {
        id: rows[0].id,
        name: rows[0].name,
        type_id: rows[0].type_id,
        photo: rows[0].photo,
        detail: rows[0].detail,
      });
    }
  });
});


router.post("/update/:id", (request, response) => {
  const { id } = request.params;
  const { name, type_id, photo, detail } = request.body;
  let errors = false;

  if (name.length === 0 || type_id.length === 0 || photo.length === 0 || detail.length === 0){
    errors = true;
    if (name.length === 0) {
      errorMesage = "Please enter heroes name";
    } else if (type_id.length === 0) {
      errorMesage = "Please enter type id heroes";
    } else if (photo.length === 0) {
      errorMesage = "Please enter heroes image";
    } else if (detail.length === 0) {
      errorMesage = "Please enter detail heroes";
    }

    request.flash("error", errorMesage);
    response.render("index/edit", {
      id,
      name,
      type_id,
      photo,
      detail,
    });
  }

  if (!errors) {
    const formData = {
      id,
      name,
      type_id,
      photo,
      detail,
    };

    dbConn.query(
      "UPDATE heroes SET ? WHERE id =" + id,
      formData,
      (error, result) => {
        if (error) {
          request.flash("error", error);
          response.render("index/edit", {
            id,
            name,
            type_id,
            photo,
            detail,
          });
        } else {
          request.flash("success", "Heroes successfully updated");
          response.redirect("/");
        }
      }
    );
  }
});

router.get("/delete/(:id)", (request, response) => {
  const { id } = request.params;

  dbConn.query("DELETE FROM heroes WHERE id =" + id, (error, result) => {
    if (error) {
      request.flash("error", error);
    } else {
      request.flash("success", "Heroes successfully deleted");
    }
    response.redirect("/");
  });
});


module.exports = router;
