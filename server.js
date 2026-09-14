
const express =   require("express");

// port number to run locally 
const app = express();
const port = 3500;



// used EJS to create my HTML pages
app.set("view engine", "ejs");



app.use( express.urlencoded({ extended:  true }));



// Imake my CSS files available to the website
app.use(express.static("public"));

// I keep my posts in an array for now
let posts = [];


// Show the homepage
app.get("/", (req,  res)  => 

    {    
    res.render("index", { posts });
});




// Open the edit page for a specific post
app.get("/posts/edit/:id", (req, res) => {

    const post = posts.find(p => p.id == req.params.id);


    // if post is not there
    if (!post)
        
    {
        return res.send("Post not found");

    }

    //I send the selected post to my edit page
    res.render("edit", { post });
});


// Create a new blog post
app.post("/posts", (req, res) => 
    
    
    {

    const newPost = 
    
    {
        
        id: Math.floor(Math.random() * 100000),

        title: req.body.title,
        author: req.body.author,

        

        content: req.body.content,

        date: new Date().toLocaleDateString()

    };

    // I have add the new post to my list
    posts.push(newPost);

    res.redirect("/");

});

// Save the changes to an existing post
app.post("/posts/edit/:id", (req, res) => 
{

    const post = posts.find(p => p.id == req.params.id);

    if (!post) 
        
    {
        return res.send("Post not found");
    }

    // update the information with the new form values

    post.author = req.body.author;
    post.title = req.body.title;
    post.content = req.body.content;

    res.redirect("/");
});


// to delete a blog post

app.post("/posts/delete/:id", (req, res) =>
{

    // I keep every post except the one I want to remove

    posts = posts.filter(p => p.id != req.params.id);

    res.redirect("/");

});


// Start the server
app.listen(port, () => 
    
{
    console.log(`Server is running on port ${port}`);


});