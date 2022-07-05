const express = require('express');
const knex = require('../db/clients');

const router = express.Router();

//------------------POST ROUTES---------------------------

//------------------------Index of all Posts: ---------------

router.get("/new", (req, res) => {
  res.render("cohorts/new");
});

router.get("/", (req, res) => {
  knex.select('*')
      .from('cohorts')
      .orderBy('name', 'desc')
      .then(data => {
          console.log(data);
          res.render("cohorts/index", { list: data });
      })
});



router.post("/", (req, res) => {
  knex("cohorts")
      .insert(
          {
              logoUrl: req.body.logoUrl,
              name: req.body.name,
              members: req.body.members
          },

          "*"
      )

      .then(notes => {
          console.log(notes);

          res.redirect(`/cohorts`)
      });
});


router.post('/:id', (req, res) => {
  const id = req.params.id;
  knex("cohorts")
      .where("id", id)
      .first()
      .then(cohort => {

          if (cohort) {
              res.render("cohorts/show", {
                  cohort: cohort
              });
          } else {
              res.redirect("/cohorts");
          }
      });
});

router.get("/:id/edit", (req, res) => {
  console.log("hello from edit route");
  knex("cohorts")
      .where("id", req.params.id)
      .first()
      .then(cohort => {
          res.render("cohorts/edit", { cohort: cohort });
      });
});


router.patch('/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params);
  knex("cohorts")
      .where("id", req.params.id)
      .update(
          {
              name: req.body.name,
              members: req.body.members,
             
          }
      ).then(() => {
          res.redirect(`/cohorts/${req.params.id}`)
      })
})



// Remember to export this file as the router, which will be required in
// index.js for all routes related to posts:
module.exports = router;