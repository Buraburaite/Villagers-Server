const Post = require('../models/post-model.js');

function addPosts(vils) {

  const {
    msBlueberry,
    thePistachio,
    timon,
    pamela,
    dana,
    sally,
    brendan,
    raphael,
    benjamin
  } = vils;

  const blueberryPosts = [{
    //Post 1
    content: `Just a reminder: the honor students are providing tutoring every Wednesday and Thursday from 3 to 5.
    Participation is free, and tutors receive community service hours.

    Let's go berries!`,
    comments: []
  },{
    //Post 2
    content: `With the FCAT coming up soon (next week Tuesday to Friday morning, in fact), I think it's important to offer a light
    at the end of the tunnel for our students. I'm planning a pizza party for Friday, 6th period. Anyone interested in helping
    out? I have tableclothes, plates, and napkins saved up, and can contribute three large pizzas, but could use more plates,
    cups, utensils, drinks and food variety.`,
    comments: [{
      //Comments
      author: dana._id,
      content: `Glad you asked! I can bring whatever you need from my restaurant. Contact me at email@address, I can provide more of everything
      you said, plus anything Cuban:)`
    },{
      author: timon._id,
      content: `Hi Ms.Blueberry, please remember about Sally's peanut allergies, I'll provide some food too`
    },{
      author: msBlueberry._id,
      content: `Wow, what a response! Thanks for stepping up to bat Dana!!`
    },{
      author: msBlueberry._id,
      content: `Timon, don't worry: I'll make sure that Sally has options and
      that anything with peanuts in it is labelled and that she knows about it.`
    }]
  },{
    //Post 3
    content: `Reminder: the last Friday of this month is the FINAL day to turn in late assignments for partial credit. If you don't know
    what your student may be missing, make sure to check Moodle! And remember: If you want to speak privately with me,
    don't leave a comment! Just email me at email@address`,
    comments: [{
      //Comments
      author: timon._id,
      content: `Hi Ms.Blueberry, thank you for letting us know! Go berries!`
    }]
  }];

  const pistachioPosts = [{
    //Post 1
    content: `Financial Aid Basics: https://bigfuture.collegeboard.org/pay-for-college/financial-aid/3-steps-to-getting-financial-aid
    Junior year is about to start! Make sure you and your student have a plan!`,
    comments: [{
      //Comments
      author: timon._id,
      content: `Some very useful tips here: http://business.time.com/2013/01/25/10-tips-for-getting-the-most-out-of-college-financial-aid/`
    },{
      author: pamela._id,
      content: `Does anyone know if Bright Futures applies to Dade State (go Badgers!)? I can't find out on their website,
      wish it was as good as Villagers!`
    },{
      author: timon._id,
      content: `Hi Pamela, yes it does, DSU's own financial aid site at www.dsu.edu/financial-aid#requirements has instructions
      accepting bright futures.`
    },{
      author: pamela._id,
      content: `Thanks Timon, that takes a load off my mind!`
    }]
  },{
    //Post 2
    content: `Hello everyone, welcome to the 2017-2018 School Year! My Terrance Pistachie, also known as 'The Pistachio'. I teach all
    levels of US History here at Dade High. This next Friday evening is the final open house for the year, I'll be there
    in room 206 from 4 to 7:30. It'd be great to meet you!`,
    comments: [{
      //Comments
      author: timon._id,
      content: `Got it, I'll be there!`
    }]
  }];

  //Add authors and subscribers to posts
  blueberryPosts.forEach((post) => {
    post.author = msBlueberry._id;
    post.subscribers = [msBlueberry._id, timon._id, sally._id, dana._id, brendan._id];
  });
  pistachioPosts.forEach((post) => {
    post.author = thePistachio._id;
    post.subscribers = [thePistachio._id, timon._id, raphael._id, pamela._id, benjamin._id];
  });

  Post.create(blueberryPosts, (err, postDocs) => {
    if (err) {
      console.log("Post blueberry create error");
      throw err;
    }

    msBlueberry.posts = postDocs;
  });

  Post.create(pistachioPosts, (err, postDocs) => {
    if (err) {
      console.log("Post pistachio create error");
      throw err;
    }

    thePistachio.posts = postDocs;
  });
}

module.exports = addPosts;
