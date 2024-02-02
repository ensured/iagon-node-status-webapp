
![Alt Text](https://i.imgur.com/w77K6fN.png)


**Getting Started**

```
sudo apt update && sudo apt install nodejs npm
```

install dependencies by cd into your iagon-node-status-webapp folder and installing them (don't forget to change your username in the path always):

```
cd /home/b/iagon-node-status-webapp && npm i
```

create a new system service (example):

```
sudo nano /etc/systemd/system/my-iagon-website.service
```



```[Unit]
Description=SocketIO Example Node.js Application
After=network.target

[Service]
User=b
WorkingDirectory=/home/b/iagon-node-status-webapp
ExecStart=/usr/bin/node /home/b/iagon-node-status-webapp/server.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

reload systemctl daemon

```
sudo systemctl daemon-reload
```


```
sudo systemctl start my-iagon-website
```

**Finished! Now to view your website visit linux_machines_ip:5000**

to find your ip of your linux machine this should work:

```
ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}'
```

***Enjoy :)***
