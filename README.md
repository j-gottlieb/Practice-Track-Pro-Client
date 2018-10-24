## Summary
Welcome to [Practice Track Pro!](https://j-gottlieb.github.io/Practice-Track-Pro-Client/) This application is a tool to help you record
practice sessions, set goals and view your progress. Once you create an account,
you will be able to sign in, change your password, create a daily, weekly and
monthly goal, create a new practice instance with a date and duration, view your
progress and sign out. Every practice instance and goal is editable. Users may
only access their own data and must be logged in to do so.

All data is stored in a custom api. You may find the repo for the PTP API repo [here](https://github.com/j-gottlieb/Practice-Track-Pro-API)


## Image Links
* [ERD](https://github.com/j-gottlieb/Practice-Track-Pro-Client/blob/master/public/images/ERD.jpg)
* [Wireframe](https://github.com/j-gottlieb/Practice-Track-Pro-Client/blob/master/public/images/Wireframe.jpg)
* [API Repo](https://github.com/j-gottlieb/Practice-Track-Pro-API)


## Technologies Used
* HTML
* SCSS
* Bootstrap
* Javascript
* JQuery
* Handlebars
* [Progressbar.js](https://progressbarjs.readthedocs.io/en/1.0.0/)


## Planning
PTP began with the desire to help past me practice his trumpet as much as he
should have back in high school. If I had had a tool that rewarded me for each
for each time I practiced, I would have been a much better practicer.

The first thing I did was draw a wireframe to visualize the layout of the ui.
Although the final product looked very little like my wireframe, it was still
helful to have a reference from which to work.

Next, I created user stories and used them to draw out the flow of the site.

  ### User Stories
  A user can:
    * sign up, sign in, change password, and sign out
    * create, edit and view their own daily, weekly, and monthly practice goal
    * create, edit, delete, and view their own practice instances
    * view their progress toward each goal in a dashboard

With flow established, I needed to create the logic that would parse through the
practice instances and calculate each goal's progress. This was where I learned a ton about
dealing with dates in JS. I added a protoypal function to the Date object that
could add/subtract days and correctly navigate across months. A lot of research
went into converting the Date() object into the same format of the date data type
that the api was sending.

The progress bar was also a fun little project. I used the library, Progressbar.js
and a nice example provided by jsfiddle user, kimmobrunfeldt.

Despite dates being a real challenge to work with, styling ended up being the
biggest challenege on this project. I spent a total of one full work day trying
to get the ui to look the way I wanted. Finally I decided to ditch all of my css
and switch to bootstrap. It was the right call. Bootstrap allowed me to do
everything I was trying to do before, but with better flow and more flexibility.
8 hours went into making 200 lines of css before giving up. 2 hours went into
bootstrap-atizing the site.

## Future Versions

I hope to include the following features in future version:
* Goals calculated by calendar month, not the last 30 consecutive days.
* View goals and records achieved by other users (high score!)
* Create profile picture
* Add multiple instrument profiles for each user
* Create social aspect - add friends, messaging, etc...
