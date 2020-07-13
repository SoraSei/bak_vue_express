[TOC]

# 全栈之巅学习笔记 vue express

```bash
mkdir vue_express
cd vue_express

git init
git remote add origin https://github.com/SoraSei/vue_express.git
git push -u origin master # git push

git config -l # --global
git remote -v
git remote set-url origin https://github.com/SoraSei/vue_express.git
```

## 后端 express

### 服务器 /server

- express
- mongoose
- cors 跨域
- inflection 单复数
- multer 上传文件
- bcrypt 散列
- jsonwebtoken 令牌

```bash
mkdir server
cd server
npm init # "serve": "nodemon index.js",
npm run serve

npm i express
npm i mongoose
npm i cors
npm i inflection
npm i multer
npm i bcrypt
npm i jsonwebtoken
```

### 数据库 mongo

```bash
brew services start mongodb-community

mongo
> show dbs # test
> use test
> db.stats()

> show collections # categories
> db.categories.drop()
> db.categories.count()
> db.categories.find()

# 批量修改图片地址
> db.getCollection('items').find({}).map(doc => {
>     doc.img = doc.img ? doc.img.replace('localhost:3000', 'test.test.com') : null
>     db.items.save(doc)
>     return doc
> })
> db.getCollection('ads').find({}).map(doc => {
>     doc.ads.map(ad => {
>         ad.img = ad.img ? ad.img.replace('localhost:3000', 'test.test.com') : null
>         return ad
>     })
>     db.ads.save(doc)
>     return doc
> })

> exit
```

### 管理员 /admin

- vue
- element
- vue2-editor(quill) 富文本

```bash
vue create admin
cd admin
npm run serve # http://localhost:8080/

vue add router
vue add axios # baseURL: "http://localhost:3000/admin/api"
vue add element
npm i vue2-editor
```

## 前端 /web

- vue
- sass
- vue-awesome-swiper 轮播

```bash
vue create web
cd web
npm run serve # http://localhost:8080/

vue add router
vue add axios # baseURL: "http://localhost:3000/web/api"
npm i sass
npm i sass-loader
npm i vue-awesome-swiper
```

## 其他

- 云服务器 ECS > 镜像 ubuntu > 自定义密码 > 控制台 > 实例 > IP 地址(公) > 实例详情 > 远程连接 > 保存密码
- 域名 > 控制台 > 域名列表 > 解析
  - `记录类型: A 指向 IP 地址 / CNAME 指向另外域名`
  - `主机记录: 主机名.域名.com`
  - `记录值: IP 地址(公)`
- 安装 nginx / mongodb / git / node / pm2
- nginx 反向代理 > https://nginxconfig.io > 复制配置(删除全局配置 nginx.conf)到 /etc/nginx > service nginx reload(重启 nginx)
  - `presets: node.js`
  - `server.domain: 主机名.域名.com`
  - `server.redirectsubdomains: disabled`
  - `https: disabled`
  - `reverseproxy: enabled`
  - `reverseproxy.proxy_pass: http://127.0.0.1:3000`
- 数据迁移 > 本地 mongodump -d 数据库名 > 复制 dump 文件夹到 /root > 服务器 mongorestore
- SSL 证书 > https://letsencrypt.org > getstarted > certbot > 环境 nginx 和 ubuntu > 运行指定命令
- 云存储 OSS
  - 控制台 > 对象存储 OSS > 存储空间 > 创建 Bucket( bucket 和 region 填) > 读写权限 公共读
  - 个人中心(头像) > accesskeys > 开始使用子用户 AccessKey > 用户名 test > 权限 AliyunOSSFullAccess > 保存 AccessKeyID 和 AccessKeySecret > 控制台 > 访问控制 RAM > 用户管理
  - server 文件夹 npm i multer-aliyun-oss(关键字 multer oss)

```bash
ssh root@IP地址(公) # root@主机名.域名.com
ls # ll 列表 -l 详情 -a 隐藏文件 -d 目录
pwd # 当前文件夹
cd ~ # 个人文件夹
cd / # /root

apt update
apt show nginx
apt insatll nginx -y # 域名可访问
apt insatll mongodb-server -y

apt insatll git -y
ssh-keygen # 私钥/root/.ssh/id_rsa 公钥/root/.ssh/id_rsa.pub
cat /root/.ssh/id_rsa.pub # 复制公钥到github部署公钥

apt insatll nodejs -y
apt insatll npm -y
npm config set registry https://registry.npm.taobao.org
npm i -g n
n latest # 更新node

cd /var/www # nginx根目录
mkdir /data
cd /data
git clone git@github.com/SoraSei/vue_express.git
cd /vue_express
cd /server
npm i
node index.js # 启动服务
npm i pm2 -g
pm2 start index.js # 后台启动服务
pm2 list
pm2 logs index
curl http://localhost:3000

git pull # 本地 git push
rm -rf package-lock.json # rmdir 删除空目录
npm i
pm2 reload index

cd /nginxconfig.io-test.test.com
mv /sites-available/test.test.com.conf /etc/nginx/sites-available
mv /sites-enabled/test.test.com.conf /etc/nginx/sites-enabled
cp -r /nginxconfig.io /etc/nginx/nginxconfig.io

cp -r /dump /
mongorestore # 本地 mongodump -d test

sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
sudo apt-get install python-certbot-nginx
sudo certbot --nginx # 邮箱 协议a 分享n 选择自动识别域名列表1 是否重定向http到https2(redirect) https需开443端口

exit # 退出连接
```
