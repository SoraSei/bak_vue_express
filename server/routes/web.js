module.exports = app => {
  const router = require("express").Router({ mergeParams: true });
  const Category = require("../models/Category");
  const Article = require("../models/Article");
  const Role = require("../models/Role");
  const Item = require("../models/Item");

  // 录入
  // $$(".news_list .title")
  //   .map(el => el.innerHTML)
  //   .slice(5);
  router.get("/news/init", async (req, res) => {
    const parent = await Category.findOne({ name: "news" });
    const cats = await Category.find()
      .where({ parent: parent })
      .lean();
    const newsTitles = ["news title 01", "news title 02", "news title 03"];
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5); // 随机排序
      return { categories: randomCats.slice(0, 2), title: title };
    });
    // await Article.deleteMany({}); // 清空
    await Article.insertMany(newsList);
    res.send(newsList);
  });

  // $$(".hero-nav > li").map((li, i) => {
  //   return {
  //     name: li.innerText,
  //     heroes: $$("li", $$(".hero-list")[i]).map(el => {
  //       return {
  //         name: $$("h3", el)[0].innerHTML,
  //         avatar: $$("img", el)[0].src
  //       };
  //     })
  //   };
  // });
  // router.get("/roles/init", async (req, res) => {
  //   // await Role.deleteMany({});
  //   const roleList = [
  //     {
  //       name: "hot",
  //       roles: [
  //         { name: "role01", img: "https://.jpg" },
  //         { name: "role02", img: "https://.jpg" }
  //       ]
  //     },
  //     { name: "cat01", roles: [{ name: "role03", img: "https://.jpg" }] }
  //   ];
  //   for (let cat of roleList) {
  //     if (cat.name === "hot") {
  //       continue;
  //     }
  //     const category = await Category.findOne({ name: cat.name });
  //     cat.roles = cat.roles.map(role => {
  //       role.categories = [category];
  //       return role;
  //     });
  //     await Role.insertMany(cat.roles);
  //   }
  //   res.send(await Role.find());
  // });

  router.get("/news/list", async (req, res) => {
    // const parent = await Category.findOne({ name: "news" })
    //   .populate({ path: "children", populate: { path: "newsList" } })
    //   .lean();
    const parent = await Category.findOne({ name: "news" });
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "categories",
          as: "newsList"
        }
      },
      { $addFields: { newsList: { $slice: ["$newsList", 5] } } }
    ]);
    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "hot",
      newsList: await Article.find()
        .where({ categories: { $in: subCats } })
        .populate("categories")
        .limit(5)
        .lean()
    });
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === "hot" ? news.categories[0].name : cat.name;
        return news;
      });
      return cat;
    });
    res.send(cats);
  });

  router.get("/roles/list", async (req, res) => {
    const parent = await Category.findOne({ name: "roles" });
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "roles",
          localField: "_id",
          foreignField: "categories",
          as: "roleList"
        }
      }
    ]);
    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "hot",
      roleList: await Role.find()
        .where({ categories: { $in: subCats } })
        .limit(10)
        .lean()
    });
    res.send(cats);
  });

  router.get("/articles/:id", async (req, res) => {
    const data = await Article.findById(req.params.id).lean();
    data.related = await Article.find()
      .where({ categories: { $in: data.categories } })
      .limit(2);
    res.send(data);
  });

  router.get("/roles/:id", async (req, res) => {
    const data = await Role.findById(req.params.id)
      .populate("categories items1 items2")
      .lean();
    res.send(data);
  });

  app.use("/web/api", router);
};
