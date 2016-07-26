#Set up notes

# Initially tried docker
Then realized that was a bit more complex than I wanted to start with

Set up AWS Docker
https://console.aws.amazon.com/ecs/home?region=us-east-1#/firstRun

## Install AWS
http://docs.aws.amazon.com/cli/latest/userguide/installing.html

To solve issues on El Capitan with Python:
`sudo pip install awscli --ignore-installed`

## Install Docker
https://docs.docker.com/engine/installation/mac/

# Simpler EC2 setup

## Install Apache
http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html

Update Yum
`sudo yum update -y`

Install apache
`sudo yum install -y httpd24`

Start Web Server
`sudo service httpd start`

Start Web Server at system boot
`sudo chkconfig httpd on`

Update web server

Public IP
52.90.26.128

Connect to instance with: 
TODO: ` ssh -i ..../newkeypair.pem ec2-user@52.90.26.128`

TODO: make key accessible on necessary computers

Doc root
`/var/www/html`

# Install Jenkins

Set up
http://sanketdangi.com/post/62715793234/install-configure-jenkins-on-amazon-linux

Change port
```
vim /etc/sysconfig/jenkins

# Port Jenkins is listening on.
# Set to -1 to disable
#
JENKINS_PORT="8080"
```

<<<<<<< HEAD

=======
>>>>>>> master
Hook up to Github
http://sanketdangi.com/post/62740311628/integrate-jenkins-github-trigger-build-process
http://fourkitchens.com/blog/article/trigger-jenkins-builds-pushing-github

TODO: Resolve the issues setting up the hooks
https://issues.jenkins-ci.org/browse/JENKINS-20533

Encountered permission issue when trying to access repo

Tried `ssh git@github.com` but still enountered error

Don't use a passphrase! https://gist.github.com/misterbrownlee/3708738
Followed steps at http://stackoverflow.com/questions/12370921/ec2-cant-ssh-into-github

Set up deploy key in github repo

Initiated repo in `doc root`
`/etc/httpd/conf/httpd.conf`
restart apache `service httpd restart`

testing

Install Node/NPM
http://iconof.com/blog/how-to-install-setup-node-js-on-amazon-aws-ec2-complete-guide/

`sudo yum install nodejs npm --enablerepo=epel`

`git pull origin server`

http://www.lauradhamilton.com/how-to-set-up-a-nodejs-web-server-on-amazon-ec2
<<<<<<< HEAD

=======
>>>>>>> master

### might need these later

Change the group ownership of /var/www and its contents to the www group.

[ec2-user ~]$ sudo chown -R root:www /var/www
Change the directory permissions of /var/www and its subdirectories to add group write permissions and to set the group ID on future subdirectories.

[ec2-user ~]$ sudo chmod 2775 /var/www
[ec2-user ~]$ find /var/www -type d -exec sudo chmod 2775 {} +
Recursively change the file permissions of /var/www and its subdirectories to add group write permissions.

[ec2-user ~]$ find /var/www -type f -exec sudo chmod 0664 {} +


=========
Clone new repo
`https://github.com/evandana/pmc-auction`

Get into repo
`cd pmc-auction`

Switch branch
`git checkout dev`

NPM install
`npm install`

Run
`npm run watch`

`git pull`

-------------

Before running your app, you can do this in console,
`export NODE_ENV=production`

Or if you are in windows you could try this:
`SET NODE_ENV=production`

or you can run your app like this:
`NODE_ENV=production node app.js`

You can also set it in your js file:
`process.env.NODE_ENV = 'production';`

++++++++++++++++++++++
# make EC2 run indefinitely
npm install supervisor -g
http://josephralph.co.uk/supervisor-monitoring-and-running-commands/
<!-- pmc-auction/server/pmc-auction-supervisor.conf

[program:pmc-auction-supervisor]
directory=/var/www/html/pmc-auction
command=npm run prod
autostart=true
autorestart=true
stderr_logfile=/var/log/pmc-auction.err.log -->
`supervisor server` //what's run by npm start

adjusted timeout on ec2?
http://stackoverflow.com/questions/7210011/amazon-ec2-ssh-timeout-due-inactivity

#pm2 for no hangup
https://www.npmjs.com/package/pm2

++++++++++++++++++++++

##EC2
git fetch
git pull
git checkout master
npm install
npm run build
pm2 start server // pm2 stop all

// even after all that, something with firebase login didn't work on aws

+++++++++++++++++++++++

#HEROKU
```
git fetch
git pull
git checkout master
npm install
npm run build
git push heroku master
heroku ps:scale web=1
heroku open
// on error: heroku logs
```
+++++++++++++++++++++++

#FIREBASE
[https://www.firebase.com/docs/hosting/guide/deploying.html]

`npm run build`

`firebase deploy`
