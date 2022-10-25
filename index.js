const express = require('express');
const port = 4000;
const path=require('path');
const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList=[{
    name:"arpan",
    phone: "9910919640"},
    {
        name:"prabhav", phone: "9821812823"
    }
]

app.get('/', function(request, response){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error');
            return;
        }
        return response.render('home', {title:"my contacts",
    contact_list: contacts});
    });
    
//     return response.render('home', {title:"my contacts",
//     contact_list: contactList
// });
    
})


app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "let us play ith ejs"
    }); 
});

app.post('/create-contact', function(req,res){
    // return res.redirect('/practice')
    // console.log(req.body);
    // contactList.push({
    //     name: req.body.my_name, 
    //     phone: req.body.phone_no
    // });
    Contact.create({
        name: req.body.my_name,
        phone: req.body.phone_no
    }, function(err, newContact){
        if(err){
            console.log('error');
            return;
        }
        console.log('*********', newContact);
        return res.redirect('back');
    });



    // return res.redirect('back');

});

app.get('/delete-contact', function(req, res){
    // console.log(req.query);
    let id= req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error');
            return;
        }
       return res.redirect('back');
        
    });


})


app.listen(port, function(err){
    if(err){
        console.log('error', err);
        return;
    }
    console.log('express running');
});

