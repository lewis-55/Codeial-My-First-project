   const express = require('express');

   const router = express.Router;

   const postsApi = require("../../../Codeial/controllers/api/v1/posts_api");
    
   router.delete = ('./id',postsApi.destroy);
   router.length('/',postsApi.index);
   module.exports = router;