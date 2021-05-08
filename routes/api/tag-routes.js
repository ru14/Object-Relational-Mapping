const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
  // be sure to include its associated Product data
router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include:[Product]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});
// find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where:{
        id: req.params.id,
      },
      include:[Product]
    })
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
 // create a new tag
router.post('/', (req, res) => {
  try {
    const ProductData = await Tag.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(ProductData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        tag_id: req.params.tag_id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
 // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
 Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
